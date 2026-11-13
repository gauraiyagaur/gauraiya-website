import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { skillCategories } from '~/data/portfolio'
import { SectionHeading } from './SectionHeading'

const ALL = 'All'
const TINTS = ['#EFEBFF', '#E3F8F0', '#FFF1DC', '#E5EFFF']

export function SkillsDirectory() {
  const [active, setActive] = useState(ALL)
  const filters = [ALL, ...skillCategories.map((c) => c.category)]
  const visible = active === ALL ? skillCategories : skillCategories.filter((c) => c.category === active)
  const count = visible.reduce((n, c) => n + c.skills.length, 0)

  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 sm:py-28">
      <div className="container-grid">
        <SectionHeading index="03" label="Stack" id="stack-title" title={<>Skills &amp; <span className="text-gradient">tools.</span></>}>
          Filter by discipline.
        </SectionHeading>

        <div role="group" aria-label="Filter skills by category" className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-3xl bg-paper p-1.5 sm:rounded-full">
          {filters.map((f) => {
            const on = f === active
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f)}
                className={`relative min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? 'text-accent' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-white shadow-[var(--shadow-soft)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    aria-hidden
                  />
                ) : null}
                <span className="relative">{f}</span>
              </button>
            )
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {count} skills
        </p>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((c) => (
            <motion.div
              style={{ background: TINTS[skillCategories.indexOf(c) % TINTS.length] }}
              layout
              key={c.category}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`rounded-3xl p-6 sm:p-7 ${visible.length === 1 ? 'sm:col-span-2' : ''}`}
            >
              <h3 className="flex items-center justify-between text-lg font-extrabold tracking-tight">
                <span>{c.category}</span>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-ink-soft">{c.skills.length}</span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <li key={s} className="pill !border-white/0 !bg-white">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
