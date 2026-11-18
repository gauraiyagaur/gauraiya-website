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
        <div key={g.label} className="rounded-2xl border border-line bg-paper/60 p-4">
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

type NodeKind = 'llm' | 'rule' | 'end' | 'stop'

const NODE_STYLE: Record<NodeKind, string> = {
  llm: 'border-accent/25 bg-accent-soft/70',
  rule: 'border-line bg-white',
  stop: 'border-pink/25 bg-pink-soft/60',
  end: 'border-transparent bg-night text-white',
}

const ICON_STYLE: Record<NodeKind, string> = {
  llm: 'bg-white text-accent',
  rule: 'bg-paper text-ink-soft',
  stop: 'bg-white text-pink',
  end: 'bg-white/10 text-white',
}

type FlowIconName = Parameters<typeof Icon>[0]['name']
type Step = { t: string; k?: 'llm' | 'rule' }

function FlowNode({
  kind,
  icon,
  tag,
  title,
  meta,
  lines,
  steps,
  delay = 0,
}: {
  kind: NodeKind
  icon: FlowIconName
  tag?: string
  title: string
  /** Model line, e.g. "Sonnet 4.6 · temp 0.0". */
  meta?: string
  lines?: string[]
  /** Sub-steps tagged as LLM or rule-based. */
  steps?: Step[]
  delay?: number
}) {
  const dark = kind === 'end'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={`h-full rounded-xl border px-2.5 py-2 ${NODE_STYLE[kind]}`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${ICON_STYLE[kind]}`}>
          <Icon name={icon} size={12} stroke={2.25} />
        </span>
        {tag ? (
          <span className={`text-[0.5rem] font-extrabold uppercase tracking-[0.12em] ${dark ? 'text-white/60' : 'text-muted'}`}>{tag}</span>
        ) : null}
      </div>
      <p className={`mt-1.5 whitespace-nowrap text-[0.6875rem] font-extrabold leading-tight ${dark ? 'text-white' : 'text-ink'}`}>{title}</p>
      {meta ? <p className="mt-0.5 whitespace-nowrap font-mono text-[0.5rem] font-semibold text-accent/80">{meta}</p> : null}
      {steps?.length ? (
        <ul className="mt-1.5 space-y-0.5">
          {steps.map((st) => (
            <li key={st.t} className="flex items-center gap-1 text-[0.5625rem] leading-snug text-ink-soft">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-[2px] ${st.k === 'rule' ? 'bg-white ring-1 ring-ink/25' : 'bg-accent/60'}`}
                aria-hidden
              />
              <span>{st.t}</span>
              <span className="sr-only">{st.k === 'rule' ? '(rule-based)' : '(LLM)'}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {lines?.map((l) => (
        <p key={l} className={`mt-0.5 text-[0.5625rem] leading-snug ${dark ? 'text-white/70' : 'text-muted'}`}>
          {l}
        </p>
      ))}
    </motion.div>
  )
}

function Gate({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex h-16 w-16 shrink-0 items-center justify-center"
    >
      <div className="flex h-11 w-11 rotate-45 items-center justify-center rounded-lg border border-sky/40 bg-sky-soft">
        <span className="-rotate-45 text-[0.5rem] font-extrabold uppercase text-sky">{label}</span>
      </div>
    </motion.div>
  )
}

const Arrow = ({ label, dir = 'right', tone = 'muted' }: { label?: string; dir?: 'right' | 'left' | 'down'; tone?: 'muted' | 'pink' }) => (
  <div
    className={`flex shrink-0 items-center justify-center ${tone === 'pink' ? 'text-pink' : 'text-muted'} ${dir === 'down' ? 'flex-col py-0.5' : 'flex-col px-1'}`}
    aria-hidden
  >
    {label ? <span className="text-[0.5rem] font-extrabold uppercase tracking-wide">{label}</span> : null}
    <span className="text-xs leading-none">{dir === 'down' ? '↓' : dir === 'left' ? '←' : '→'}</span>
  </div>
)

/** Faux app window showing the Luxcal pipeline in the site's own style. */
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
          <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[0.625rem] font-semibold text-muted">
            luxcal · {g.subtitle}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[640px] p-4">
            {/* Row 1: brief → profiler → calibration → gate → refusal */}
            <div className="flex items-stretch">
              <div className="w-[16%]">
                <FlowNode kind="rule" icon="doc" tag="Entry point" title="Brand brief" lines={['Unstructured client brief, in free text']} />
              </div>
              <Arrow />
              <div className="w-[20%]">
                <FlowNode
                  kind="llm"
                  icon="profile"
                  tag="Agent 1"
                  title="Brand Profiler"
                  meta="Sonnet 4.6 · temp 0.0"
                  lines={['Out: BrandProfile, D1 to D5', 'Rarity · invisibility · values · motivation · control', 'Evidence span + confidence each']}
                  delay={0.08}
                />
              </div>
              <Arrow />
              <div className="w-[21%]">
                <FlowNode
                  kind="llm"
                  icon="gauge"
                  tag="Agent 2"
                  title="Calibration & Gate"
                  meta="Opus 4.6 · temp 0.0 + rules"
                  steps={[
                    { t: 'Gate', k: 'llm' },
                    { t: 'Ceilings', k: 'rule' },
                    { t: 'Locus filter', k: 'rule' },
                    { t: 'Ranking', k: 'llm' },
                  ]}
                  lines={['Out: gate, bands, ranked loci']}
                  delay={0.16}
                />
              </div>
              <Arrow />
              <div className="flex items-center">
                <Gate label="Proceed?" delay={0.24} />
              </div>
              <Arrow label="No" tone="pink" />
              <div className="flex-1">
                <FlowNode kind="stop" icon="ban" tag="Terminal" title="Reasoned refusal" lines={['Run ends with a written justification']} delay={0.3} />
              </div>
            </div>

            {/* Yes branch drops from the gate */}
            <div className="relative h-8">
              <div className="absolute top-0.5 -translate-x-1/2" style={{ left: 'var(--gate-x, 70%)' }}>
                <Arrow label="Yes" dir="down" />
              </div>
            </div>

            {/* Row 2 (right to left): ideation → critic → verdict → output */}
            <div className="flex items-stretch">
              <div className="flex-1">
                <FlowNode
                  kind="end"
                  icon="target"
                  tag="Output"
                  title="Calibrated AI plan"
                  lines={['Where and how to calibrate AI for a brand brief']}
                  delay={0.62}
                />
              </div>
              <Arrow label="Pass" dir="left" />
              <div className="flex items-center">
                <Gate label="Verdict" delay={0.54} />
              </div>
              <Arrow dir="left" />
              <div className="w-[23%]">
                <FlowNode
                  kind="llm"
                  icon="shield"
                  tag="Critic"
                  title="Two-check review"
                  meta="Opus 4.6 · temp 0.0"
                  steps={[
                    { t: 'Claimed bands ≤ ceilings?', k: 'rule' },
                    { t: 'Concept matches its bands?', k: 'llm' },
                  ]}
                  lines={['Verdict: pass, revise or escalate']}
                  delay={0.46}
                />
              </div>
              <Arrow dir="left" />
              <div className="w-[22%]">
                <FlowNode
                  kind="llm"
                  icon="bulb"
                  tag="Agent 3"
                  title="Ideation"
                  meta="Sonnet 4.6 · temp 0.7"
                  lines={['In: top locus, ceilings, profile', 'Out: concept with mechanism, AI position, claimed visibility + intensity']}
                  delay={0.38}
                />
              </div>
              <div className="flex w-[17%] items-center justify-center">
                <span className="inline-flex flex-col items-center rounded-xl bg-pink-soft px-2 py-1 text-center text-[0.5rem] font-extrabold uppercase leading-tight text-pink">
                  <Icon name="loop" size={10} stroke={2.5} />
                  Revise loop
                  <span className="font-semibold normal-case">max 3 iterations</span>
                </span>
              </div>
            </div>

            {/* Escalate branch drops from the verdict */}
            <div className="relative h-8">
              <div className="absolute top-0.5 -translate-x-1/2" style={{ left: 'var(--verdict-x, 29%)' }}>
                <Arrow label="Escalate" dir="down" />
              </div>
            </div>

            {/* Row 3: supporting pieces */}
            <div className="grid grid-cols-[1fr_1.25fr_1.25fr] gap-3">
              <FlowNode kind="stop" icon="eye" tag="Terminal" title="Human review" lines={['Iteration budget spent without a passing concept']} delay={0.7} />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.74, duration: 0.3 }}
                className="rounded-xl border border-line bg-white px-2.5 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-paper text-ink-soft">
                    <Icon name="database" size={12} stroke={2.25} />
                  </span>
                  <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">LangGraph</span>
                </div>
                <p className="mt-1.5 whitespace-nowrap text-[0.6875rem] font-extrabold leading-tight text-ink">Shared state</p>
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {['run_id', 'brief', 'profile', 'calibration', 'concept', 'verdict', 'iteration', 'critic_history', 'terminal_state'].map((f) => (
                    <li key={f} className="rounded bg-paper px-1 py-px font-mono text-[0.5rem] text-ink-soft">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-[0.5625rem] leading-snug text-muted">Every agent reads what it needs and writes only its own field.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.3 }}
                className="rounded-xl border border-line bg-white px-2.5 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-paper text-ink-soft">
                    <Icon name="sliders" size={12} stroke={2.25} />
                  </span>
                  <span className="text-[0.5rem] font-extrabold uppercase tracking-[0.12em] text-muted">Computed in Agent 2</span>
                </div>
                <p className="mt-1.5 whitespace-nowrap text-[0.6875rem] font-extrabold leading-tight text-ink">Two calibrated axes</p>
                <div className="mt-1.5 space-y-1">
                  <p className="text-[0.5625rem] leading-snug text-ink-soft">
                    <span className="font-bold text-accent">Visibility</span> <span className="font-mono">← D2 + D4 + D5</span>
                    <span className="block text-muted">How perceptible the AI is to the client</span>
                  </p>
                  <p className="text-[0.5625rem] leading-snug text-ink-soft">
                    <span className="font-bold text-pink">Intensity</span> <span className="font-mono">← D1 + D3 + D5</span>
                    <span className="block text-muted">How far the offering differentiates per person</span>
                  </p>
                </div>
                <div className="mt-1.5 flex gap-1">
                  {['Low ≤1', 'Medium ≤3', 'High ≥4'].map((b, n) => (
                    <span
                      key={b}
                      className={`rounded-full px-1.5 py-px text-[0.5rem] font-bold ${['bg-mint-soft text-mint', 'bg-peach-soft text-peach', 'bg-pink-soft text-pink'][n]}`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line bg-white px-4 py-2 text-[0.625rem] font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-accent-soft ring-1 ring-accent/30" /> LLM judgement
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-white ring-1 ring-ink/25" /> Deterministic / rule-based
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rotate-45 rounded-[2px] bg-sky-soft ring-1 ring-sky/40" /> Gate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-pink-soft ring-1 ring-pink/30" /> Terminal
          </span>
          <span className="inline-flex items-center gap-1 text-pink">
            <Icon name="loop" size={10} stroke={2.5} /> Feedback loop
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
