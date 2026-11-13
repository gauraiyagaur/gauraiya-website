import { useEffect, useState } from 'react'
import { hireMeHref, navLinks, profile } from '~/data/portfolio'

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-surface/95 backdrop-blur">
      <div className="container-grid flex h-16 items-center justify-between gap-4">
        <a href="#top" className="display text-xl tracking-tight sm:text-2xl" aria-label={`${profile.name}, back to top`}>
          <span className="hidden sm:inline">GAURAIYA GAUR</span>
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="ml-1 inline-block h-2.5 w-2.5 bg-neon align-middle ring-1 ring-ink" aria-hidden />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider hover:bg-neon"
            >
              {l.label}
            </a>
          ))}
          <a href={hireMeHref} className="btn btn-gradient ml-3 min-h-10 px-4 py-2 text-xs">
            Hire Me
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border-2 border-ink bg-neon md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.5" />
            ) : (
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2.5" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ink bg-ink md:hidden">
          <ul className="container-grid flex flex-col py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block border-b border-white/15 py-4 text-3xl text-white hover:text-neon"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-5">
              <a href={hireMeHref} onClick={() => setOpen(false)} className="btn btn-gradient w-full">
                Hire Me
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
