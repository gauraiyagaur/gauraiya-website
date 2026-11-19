import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { clientProjects, clientWorkNote, profile, projects, type ClientProject, type ProjectItem } from '~/data/portfolio'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

const ICON_COLORS = ['#6C47FF', '#12B886', '#F59F0B', '#F062B8', '#3B82F6', '#8B5CF6']

export function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container-grid">
        <SectionHeading index="02" label="Completed work" id="work-title" title={<>Shipped <span className="text-gradient">&amp; evaluated.</span></>}>
          Hover or tap a card for the impact, stack and code.{' '}
          <a href={profile.projectsRepo} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
            All code on GitHub ↗
          </a>
        </SectionHeading>

        <SubHeading count={projects.length}>Independent projects</SubHeading>
        <ul className="mt-6 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} className={p.reflection ? 'md:col-span-2 lg:col-span-3' : ''}>
              <ProjectCard p={p} index={i} />
            </li>
          ))}
        </ul>

        <SubHeading count={clientProjects.length}>Client projects</SubHeading>
        <p className="mt-4 flex max-w-3xl items-start gap-3 rounded-2xl bg-accent-soft/60 px-4 py-3 text-sm text-ink-soft">
          <Icon name="lock" size={18} className="mt-0.5 shrink-0 text-accent" />
          {clientWorkNote}
        </p>
        <ul className="mt-6 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((c) => (
            <li key={c.id}>
              <ClientCard c={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SubHeading({ children, count }: { children: ReactNode; count: number }) {
  return (
    <h3 className="mt-16 flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
      {children}
      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-bold text-accent">{String(count).padStart(2, '0')}</span>
    </h3>
  )
}

/** Card that expands on hover/focus (desktop) or tap (touch). */
function ExpandCard({
  header,
  details,
  alwaysOpen = false,
  label,
}: {
  header: ReactNode
  details: ReactNode
  alwaysOpen?: boolean
  label: string
}) {
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const open = alwaysOpen || hover || pinned

  return (
    <motion.article
      layout
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{
        boxShadow: open
          ? '0px 2px 4px rgba(20,17,43,0.04), 0px 28px 56px -20px rgba(76,45,200,0.28)'
          : '0px 1px 2px rgba(20,17,43,0.04), 0px 12px 32px -12px rgba(20,17,43,0.12)',
        y: open && !alwaysOpen ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      {/* Accent bar */}
      <motion.span
        className="absolute inset-x-0 top-0 h-1 origin-left [background:var(--gradient-cta)]"
        initial={false}
        animate={{ scaleX: open ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        aria-hidden
      />
      {header}
      {!alwaysOpen ? (
        <button
          type="button"
          onClick={() => setPinned((v) => !v)}
          aria-expanded={open}
          aria-label={`${pinned ? 'Hide' : 'Show'} details: ${label}`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent"
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="flex">
            <Icon name="plus" size={14} stroke={3} />
          </motion.span>
        </button>
      ) : null}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            {details}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {items.map((s) => (
        <li key={s} className="pill">
          {s}
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ p, index }: { p: ProjectItem; index: number }) {
  const featured = Boolean(p.reflection)
  const header = (
    <div className={`p-5 sm:p-6 ${featured ? 'lg:grid lg:grid-cols-12 lg:gap-8' : 'pr-14 sm:pr-14'}`}>
      <div className={featured ? 'lg:col-span-7' : ''}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: ICON_COLORS[index % ICON_COLORS.length] }}>
            <Icon name={featured ? 'trophy' : 'spark'} size={18} />
          </span>
          {featured ? <span className="eyebrow !bg-pink-soft !text-pink">Featured</span> : null}
          <span className="text-xs font-semibold text-muted">{p.category}</span>
        </div>
        <h4 className={`mt-4 font-extrabold leading-tight tracking-tight ${featured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {p.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{featured ? p.summary : p.hook}</p>
        <div className="mt-4">
          <Stack items={p.stack} />
        </div>
      </div>
      {p.reflection ? (
        <div className="mt-6 grid gap-3 lg:col-span-5 lg:mt-0">
          <div className="rounded-2xl bg-mint-soft/70 p-4">
            <p className="eyebrow !bg-white !text-mint">The win</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.reflection.win}</p>
          </div>
          <div className="rounded-2xl bg-pink-soft/60 p-4">
            <p className="eyebrow !bg-white !text-pink">The lesson</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.reflection.lesson}</p>
          </div>
        </div>
      ) : null}
    </div>
  )

  const details = (
    <div className="space-y-4 border-t border-line p-5 sm:p-6">
      {!featured ? (
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="font-semibold text-ink">Approach.</strong> {p.summary}
        </p>
      ) : null}
      {p.impact ? (
        <p className="rounded-2xl bg-accent-soft/60 px-4 py-3 text-sm leading-relaxed">
          <span className="mr-1 font-bold text-accent">Impact:</span>
          {p.impact}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        {p.repoUrl ? (
          <a
            href={p.repoUrl}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Icon name="github" size={16} /> View code<span className="sr-only">: {p.title}</span>
          </a>
        ) : null}
        {p.liveUrl ? (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold hover:border-accent hover:text-accent">
            Live ↗<span className="sr-only">: {p.title}</span>
          </a>
        ) : null}
        {!p.repoUrl && p.linkNote ? <span className="rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-muted">{p.linkNote}</span> : null}
      </div>
    </div>
  )

  return <ExpandCard header={header} details={details} alwaysOpen={featured} label={p.title} />
}

function ClientCard({ c }: { c: ClientProject }) {
  const header = (
    <div className="p-5 pr-14 sm:p-6 sm:pr-14">
      <p className="eyebrow">
        <Icon name="lock" size={12} stroke={2.5} /> Client · MathCo
      </p>
      <p className="mt-4 text-2xl font-extrabold tracking-tight">{c.client}</p>
      <h4 className="mt-1 font-semibold leading-snug">{c.title}</h4>
      <p className="mt-1 text-sm text-ink-soft">{c.hook}</p>
      <div className="mt-4">
        <Stack items={c.stack} />
      </div>
    </div>
  )
  const details = (
    <div className="space-y-4 border-t border-line p-5 sm:p-6">
      <p className="text-sm leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">Approach.</strong> {c.summary}
      </p>
      {c.impact ? (
        <p className="rounded-2xl bg-accent-soft/60 px-4 py-3 text-sm leading-relaxed">
          <span className="mr-1 font-bold text-accent">Impact:</span>
          {c.impact}
        </p>
      ) : null}
    </div>
  )
  return <ExpandCard header={header} details={details} label={`${c.client}: ${c.title}`} />
}
