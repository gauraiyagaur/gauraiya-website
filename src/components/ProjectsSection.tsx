import { profile, projects } from '~/data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-ink bg-surface py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="02" label="Completed Work" id="work-title" title="Shipped & evaluated.">
          Problem, approach and measurable impact — every project built end to end.{' '}
          <a href={profile.projectsRepo} className="font-medium text-ink underline decoration-2 underline-offset-4 hover:decoration-magenta">
            All code on GitHub ↗
          </a>
        </SectionHeading>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.id} className="group flex flex-col border-2 border-ink bg-surface transition-shadow hover:shadow-[6px_6px_0_#0A0A0A]">
              <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
                <span className="eyebrow text-[0.6875rem]">{p.category}</span>
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{p.summary}</p>
                {p.impact ? (
                  <p className="mt-4 border-l-4 border-neon bg-paper py-2 pl-3 pr-2 text-sm leading-relaxed">
                    <span className="eyebrow mr-1 text-[0.6875rem]">Impact:</span>
                    {p.impact}
                  </p>
                ) : null}
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((s) => (
                    <li key={s} className="pill">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.repoUrl || p.liveUrl ? (
                  <div className="mt-auto flex gap-4 pt-6">
                    {p.repoUrl ? (
                      <a href={p.repoUrl} className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:bg-neon">
                        GitHub ↗<span className="sr-only"> — {p.title}</span>
                      </a>
                    ) : null}
                    {p.liveUrl ? (
                      <a href={p.liveUrl} className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:bg-neon">
                        Live ↗<span className="sr-only"> — {p.title}</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
