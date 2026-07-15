type LogoProps = {
  className?: string
  size?: number
}

export function Logo({ className = '', size = 42 }: LogoProps) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: 'auto' }}
      alt=""
      aria-hidden
    />
  )
}
