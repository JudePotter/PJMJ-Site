import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Logo } from '#/components/Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-sm border border-dashed border-current/30 p-1.5">
            <Logo size={22} />
          </span>
          <span className="display text-base font-normal tracking-tight">PJMJ Studios</span>
        </Link>
        <nav className="flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] font-normal tracking-normal text-current/80 transition-colors duration-300 ease-out hover:text-gold"
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
