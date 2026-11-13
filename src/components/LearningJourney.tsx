import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { journey, type JourneyMilestone } from '~/data/portfolio'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const },
}

export function LearningJourney() {
  const [active, setActive] = useState<number | null>(null)
  const toggle = (i: number) => setActive((cur) => (cur === i ? null : i))
  const current = active === null ? null : journey[active]

  return (
    <section id="journey" aria-labelledby="journey-title" className="border-b border-ink py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="01" label="Journey" id="journey-title" title="The data-learning journey.">
          Five steps, one direction. Tap any step to open it.
        </SectionHeading>

        {/* Track */}
        <div className="relative mt-12">
          {/* Connecting line: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-7 top-0 h-full w-0.5 bg-line lg:left-0 lg:top-7 lg:h-0.5 lg:w-full" aria-hidden />
          <motion.div
            className="absolute left-7 top-0 hidden h-0.5 w-full origin-left bg-ink lg:top-7 lg:left-0 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden
          />
          <motion.div
            className="absolute left-7 top-0 h-full w-0.5 origin-top bg-ink lg:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden
          />

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {journey.map((m, i) => (
              <motion.li
                key={m.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex gap-5 lg:flex-col lg:gap-0"
              >
                <MilestoneNode m={m} open={active === i} onToggle={() => toggle(i)} />
                <div className="min-w-0 flex-1 lg:mt-5">
                  <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted">
                    {m.step} // {m.tag}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm leading-snug text-ink-soft">{m.summary}</p>
                  {m.chipsLabel ? (
                    <p className="mt-3 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em]">
                      <span className="bg-neon px-1">{m.chipsLabel}</span>
                    </p>
                  ) : null}
                  {m.chips?.length ? (
                    <ul className={`${m.chipsLabel ? 'mt-1.5' : 'mt-3'} flex flex-wrap gap-1.5`}>
                      {m.chips.map((c) => (
                        <li key={c} className="border border-ink bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider">
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {/* Mobile: details open inline */}
                  <div className="lg:hidden">
                    <AnimatePresence initial={false}>
                      {active === i ? (
                        <motion.div key="d" {...reveal} className="overflow-hidden">
                          <Details m={m} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Desktop: one shared detail panel under the track */}
        <div className="hidden lg:block" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {current ? (
              <motion.div key={current.step} {...reveal} className="overflow-hidden">
                <div className="mt-10 grid grid-cols-12 gap-8 border-2 border-ink bg-surface p-8 shadow-[6px_6px_0_#E6FF00,6px_6px_0_2px_#0A0A0A]">
                  <div className="col-span-4">
                    <p className="display text-7xl text-neon [-webkit-text-stroke:2px_#0A0A0A]">{current.step}</p>
                    <p className="mt-3 font-display text-2xl font-extrabold tracking-tight">{current.title}</p>
                    {current.period ? <p className="mt-1 font-mono text-xs text-muted">{current.period}</p> : null}
                  </div>
                  <div className="col-span-8">
                    <Details m={current} />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function MilestoneNode({ m, open, onToggle }: { m: JourneyMilestone; open: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={`${open ? 'Close' : 'Open'} step ${m.step}: ${m.title}`}
      whileHover={{ rotate: -6, scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      animate={{ backgroundColor: open ? '#0A0A0A' : '#E6FF00', color: open ? '#E6FF00' : '#0A0A0A' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center border-2 border-ink"
    >
      <Icon name={m.icon} size={26} />
      <span className="absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center border-2 border-ink bg-surface text-ink">
        <motion.span className="flex" animate={{ rotate: open ? 45 : 0 }}>
          <Icon name="plus" size={10} stroke={3.5} />
        </motion.span>
      </span>
    </motion.button>
  )
}

function Details({ m }: { m: JourneyMilestone }) {
  return (
    <div className="pt-4 lg:pt-0">
      <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">{m.organization}</p>
      {m.highlights?.length ? (
        <ul className="mt-3 space-y-2">
          {m.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
              <span className="mt-1.5 h-2 w-2 shrink-0 bg-magenta" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
