import { motion } from 'motion/react'
import { currentBuilds } from '~/data/portfolio'

export function CurrentProjects() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="border-b border-ink bg-ink py-16 text-white sm:py-24">
      <div className="container-grid">
        <div className="grid gap-6 border-b border-white/25 pb-8 md:grid-cols-12 md:gap-8">
          <p className="eyebrow text-neon md:col-span-3">(04) In the Lab</p>
          <div className="md:col-span-9">
            <h2 id="lab-title" className="display text-4xl sm:text-5xl lg:text-6xl">
              Current builds.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">Ongoing R&amp;D. Not shipped yet, moving fast.</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {currentBuilds.map((b) => (
            <motion.li key={b.id} whileHover={{ y: -4 }} className="flex flex-col border border-white/30 p-5 transition-colors hover:border-neon sm:p-6">
              <span className="eyebrow inline-flex w-fit items-center gap-2 bg-neon px-2 py-1 text-[0.6875rem] text-ink">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
                </span>
                {b.status}
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{b.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {b.stack.map((s) => (
                  <li key={s} className="border border-white/40 px-2 py-0.5 font-mono text-[0.6875rem]">
                    {s}
                  </li>
                ))}
              </ul>
              {b.linkUrl ? (
                <a href={b.linkUrl} className="mt-auto pt-6 font-mono text-xs font-bold uppercase tracking-wider text-neon underline underline-offset-4">
                  View ↗<span className="sr-only">: {b.title}</span>
                </a>
              ) : b.linkNote ? (
                <p className="mt-auto pt-6 font-mono text-[0.6875rem] uppercase tracking-wider text-white/50">{b.linkNote}</p>
              ) : null}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
