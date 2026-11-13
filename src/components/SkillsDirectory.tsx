import { useState } from 'react'
import { motion } from 'motion/react'
import { skillCategories } from '~/data/portfolio'
import { SectionHeading } from './SectionHeading'

const ALL = 'All'

export function SkillsDirectory() {
  const [active, setActive] = useState(ALL)
  const filters = [ALL, ...skillCategories.map((c) => c.category)]
  const visible = active === ALL ? skillCategories : skillCategories.filter((c) => c.category === active)
  const count = visible.reduce((n, c) => n + c.skills.length, 0)

  return (
    <section id="stack" aria-labelledby="stack-title" className="border-b border-ink py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="03" label="Stack" id="stack-title" title="Skills & tools directory.">
          Filter by discipline.
        </SectionHeading>

        <div role="group" aria-label="Filter skills by category" className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = f === active
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f)}
                className={`relative min-h-11 rounded-full border-2 border-ink bg-surface px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  on ? 'text-ink' : 'hover:bg-paper'
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-neon"
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

        <div className="mt-8 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
          {visible.map((c) => (
            <div key={c.category} className={`bg-surface p-5 sm:p-6 ${visible.length === 1 ? 'sm:col-span-2' : ''}`}>
              <h3 className="eyebrow flex items-center justify-between">
                <span>{c.category}</span>
                <span className="text-muted">{String(c.skills.length).padStart(2, '0')}</span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <li key={s} className="pill text-xs hover:bg-neon">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
