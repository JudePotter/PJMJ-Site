type ScrollRevealProps = {
  children: string
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function ScrollReveal({ children, className = '', as = 'p' }: ScrollRevealProps) {
  const Tag = as
  return <Tag className={className}>{children}</Tag>
}
