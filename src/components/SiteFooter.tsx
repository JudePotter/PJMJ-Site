import { Link } from '@tanstack/react-router'
import { MagneticLink } from '#/components/motion/MagneticLink'
import { Logo } from '#/components/Logo'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <span className="mb-4 inline-flex items-center justify-center">
              <Logo size={39} />
            </span>
            <p className="display text-2xl">PJMJ Studios</p>
            <p className="font-display mt-3 max-w-xs text-sm font-light text-muted-foreground">
              Well made. Found easily. Cared for. Built to last.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Sitemap</p>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="w-fit text-sm hover:text-racing">
                Home
              </Link>
              <Link to="/about" className="w-fit text-sm hover:text-racing">
                About
              </Link>
              <Link to="/contact" className="w-fit text-sm hover:text-racing">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <MagneticLink
              href="https://uk.linkedin.com/in/jude-potter-0bba4b1b5"
              target="_blank"
              rel="noreferrer"
              className="w-fit text-sm hover:text-racing"
            >
              LinkedIn
            </MagneticLink>
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} PJMJ Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
