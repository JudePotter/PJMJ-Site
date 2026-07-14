type LogoProps = {
  className?: string
  size?: number
}

const LEAF_ANGLES = [-55, 55, -125, 125, 180]

export function Logo({ className = '', size = 28 }: LogoProps) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {LEAF_ANGLES.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path
            d="M0,0 C-13,-9 -15,-27 0,-40 C15,-27 13,-9 0,0 Z"
            className="fill-paper stroke-racing"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M0,-3 L0,-36 M0,-12 L-7,-19 M0,-12 L7,-19 M0,-22 L-5,-28 M0,-22 L5,-28"
            className="stroke-gold"
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ))}
      <circle r={7} className="fill-gold" />
    </svg>
  )
}
