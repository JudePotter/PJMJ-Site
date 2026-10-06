import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  PETAL_CENTRE,
  PETAL_FILL,
  PETAL_OUTLINE,
  PETAL_RING_WIDTH,
  PETAL_VEIN_WIDTH,
  PETAL_VEINS,
  PETAL_VIEWBOX,
} from '@/components/petalPaths'
import { site } from '@/content/site'

/**
 * The card shown when the link is shared (WhatsApp, LinkedIn, Slack, iMessage,
 * X). Built once at build time. It has no CSS variables to read, so these are
 * the same values as the tokens in globals.css. Keep them in step.
 */
const BG = '#F5F3EE'
const INK = '#111111'
const LIME = '#D7F75B'
const COBALT = '#2B4BFF'
const BODY = '#4A4945'

export const alt = `${site.name}. Websites people actually remember.`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const sansRegular = await readFile(
  join(process.cwd(), 'src/assets/fonts/InstrumentSans-Regular.ttf'),
)
const sansSemiBold = await readFile(
  join(process.cwd(), 'src/assets/fonts/InstrumentSans-SemiBold.ttf'),
)
const serif = await readFile(
  join(process.cwd(), 'src/assets/fonts/Fraunces-Italic.ttf'),
)

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        color: INK,
        padding: '72px 80px 76px',
        fontFamily: 'Instrument Sans',
        fontWeight: 600,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="136" height="136" viewBox={PETAL_VIEWBOX}>
          <path d={PETAL_FILL} fill={LIME} />
          <path d={PETAL_OUTLINE} fill={INK} fillRule="evenodd" />
          <path
            d={PETAL_VEINS}
            fill="none"
            stroke={COBALT}
            strokeWidth={PETAL_VEIN_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={PETAL_CENTRE.x}
            cy={PETAL_CENTRE.y}
            r={PETAL_CENTRE.r}
            fill={COBALT}
            stroke={INK}
            strokeWidth={PETAL_RING_WIDTH}
          />
        </svg>
        <div
          style={{
            display: 'flex',
            marginLeft: 24,
            fontSize: 148,
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: COBALT }}>.</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 54,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap',
          }}
        >
          <span>We build websites people</span>
          <span
            style={{
              display: 'flex',
              marginLeft: 14,
              padding: '2px 14px 6px',
              background: LIME,
              borderRadius: 10,
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            actually remember.
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            fontSize: 34,
            whiteSpace: 'nowrap',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: BODY,
          }}
        >
          Hand coded in Brighton for businesses that don’t do templates.
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Sans',
          data: sansRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Instrument Sans',
          data: sansSemiBold,
          style: 'normal',
          weight: 600,
        },
        { name: 'Fraunces', data: serif, style: 'italic', weight: 400 },
      ],
    },
  )
}
