import {
  PETAL_CENTRE,
  PETAL_FILL,
  PETAL_OUTLINE,
  PETAL_RING_WIDTH,
  PETAL_VEIN_WIDTH,
  PETAL_VEINS,
  PETAL_VIEWBOX,
} from './petalPaths'

/**
 * The PJMJ mark: the real logo (traced from public/logo.png) in the site
 * colours. Lime leaves, ink outline, cobalt veins and centre. It takes its
 * colours from the site tokens, so a palette change reaches it automatically.
 */
export default function PetalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={PETAL_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={PETAL_FILL} className="fill-lime" />
      <path d={PETAL_OUTLINE} fillRule="evenodd" className="fill-ink" />
      <path
        d={PETAL_VEINS}
        fill="none"
        strokeWidth={PETAL_VEIN_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cobalt"
      />
      <circle
        cx={PETAL_CENTRE.x}
        cy={PETAL_CENTRE.y}
        r={PETAL_CENTRE.r}
        strokeWidth={PETAL_RING_WIDTH}
        className="fill-cobalt stroke-ink"
      />
    </svg>
  )
}
