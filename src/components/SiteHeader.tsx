import type { RefObject } from 'react'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Logo } from '#/components/Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

type SiteHeaderProps = {
  logoRef: RefObject<HTMLSpanElement | null>
}

export function SiteHeader({ logoRef }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-colors duration-500 ease-out ${
        scrolled ? 'bg-racing text-paper' : 'bg-transparent text-ink'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <span ref={logoRef} className="flex items-center justify-center">
            <Logo size={33} />
          </span>
          <span className="display text-sm font-normal tracking-tight sm:text-base">
            PJMJ Studios
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-9">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-normal tracking-normal text-current/80 transition-colors duration-300 ease-out hover:text-gold sm:text-[13px]"
              activeProps={{ className: '!text-gold' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
