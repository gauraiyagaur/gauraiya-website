import { dissertationReview, journey } from '~/data/portfolio'
import { SectionHeading } from './SectionHeading'

export function LearningJourney() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-b border-ink py-16 sm:py-24">
      <div className="container-grid">
        <SectionHeading index="01" label="Journey" id="journey-title" title="The data-learning journey.">
          From software roots to production data science to multi-agent research — five steps, one direction.
        </SectionHeading>

        <ol className="relative mt-4">
          {journey.map((m) => (
            <li key={m.step} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="flex items-start gap-4 md:col-span-3 md:flex-col md:gap-3">
                <span className="display flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-neon text-2xl">
                  {m.step}
                </span>
                <div>
                  <p className="eyebrow">// {m.tag}</p>
                  {m.period ? <p className="mt-1 font-mono text-xs text-muted">{m.period}</p> : null}
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{m.title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{m.organization}</p>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">{m.summary}</p>
                {m.highlights?.length ? (
                  <ul className="mt-4 space-y-2">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-ink-soft">
                        <span className="mt-1.5 h-2 w-2 shrink-0 bg-magenta" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {m.isFeaturedReview ? <ReviewCard /> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ReviewCard() {
  const r = dissertationReview
  return (
    <details className="group mt-8 border-2 border-ink bg-surface shadow-[6px_6px_0_#E6FF00,6px_6px_0_2px_#0A0A0A]" open>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 bg-ink p-5 text-white sm:p-6 [&::-webkit-details-marker]:hidden">
        <div>
          <p className="eyebrow text-neon">Featured · Academic Review</p>
          <p className="mt-2 font-display text-xl font-extrabold tracking-tight sm:text-2xl">{r.title}</p>
          <p className="mt-2 max-w-2xl text-sm text-white/75">{r.context}</p>
        </div>
        <span
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-neon font-mono text-lg text-neon"
          aria-hidden
        >
          <span className="transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="grid gap-px bg-ink md:grid-cols-2">
        <div className="bg-surface p-5 sm:p-6">
          <p className="eyebrow">
            <span className="bg-neon px-1">What worked</span>
          </p>
          <ul className="mt-4 space-y-5">
            {r.worked.map((w) => (
              <li key={w.title}>
                <p className="font-semibold">{w.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-paper p-5 sm:p-6">
          <p className="eyebrow">
            <span className="bg-magenta px-1 text-white">The candid takeaway</span>
          </p>
          <p className="mt-4 font-display text-2xl font-extrabold tracking-tight">{r.takeaway.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.takeaway.body}</p>
        </div>
      </div>
    </details>
  )
}
