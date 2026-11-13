import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { dissertationReview, journey, type Highlight, type JourneyMilestone } from '~/data/portfolio'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

const LAST = journey.length - 1
/** Horizontal offset of node i's centre inside the 5-column track (gap 1.5rem, node 56px). */
const nodeX = (i: number) => `calc(${i} * (100% + 1.5rem) / ${journey.length} + 28px)`

export function LearningJourney() {
  const [active, setActive] = useState<number | null>(0)
  const [dir, setDir] = useState(1)

  const select = (i: number | null) => {
    if (i !== null && active !== null) setDir(i > active ? 1 : -1)
    setActive(i)
  }
  const toggle = (i: number) => select(active === i ? null : i)

  return (
    <section id="journey" aria-labelledby="journey-title" className="border-b border-ink py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="01" label="Journey" id="journey-title" title="The data-learning journey.">
          Five steps, one direction. Tap any step to open it.
        </SectionHeading>

        <div className="relative mt-12">
          {/* Desktop progress track */}
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-line lg:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-7 hidden h-0.5 bg-ink lg:block"
            initial={false}
            animate={{ width: active === null ? '0px' : nodeX(active) }}
            transition={{ type: 'spring', stiffness: 160, damping: 26 }}
            aria-hidden
          />
          {/* Mobile vertical track */}
          <div className="absolute bottom-0 left-7 top-0 w-0.5 bg-line lg:hidden" aria-hidden />

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {journey.map((m, i) => {
              const isActive = active === i
              const dimmed = active !== null && !isActive
              return (
                <li
                  key={m.step}
                  className={`flex gap-5 transition-opacity duration-200 lg:flex-col lg:gap-0 ${
                    dimmed ? 'lg:opacity-75 lg:hover:opacity-100' : ''
                  }`}
                >
                  <MilestoneNode m={m} active={isActive} onToggle={() => toggle(i)} />
                  <div className="min-w-0 flex-1 lg:mt-5">
                    <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted tabular-nums">
                      {m.step} // {m.tag}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight">{m.title}</h3>
                    <p className="mt-2 text-sm leading-snug text-ink-soft">{m.summary}</p>
                    <Chips m={m} />
                    {/* Mobile: details open inline */}
                    <div className="lg:hidden">
                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.div
                            key="d"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-[1.5px] border-ink bg-surface p-4">
                              <DetailBody m={m} />
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Desktop drawer */}
        <div className="hidden lg:block">
          <AnimatePresence initial={false}>
            {active !== null ? (
              <motion.div
                key="drawer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="relative pt-8">
                  {/* Notch pointing up to the active column */}
                  <motion.span
                    className="absolute top-[18px] h-0 w-0 border-x-[11px] border-b-[14px] border-x-transparent border-b-ink"
                    initial={false}
                    animate={{ left: `calc(${nodeX(active)} - 11px)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden
                  />
                  <div
                    className="overflow-hidden border-[1.5px] border-ink bg-surface shadow-[6px_6px_0_#E6FF00]"
                    aria-live="polite"
                  >
                    <AnimatePresence mode="wait" initial={false} custom={dir}>
                      <motion.div
                        key={journey[active].step}
                        custom={dir}
                        initial={{ x: dir * 32, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: dir * -32, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="grid grid-cols-10"
                      >
                        <div className="col-span-3 flex flex-col border-r-[1.5px] border-ink p-8">
                          <p className="display text-8xl text-transparent tabular-nums [-webkit-text-stroke:2px_#0A0A0A] [paint-order:stroke] [text-shadow:4px_4px_0_#E6FF00]">
                            {journey[active].step}
                          </p>
                          <p className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight">{journey[active].title}</p>
                          {journey[active].period ? (
                            <p className="mt-1 font-mono text-xs text-muted tabular-nums">{journey[active].period}</p>
                          ) : null}
                          <div className="mt-auto flex items-center gap-2 pt-8">
                            <StepButton disabled={active === 0} onClick={() => select(active - 1)} label="Previous step">
                              ← Prev
                            </StepButton>
                            <StepButton disabled={active === LAST} onClick={() => select(active + 1)} label="Next step">
                              Next →
                            </StepButton>
                            <span className="ml-auto font-mono text-[0.6875rem] text-muted tabular-nums">
                              {journey[active].step} / {journey[LAST].step}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-7 p-8">
                          <DetailBody m={journey[active]} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
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

function StepButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="min-h-9 border-[1.5px] border-ink px-3 font-mono text-[0.6875rem] font-bold uppercase tracking-wider transition-colors hover:bg-neon disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  )
}

function MilestoneNode({ m, active, onToggle }: { m: JourneyMilestone; active: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-expanded={active}
      aria-label={`${active ? 'Close' : 'Open'} step ${m.step}: ${m.title}`}
      initial={false}
      animate={active ? 'active' : 'rest'}
      whileHover={active ? 'active' : 'hover'}
      whileTap={{ scale: 0.94 }}
      variants={{
        rest: { y: 0, rotate: 0, backgroundColor: '#E6FF00', color: '#0A0A0A', boxShadow: '0px 0px 0px #E6FF00' },
        hover: { y: -4, rotate: 2, backgroundColor: '#E6FF00', color: '#0A0A0A', boxShadow: '0px 0px 0px #E6FF00' },
        active: { y: 0, rotate: -3, backgroundColor: '#0A0A0A', color: '#E6FF00', boxShadow: '4px 4px 0px #E6FF00' },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="relative z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center border-2 border-ink"
    >
      <Icon name={m.icon} size={26} />
      <span className="absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center border-2 border-ink bg-surface text-ink">
        <motion.span
          className="flex"
          variants={{ rest: { rotate: 0 }, hover: { rotate: 90 }, active: { rotate: 45 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Icon name="plus" size={10} stroke={3.5} />
        </motion.span>
      </span>
    </motion.button>
  )
}

function Chips({ m }: { m: JourneyMilestone }) {
  if (!m.chips?.length) return null
  return (
    <>
      {m.chipsLabel ? (
        <p className="mt-3 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em]">
          <span className="bg-neon px-1">{m.chipsLabel}</span>
        </p>
      ) : null}
      <ul className={`${m.chipsLabel ? 'mt-1.5' : 'mt-3'} flex flex-wrap gap-1.5`}>
        {m.chips.map((c) => (
          <li key={c} className="tag">
            {c}
          </li>
        ))}
      </ul>
    </>
  )
}

function Bullets({ items }: { items: Highlight[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((h) => (
        <li key={h.lead} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
          <span className="mt-[0.45rem] h-2 w-2 shrink-0 bg-magenta" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{h.lead}</strong> {h.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

function DetailBody({ m }: { m: JourneyMilestone }) {
  const isMsc = m.step === journey[LAST].step
  const [tab, setTab] = useState<'milestones' | 'review'>('milestones')
  const uid = useId()

  return (
    <div>
      <p className="eyebrow text-[0.6875rem] text-muted">{m.organization}</p>

      {isMsc ? (
        <div role="tablist" aria-label="MSc details" className="mt-4 inline-flex flex-wrap border-[1.5px] border-ink">
          {(
            [
              ['milestones', 'MSc Milestones & Leadership'],
              ['review', dissertationReview.tab],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className="relative px-3 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-wider"
            >
              {tab === id ? (
                <motion.span
                  layoutId={`msc-tab-${uid}`}
                  className="absolute inset-0 bg-ink"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden
                />
              ) : null}
              <span className={`relative ${tab === id ? 'text-neon' : 'hover:bg-neon'}`}>{label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4" role={isMsc ? 'tabpanel' : undefined}>
        {isMsc && tab === 'review' ? (
          <Review />
        ) : m.highlights?.length ? (
          <Bullets items={m.highlights} />
        ) : null}
      </div>
    </div>
  )
}

function Review() {
  const r = dissertationReview
  return (
    <div>
      <p className="font-display text-xl font-extrabold tracking-tight">{r.title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {r.stats.map((s) => (
          <li key={s} className="tag tabular-nums">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div>
          <p className="eyebrow text-[0.6875rem]">
            <span className="bg-neon px-1">What worked</span>
          </p>
          <div className="mt-3">
            <Bullets items={r.worked} />
          </div>
        </div>
        <div className="border-l-4 border-magenta bg-paper p-4">
          <p className="eyebrow text-[0.6875rem]">
            <span className="bg-magenta px-1 text-white">The candid takeaway</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">{r.takeaway.lead}</strong> {r.takeaway.text}
          </p>
        </div>
      </div>
    </div>
  )
}
