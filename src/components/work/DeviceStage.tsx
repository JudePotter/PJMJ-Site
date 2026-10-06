'use client'

import Image from 'next/image'
import type { Project } from '@/content/projects'

/**
 * The artwork inside a work frame. Every cover and video is 5:4 and already
 * has the browser and phone mockup on a flat background, so this is just the
 * image, with the muted looping video (when there is one) fading in over it
 * once it is actually playing.
 *
 * The box is contained inside the frame and whatever holds it is painted the
 * artwork's background colour (the project's frameColor), so wider frames show
 * no edge. The videos must be tagged as sRGB (see the note in projects.ts), or
 * browsers show them a shade off that colour. Must sit inside a .work-frame,
 * which is the size container the units in globals.css use.
 */
export default function DeviceStage({
  project,
  videoRef,
  sizes,
  eager = false,
}: {
  project: Project
  videoRef?: (el: HTMLVideoElement | null) => void
  sizes: string
  /** For the cover that is on screen at load: skip lazy loading. */
  eager?: boolean
}) {
  return (
    <div className="stage-box">
      {/* GSAP drifts this wrapper as the next project wipes in. */}
      <div className="stage-media">
        <Image
          src={project.cover}
          alt={`${project.name} website, shown on desktop and phone`}
          fill
          sizes={sizes}
          quality={90}
          loading={eager ? 'eager' : undefined}
          fetchPriority={eager ? 'high' : undefined}
          className="object-cover"
        />
        {/* preload="none": nothing downloads until the video is told to play,
            which only happens for the active, on screen project. */}
        {project.video && (
          <video
            ref={videoRef}
            className="stage-video"
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={(e) => {
              e.currentTarget.dataset.playing = 'true'
            }}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}
