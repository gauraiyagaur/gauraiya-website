import { motion } from 'motion/react'
import { currentBuilds } from '~/data/portfolio'
import { SectionHeading } from './SectionHeading'

const STATUS_COLORS: Record<string, string> = { Research: '#3B82F6', Building: '#F59F0B', Active: '#12B886' }

export function CurrentProjects() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="container-grid">
      <div className="relative overflow-hidden rounded-[2rem] px-5 py-16 sm:px-10 sm:py-20 [background:linear-gradient(160deg,#150c2e_0%,#2a1657_70%,#3b1d7a_100%)]">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/35 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-pink/20 blur-3xl" aria-hidden />
        <div className="relative">
          <SectionHeading label="In the lab" id="lab-title" title="Current builds." dark>
            Ongoing R&amp;D. Not shipped yet, moving fast.
          </SectionHeading>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {currentBuilds.map((b) => {
              const color = STATUS_COLORS[b.status] ?? '#6C47FF'
              return (
                <motion.li
                  key={b.id}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-white backdrop-blur-sm transition-colors hover:bg-white/[0.1]"
                >
                  <span
                    className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ backgroundColor: `${color}26`, color }}
                  >
                    <span className="relative flex h-2 w-2" aria-hidden>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ backgroundColor: color }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    </span>
                    {b.status}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{b.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {b.stack.map((s) => (
                      <li key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {b.linkUrl ? (
                    <a href={b.linkUrl} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 text-sm font-semibold text-white underline-offset-4 hover:underline">
                      View ↗<span className="sr-only">: {b.title}</span>
                    </a>
                  ) : b.linkNote ? (
                    <p className="mt-auto pt-6 text-xs font-semibold text-white/45">{b.linkNote}</p>
                  ) : null}
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
