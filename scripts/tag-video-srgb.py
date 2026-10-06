#!/usr/bin/env python3
"""Tag an MP4 as sRGB so it matches the flat CSS colour around it.

Videos exported from editing apps are usually tagged with TV colour standards
(for example "SMPTE 170M"). Browsers obey that tag, so on a Mac the video shows
a shade lighter than the same colour in CSS, and a visible edge appears where
the artwork meets the frame colour. This sets the colour primaries to BT.709
(the same as sRGB) and the transfer function to sRGB, in both places a browser
looks: the container (the colr box) and the video stream (the H.264 SPS).

It edits fixed width fields in place. Nothing is re-encoded, so there is no
quality loss and the file size does not change. The matrix and the range are
left as they are.

Only for artwork made from flat design colours, like the work videos here. Do
not use it on camera footage.

Usage:
    python3 scripts/tag-video-srgb.py public/work/some-client/loop.mp4
    python3 scripts/tag-video-srgb.py in.mp4 -o out.mp4
"""

import argparse
import struct
import sys

PRIMARIES_BT709 = 1
TRANSFER_SRGB = 13


def boxes(buf, start, end):
    """Yield (type, offset, size, header size) for the boxes in a range."""
    i = start
    while i + 8 <= end:
        size, kind = struct.unpack(">I4s", buf[i : i + 8])
        header = 8
        if size == 1:
            size = struct.unpack(">Q", buf[i + 8 : i + 16])[0]
            header = 16
        elif size == 0:
            size = end - i
        if size < header:
            return
        yield kind, i, size, header
        i += size


def find(buf, start, end, path):
    """Find the first box at the end of a path of nested box types."""
    for kind, off, size, header in boxes(buf, start, end):
        if kind != path[0]:
            continue
        if len(path) == 1:
            return kind, off, size, header
        inner = off + header + (8 if kind == b"stsd" else 0)
        found = find(buf, inner, off + size, path[1:])
        if found:
            return found
    return None


def video_sample_entry(buf):
    moov = find(buf, 0, len(buf), [b"moov"])
    if not moov:
        sys.exit("No moov box: this does not look like an MP4.")
    for kind, off, size, header in boxes(buf, moov[1] + 8, moov[1] + moov[2]):
        if kind != b"trak":
            continue
        entry = find(buf, off + 8, off + size, [b"mdia", b"minf", b"stbl", b"stsd", b"avc1"])
        if entry:
            return entry
    sys.exit("No H.264 (avc1) video track found.")


class Bits:
    def __init__(self, data):
        self.data, self.pos = data, 0

    def u(self, n):
        value = 0
        for _ in range(n):
            byte = self.data[self.pos >> 3]
            value = (value << 1) | ((byte >> (7 - (self.pos & 7))) & 1)
            self.pos += 1
        return value

    def ue(self):
        zeros = 0
        while self.u(1) == 0:
            zeros += 1
        return (1 << zeros) - 1 + (self.u(zeros) if zeros else 0)

    def se(self):
        k = self.ue()
        return (k + 1) // 2 if k & 1 else -(k // 2)


def colour_bit_position(sps):
    """Bit offset of the 24 bit colour description inside an SPS, or None."""
    b = Bits(sps)
    b.u(8)
    profile = b.u(8)
    b.u(8)
    b.u(8)
    b.ue()
    if profile in (100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 139, 134, 135):
        chroma = b.ue()
        if chroma == 3:
            b.u(1)
        b.ue()
        b.ue()
        b.u(1)
        if b.u(1):
            for i in range(8 if chroma != 3 else 12):
                if b.u(1):
                    last = nxt = 8
                    for _ in range(16 if i < 6 else 64):
                        if nxt != 0:
                            nxt = (last + b.se() + 256) % 256
                        last = last if nxt == 0 else nxt
    b.ue()
    poc = b.ue()
    if poc == 0:
        b.ue()
    elif poc == 1:
        b.u(1)
        b.se()
        b.se()
        for _ in range(b.ue()):
            b.se()
    b.ue()
    b.u(1)
    b.ue()
    b.ue()
    if not b.u(1):
        b.u(1)
    b.u(1)
    if b.u(1):
        for _ in range(4):
            b.ue()
    if not b.u(1):
        return None  # no VUI
    if b.u(1) and b.u(8) == 255:
        b.u(32)
    if b.u(1):
        b.u(1)
    if not b.u(1):
        return None  # no video signal type
    b.u(4)
    return b.pos if b.u(1) else None  # position of primaries, if described


def set_bits(buf, base, bit_pos, value, width):
    for k in range(width):
        bit = (value >> (width - 1 - k)) & 1
        p = bit_pos + k
        index, shift = base + (p >> 3), 7 - (p & 7)
        buf[index] = (buf[index] & ~(1 << shift)) | (bit << shift)


def retag(buf):
    changed = []
    kind, off, size, header = video_sample_entry(buf)

    # The container: a colr box of type nclx inside the avc1 entry.
    for k, o, z, h in boxes(buf, off + 8 + 78, off + size):
        if k == b"colr" and buf[o + h : o + h + 4] == b"nclx":
            struct.pack_into(">HH", buf, o + h + 4, PRIMARIES_BT709, TRANSFER_SRGB)
            changed.append("container (colr box)")

    # The stream: the H.264 SPS inside the avcC box.
    avcc = find(buf, off + 8 + 78, off + size, [b"avcC"])
    if avcc:
        body = avcc[1] + avcc[3]
        sps_len = struct.unpack(">H", buf[body + 6 : body + 8])[0]
        sps_at = body + 8
        sps = bytes(buf[sps_at : sps_at + sps_len])
        if b"\x00\x00\x03" in sps:
            sys.exit("This SPS uses escape bytes; not handled. Re-export the video.")
        pos = colour_bit_position(sps)
        if pos is not None:
            set_bits(buf, sps_at, pos, PRIMARIES_BT709, 8)
            set_bits(buf, sps_at, pos + 8, TRANSFER_SRGB, 8)
            check = bytes(buf[sps_at : sps_at + sps_len])
            if any(seq in check for seq in (b"\x00\x00\x00", b"\x00\x00\x01", b"\x00\x00\x02", b"\x00\x00\x03")):
                sys.exit("Edit would need escape bytes; not handled. Re-export the video.")
            changed.append("stream (H.264 SPS)")
    return changed


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("input")
    parser.add_argument("-o", "--output", help="write here instead of changing the input")
    args = parser.parse_args()

    buf = bytearray(open(args.input, "rb").read())
    size = len(buf)
    changed = retag(buf)
    if not changed:
        sys.exit("No colour tags found to change. Re-export the video with colour tags, then run this.")
    assert len(buf) == size
    open(args.output or args.input, "wb").write(buf)
    print(f"{args.output or args.input}: tagged sRGB in the " + " and the ".join(changed))


if __name__ == "__main__":
    main()
