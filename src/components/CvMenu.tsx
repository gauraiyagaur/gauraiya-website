import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '~/data/portfolio'
import { Icon } from './Icon'

/** "Download CV" pill that opens a small menu with the two CV versions. */
export function CvMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ y: -2, scale: 1.02, boxShadow: '0px 14px 26px -14px rgba(20,17,43,0.25)' }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-soft px-6 text-[0.9375rem] font-semibold text-accent"
      >
        Download CV
        <motion.span animate={{ y: open ? 2 : 0 }} className="inline-flex">
          <Icon name="download" size={16} stroke={2.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="card absolute left-0 top-full z-30 mt-2 w-64 origin-top-left p-1.5"
          >
            <p className="px-3 pb-1 pt-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted">Pick a version</p>
            {profile.cvs.map((cv) =>
              cv.url ? (
                <a
                  key={cv.label}
                  role="menuitem"
                  href={cv.url}
                  download
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent group-hover:bg-white">
                    <Icon name="download" size={14} stroke={2.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{cv.label} CV</span>
                    <span className="block text-xs text-ink-soft">{cv.note}</span>
                  </span>
                </a>
              ) : (
                <span key={cv.label} role="menuitem" aria-disabled className="flex items-center gap-3 rounded-xl px-3 py-2.5 opacity-60">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-muted">
                    <Icon name="download" size={14} stroke={2.5} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{cv.label} CV</span>
                    <span className="block text-xs text-ink-soft">Coming soon</span>
                  </span>
                </span>
              ),
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
