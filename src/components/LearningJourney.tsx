import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { dissertationReview, journey, type Highlight, type JourneyMilestone } from '~/data/portfolio'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

const LAST = journey.length - 1
/** One colour per step, like the coloured icon circles in the reference. */
const STEP_COLORS = ['#6C47FF', '#12B886', '#F59F0B', '#F062B8', '#3B82F6']
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
    <section id="journey" aria-labelledby="journey-title" className="pb-8 pt-20 sm:pb-12 sm:pt-28">
      <div className="container-grid">
        <SectionHeading index="01" label="Journey" id="journey-title" title="The data-learning journey.">
          Five steps, one direction. Tap any step to open it.
        </SectionHeading>

        <div className="relative mt-14">
          {/* Desktop progress track */}
          <div className="absolute left-0 right-0 top-7 hidden h-1 -translate-y-1/2 rounded-full bg-line lg:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-7 hidden h-1 -translate-y-1/2 rounded-full lg:block [background:var(--gradient-cta)]"
            initial={false}
            animate={{ width: active === null ? '0px' : nodeX(active) }}
            transition={{ type: 'spring', stiffness: 160, damping: 26 }}
            aria-hidden
          />
          {/* Mobile vertical track */}
          <div className="absolute bottom-0 left-7 top-0 w-1 -translate-x-1/2 rounded-full bg-line lg:hidden" aria-hidden />

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {journey.map((m, i) => {
              const isActive = active === i
              const dimmed = active !== null && !isActive
              return (
                <li
                  key={m.step}
                  className={`flex gap-5 transition-opacity duration-200 lg:flex-col lg:gap-0 ${
                    dimmed ? 'lg:opacity-60 lg:hover:opacity-100' : ''
                  }`}
                >
                  <MilestoneNode m={m} color={STEP_COLORS[i]} active={isActive} onToggle={() => toggle(i)} />
                  <div className="min-w-0 flex-1 lg:mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] tabular-nums" style={{ color: STEP_COLORS[i] }}>
                      {m.step} · {m.tag}
                    </p>
                    <h3 className="mt-1.5 text-xl font-extrabold leading-tight tracking-tight">{m.title}</h3>
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
                            <div className="card mt-4 p-4">
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
                <div className="relative px-2 pb-10 pt-8">
                  {/* Notch pointing up to the active column */}
                  <motion.span
                    className="absolute top-[22px] z-10 h-5 w-5 rotate-45 rounded-[4px] border-l border-t border-line bg-white"
                    initial={false}
                    animate={{ left: `calc(${nodeX(active)} - 10px)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden
                  />
                  <div
                    className="card overflow-hidden !rounded-[2rem] !shadow-[var(--shadow-lift)]"
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
                        <div className="col-span-3 flex flex-col bg-paper p-8">
                          <p className="text-gradient text-8xl font-extrabold leading-none tracking-tight tabular-nums">{journey[active].step}</p>
                          <p className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">{journey[active].title}</p>
                          {journey[active].period ? (
                            <p className="mt-1 text-sm text-muted tabular-nums">{journey[active].period}</p>
                          ) : null}
                          <div className="mt-auto flex items-center gap-2 pt-8">
                            <StepButton disabled={active === 0} onClick={() => select(active - 1)} label="Previous step">
                              ← Prev
                            </StepButton>
                            <StepButton disabled={active === LAST} onClick={() => select(active + 1)} label="Next step">
                              Next →
                            </StepButton>
                            <span className="ml-auto text-xs font-semibold text-muted tabular-nums">
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
      className="min-h-10 rounded-full border border-line bg-white px-4 text-xs font-bold transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-current"
    >
      {children}
    </button>
  )
}

function MilestoneNode({
  m,
  color,
  active,
  onToggle,
}: {
  m: JourneyMilestone
  color: string
  active: boolean
  onToggle: () => void
}) {
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
        rest: { y: 0, scale: 1, boxShadow: `0px 0px 0px 0px ${color}00` },
        hover: { y: -4, scale: 1.05, boxShadow: `0px 14px 24px -8px ${color}aa` },
        active: { y: 0, scale: 1.08, boxShadow: `0px 0px 0px 6px ${color}33` },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{ backgroundColor: color }}
      className="relative z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full text-white"
    >
      <Icon name={m.icon} size={24} />
      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm">
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
        <p className="mt-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-accent">{m.chipsLabel}</p>
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
          <span className="mt-[0.4rem] flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-accent-soft" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
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
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{m.organization}</p>

      {isMsc ? (
        <div role="tablist" aria-label="MSc details" className="mt-4 inline-flex flex-wrap gap-1 rounded-full bg-paper p-1">
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
              className="relative rounded-full px-4 py-2 text-xs font-bold"
            >
              {tab === id ? (
                <motion.span
                  layoutId={`msc-tab-${uid}`}
                  className="absolute inset-0 rounded-full bg-white shadow-[var(--shadow-soft)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden
                />
              ) : null}
              <span className={`relative ${tab === id ? 'text-accent' : 'text-ink-soft hover:text-ink'}`}>{label}</span>
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
      <p className="text-xl font-extrabold tracking-tight">{r.title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {r.stats.map((s) => (
          <li key={s} className="tag tabular-nums">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div>
          <p className="eyebrow !bg-mint-soft !text-mint">What worked</p>
          <div className="mt-3">
            <Bullets items={r.worked} />
          </div>
        </div>
        <div className="rounded-2xl bg-pink-soft/60 p-5">
          <p className="eyebrow !bg-white !text-pink">The candid takeaway</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">{r.takeaway.lead}</strong> {r.takeaway.text}
          </p>
        </div>
      </div>
    </div>
  )
}
