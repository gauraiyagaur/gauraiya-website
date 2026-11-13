import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { hireMeHref, navLinks, profile } from '~/data/portfolio'
import { MorphPill } from './MorphPill'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids.join()])
  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const active = useActiveSection(navLinks.map((l) => l.href.slice(1)))
  const highlight = hovered ?? (active ? `#${active}` : null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-surface/85 backdrop-blur-md">
      <div className="container-grid flex h-16 items-center justify-between gap-4">
        <a href="#top" className="display text-xl tracking-tight sm:text-2xl" aria-label={`${profile.name}, back to top`}>
          <span className="hidden sm:inline">GAURAIYA GAUR</span>
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="ml-1 inline-block h-2.5 w-2.5 bg-neon align-middle ring-1 ring-ink" aria-hidden />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              onFocus={() => setHovered(l.href)}
              onBlur={() => setHovered(null)}
              aria-current={active && `#${active}` === l.href ? 'true' : undefined}
              className="relative px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider"
            >
              {highlight === l.href ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-x-1 bottom-1 h-2 rounded-full bg-neon"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  aria-hidden
                />
              ) : null}
              <span className="relative">{l.label}</span>
            </a>
          ))}
          <MorphPill href={hireMeHref} variant="gradient" size="sm" className="ml-3">
            Hire Me
          </MorphPill>
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
