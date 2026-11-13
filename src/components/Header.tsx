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
    <header className="sticky top-3 z-50 px-3 sm:top-4">
      <div className="mx-auto flex h-16 max-w-[74rem] items-center justify-between gap-4 rounded-full border border-line bg-white/80 pl-3 pr-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white [background:var(--gradient-cta)]">
            GG
          </span>
          <span className="hidden text-base font-extrabold tracking-tight sm:inline">{profile.name}</span>
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
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink aria-[current]:text-ink"
            >
              {highlight === l.href ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-accent-soft"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  aria-hidden
                />
              ) : null}
              <span className="relative">{l.label}</span>
            </a>
          ))}
          <MorphPill href={hireMeHref} variant="primary" size="sm" className="ml-2">
            Hire Me
          </MorphPill>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent md:hidden"
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
        <nav id="mobile-menu" aria-label="Mobile" className="mx-auto mt-2 max-w-[74rem] overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-lift)] md:hidden">
          <ul className="flex flex-col px-5 py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-2xl font-bold tracking-tight hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-5">
              <a
                href={hireMeHref}
                onClick={() => setOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-full font-semibold text-white [background:var(--gradient-cta)]"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
