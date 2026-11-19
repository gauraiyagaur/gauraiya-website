import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { dissertationGlance, journey, type Highlight, type JourneyMilestone } from '~/data/portfolio'
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
        <SectionHeading index="01" label="Journey" id="journey-title" title="How I grew into AI.">
          The story behind my leap from software to applied AI.
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
                    <div className="relative z-10 -ml-[4.75rem] lg:hidden">
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
          <li key={c} className="tag !px-2 !text-[0.625rem]">
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

function Path({ m, color }: { m: JourneyMilestone; color: string }) {
  if (!m.path?.length) return null
  return (
    <div className="mt-4">
      {m.pathLabel ? <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted">{m.pathLabel}</p> : null}
      <ol className="mt-2 flex flex-wrap items-center gap-y-2">
        {m.path.map((p, i) => {
          const last = i === m.path!.length - 1
          return (
            <motion.li
              key={p}
              className="flex items-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.25 }}
            >
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${last ? 'text-white shadow-[var(--shadow-glow)]' : 'border border-line bg-white text-ink-soft'}`}
                style={last ? { background: 'var(--gradient-cta)' } : undefined}
              >
                {p}
              </span>
              {!last ? (
                <span className="mx-1.5 text-sm font-bold" style={{ color }} aria-hidden>
                  →
                </span>
              ) : null}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

function Groups({ m, color }: { m: JourneyMilestone; color: string }) {
  if (!m.groups?.length) return null
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {m.groups.map((g) => (
        <div key={g.label} className="rounded-2xl border border-line bg-paper/60 p-3.5 sm:p-4">
          <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em]" style={{ color }}>
            {g.label}
          </p>
          <Bullets items={g.items} />
        </div>
      ))}
    </div>
  )
}

function Callout({ m }: { m: JourneyMilestone }) {
  if (!m.callout) return null
  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl p-4 [background:linear-gradient(100deg,#efebff,#fde8f4)]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm" aria-hidden>
        ★
      </span>
      <p className="text-sm leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">{m.callout.lead}</strong> {m.callout.text}
      </p>
    </div>
  )
}

function DetailBody({ m }: { m: JourneyMilestone }) {
  const isMsc = m.step === journey[LAST].step
  const color = STEP_COLORS[journey.indexOf(m)] ?? STEP_COLORS[0]
  const [tab, setTab] = useState<'milestones' | 'glance'>('milestones')
  const uid = useId()

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{m.organization}</p>

      {m.brands?.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em]" style={{ color }}>
            Global brands
          </span>
          {m.brands.map((b) => (
            <span key={b} className="tag">
              {b}
            </span>
          ))}
        </div>
      ) : null}

      {isMsc ? (
        <div role="tablist" aria-label="MSc details" className="mt-4 inline-flex flex-wrap gap-1 rounded-full bg-paper p-1">
          {(
            [
              ['milestones', 'MSc Milestones & Leadership'],
              ['glance', dissertationGlance.tab],
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

      <Path m={m} color={color} />

      <div className="mt-4" role={isMsc ? 'tabpanel' : undefined}>
        {isMsc && tab === 'glance' ? (
          <Glance />
        ) : m.groups?.length ? (
          <Groups m={m} color={color} />
        ) : m.highlights?.length ? (
          <Bullets items={m.highlights} />
        ) : null}
      </div>

      <Callout m={m} />
    </div>
  )
}

const PIPELINE: { label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { label: 'Read the brand', icon: 'profile' },
  { label: 'Calibrate & gate', icon: 'gauge' },
  { label: 'Ideate', icon: 'bulb' },
  { label: 'Critique', icon: 'shield' },
]

const PROFILE = [0.82, 0.64, 0.9, 0.48, 0.72]

function Meter({ label, level, tone }: { label: string; level: 1 | 2 | 3; tone: string }) {
  const names = ['Low', 'Medium', 'High']
  return (
    <div>
      <div className="flex items-center justify-between text-[0.625rem] font-bold">
        <span className="text-ink">{label}</span>
        <span style={{ color: tone }}>{names[level - 1]}</span>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-1">
        {[1, 2, 3].map((n) => (
          <motion.span
            key={n}
            className="h-1.5 rounded-full"
            initial={{ backgroundColor: '#ebe9f3' }}
            animate={{ backgroundColor: n <= level ? tone : '#ebe9f3' }}
            transition={{ delay: 0.9 + n * 0.12, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

/** Faux product screen giving a concept overview of Luxcal, without exposing its internals. */
function Glance() {
  const g = dissertationGlance
  return (
    <div>
      <p className="text-xl font-extrabold tracking-tight">{g.title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {g.stats.map((s) => (
          <li key={s} className="tag tabular-nums">
            {s}
          </li>
        ))}
      </ul>

      <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-soft)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-pink/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-peach/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
          <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[0.625rem] font-semibold text-muted">luxcal · brand AI calibration</span>
          <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-accent-soft px-2 py-0.5 text-[0.5625rem] font-bold text-accent">Concept preview</span>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 gap-3 p-3 sm:min-w-[600px] sm:grid-cols-[0.9fr_1.1fr] sm:p-4">
            {/* Left: input + run status */}
            <div className="space-y-3">
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="flex items-center gap-1.5 text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                  <Icon name="doc" size={11} stroke={2.25} /> Brand brief
                </p>
                <div className="mt-2 space-y-1.5" aria-hidden>
                  {['w-full', 'w-11/12', 'w-4/5', 'w-2/3'].map((w) => (
                    <span key={w} className={`block h-1.5 rounded-full bg-paper ${w}`} />
                  ))}
                </div>
                <p className="mt-2 text-[0.625rem] italic leading-snug text-ink-soft">“A heritage maison whose clients value discretion and craft…”</p>
                <motion.span
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.625rem] font-bold text-white"
                  style={{ background: 'var(--gradient-cta)' }}
                  whileHover={{ scale: 1.04 }}
                >
                  <Icon name="spark" size={10} stroke={2.5} /> Calibrate
                </motion.span>
              </div>

              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-muted">Agents at work</p>
                <ol className="mt-2 space-y-1.5">
                  {PIPELINE.map((st, n) => (
                    <motion.li
                      key={st.label}
                      className="flex items-center gap-2 text-[0.6875rem] font-semibold text-ink"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + n * 0.15 }}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent-soft text-accent">
                        <Icon name={st.icon} size={11} stroke={2.25} />
                      </span>
                      {st.label}
                      <motion.span
                        className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-mint text-[0.5rem] text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.35 + n * 0.15, type: 'spring', stiffness: 400, damping: 18 }}
                        aria-label="done"
                      >
                        ✓
                      </motion.span>
                    </motion.li>
                  ))}
                </ol>
                <p className="mt-2.5 flex items-center gap-1.5 text-[0.5625rem] font-semibold text-pink">
                  <Icon name="loop" size={10} stroke={2.5} /> Self-checks and revises before answering
                </p>
              </div>
            </div>

            {/* Right: results */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-line bg-white p-3">
                  <p className="text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-muted">Brand profile</p>
                  <div className="mt-2 flex h-14 items-end gap-1.5" aria-hidden>
                    {PROFILE.map((v, n) => (
                      <motion.span
                        key={n}
                        className="flex-1 rounded-t-md"
                        style={{ background: 'var(--gradient-cta)', opacity: 0.35 + v * 0.6 }}
                        initial={{ height: 0 }}
                        animate={{ height: `${v * 100}%` }}
                        transition={{ delay: 0.4 + n * 0.08, duration: 0.5, ease: 'easeOut' }}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[0.5625rem] text-muted">Five luxury dimensions</p>
                </div>
                <div className="w-[42%] rounded-xl border border-line bg-white p-3">
                  <p className="text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-muted">Gate</p>
                  <motion.p
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[0.625rem] font-extrabold text-mint"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ● AI fits this brand
                  </motion.p>
                  <p className="mt-2 text-[0.5625rem] leading-snug text-muted">Says no, with reasons, when it doesn’t.</p>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-muted">Calibration</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <Meter label="AI visibility" level={1} tone="#12B886" />
                  <Meter label="Personal intensity" level={2} tone="#F59F0B" />
                </div>
              </div>

              <motion.div
                className="rounded-xl bg-night p-3 text-white"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <p className="flex items-center gap-1.5 text-[0.5625rem] font-extrabold uppercase tracking-[0.12em] text-white/60">
                  <Icon name="target" size={11} stroke={2.25} /> Output
                </p>
                <p className="mt-1 text-[0.8125rem] font-extrabold leading-snug">Where and how to calibrate AI for this brand brief</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[0.5625rem] leading-snug">
                  <p className="rounded-lg bg-white/10 p-2">
                    <span className="block font-bold text-white">Where</span>
                    <span className="text-white/70">The touchpoint where AI adds value</span>
                  </p>
                  <p className="rounded-lg bg-white/10 p-2">
                    <span className="block font-bold text-white">How</span>
                    <span className="text-white/70">A concept kept inside the calibrated limits</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  )
}
