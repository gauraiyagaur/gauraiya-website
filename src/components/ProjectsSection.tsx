import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { clientProjects, clientWorkNote, profile, projects, type ClientProject, type ProjectItem } from '~/data/portfolio'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-ink bg-surface py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="02" label="Completed Work" id="work-title" title="Shipped & evaluated.">
          Hover or tap a card for the impact, stack and code.{' '}
          <a href={profile.projectsRepo} className="font-medium text-ink underline decoration-2 underline-offset-4 hover:decoration-magenta">
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
        <p className="mt-4 flex max-w-3xl items-start gap-3 border-l-4 border-ink bg-paper py-3 pl-4 pr-3 text-sm text-ink-soft">
          <Icon name="lock" size={18} className="mt-0.5 shrink-0 text-ink" />
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
    <h3 className="mt-14 flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
      {children}
      <span className="bg-neon px-2 py-0.5 font-mono text-sm font-bold">{String(count).padStart(2, '0')}</span>
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
      animate={{ boxShadow: open ? '6px 6px 0px #0A0A0A' : '0px 0px 0px #0A0A0A', y: open && !alwaysOpen ? -4 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      className="relative flex flex-col border-2 border-ink bg-surface"
    >
      {header}
      {!alwaysOpen ? (
        <button
          type="button"
          onClick={() => setPinned((v) => !v)}
          aria-expanded={open}
          aria-label={`${pinned ? 'Hide' : 'Show'} details: ${label}`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border-2 border-ink bg-surface hover:bg-neon"
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
    <div className={`p-5 pr-14 sm:p-6 sm:pr-14 ${featured ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''}`}>
      <div className={featured ? 'lg:col-span-7' : ''}>
        <p className="eyebrow flex items-center gap-2 text-[0.6875rem]">
          <span className="text-muted">{String(index + 1).padStart(2, '0')}</span>
          {featured ? <span className="bg-neon px-1.5">Featured</span> : null}
          <span>{p.category}</span>
        </p>
        <h4 className={`mt-3 font-display font-extrabold leading-tight tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {p.title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{p.summary}</p>
      </div>
      {p.reflection ? (
        <div className="mt-6 grid gap-px border-2 border-ink bg-ink lg:col-span-5 lg:mt-0">
          <div className="bg-surface p-4">
            <p className="eyebrow text-[0.6875rem]">
              <span className="bg-neon px-1">The win</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.reflection.win}</p>
          </div>
          <div className="bg-paper p-4">
            <p className="eyebrow text-[0.6875rem]">
              <span className="bg-magenta px-1 text-white">The lesson</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.reflection.lesson}</p>
          </div>
        </div>
      ) : null}
    </div>
  )

  const details = (
    <div className="space-y-4 border-t-2 border-ink p-5 sm:p-6">
      {p.impact ? (
        <p className="border-l-4 border-neon bg-paper py-2 pl-3 pr-2 text-sm leading-relaxed">
          <span className="eyebrow mr-1 text-[0.6875rem]">Impact:</span>
          {p.impact}
        </p>
      ) : null}
      <Stack items={p.stack} />
      <div className="flex flex-wrap items-center gap-4 pt-1">
        {p.repoUrl ? (
          <a
            href={p.repoUrl}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:bg-neon"
          >
            <Icon name="github" size={16} /> View code ↗<span className="sr-only">: {p.title}</span>
          </a>
        ) : null}
        {p.liveUrl ? (
          <a href={p.liveUrl} className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:bg-neon">
            Live ↗<span className="sr-only">: {p.title}</span>
          </a>
        ) : null}
        {!p.repoUrl && p.linkNote ? <span className="font-mono text-xs uppercase tracking-wider text-muted">{p.linkNote}</span> : null}
      </div>
    </div>
  )

  return <ExpandCard header={header} details={details} alwaysOpen={featured} label={p.title} />
}

function ClientCard({ c }: { c: ClientProject }) {
  const header = (
    <div className="p-5 pr-14 sm:p-6 sm:pr-14">
      <p className="eyebrow flex items-center gap-2 text-[0.6875rem] text-muted">
        <Icon name="lock" size={12} stroke={2.5} /> Client · MathCo
      </p>
      <p className="mt-3 font-display text-2xl font-black tracking-tight">{c.client}</p>
      <h4 className="mt-1 font-semibold leading-snug">{c.title}</h4>
    </div>
  )
  const details = (
    <div className="space-y-4 border-t-2 border-ink p-5 sm:p-6">
      <p className="text-sm leading-relaxed text-ink-soft">{c.summary}</p>
      {c.impact ? (
        <p className="border-l-4 border-neon bg-paper py-2 pl-3 pr-2 text-sm leading-relaxed">
          <span className="eyebrow mr-1 text-[0.6875rem]">Impact:</span>
          {c.impact}
        </p>
      ) : null}
      <Stack items={c.stack} />
    </div>
  )
  return <ExpandCard header={header} details={details} label={`${c.client}: ${c.title}`} />
}
