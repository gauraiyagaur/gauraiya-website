import { hireMeHref, profile } from '~/data/portfolio'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-ink">
      <div className="container-grid grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-neon px-3 py-1.5 text-[0.6875rem] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-ink" aria-hidden />
            {profile.role}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.5rem,13vw,9.5rem)]">
            Gauraiya
            <br />
            Gaur<span className="text-magenta">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{profile.intro}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={hireMeHref} className="btn btn-gradient">
              Hire Me <span aria-hidden>→</span>
            </a>
            <a href="#work" className="btn btn-outline">
              My Work
            </a>
            <a
              href={profile.cvUrl}
              download
              className="group inline-flex min-h-12 items-center gap-2 px-1 font-mono text-xs font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:decoration-magenta"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <path d="M8 1v10M3.5 6.5 8 11l4.5-4.5M2 14h12" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              Download CV <span className="font-normal text-muted">(PDF)</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          {/* Neon offset frame */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-ink bg-neon sm:translate-x-5 sm:translate-y-5" aria-hidden />
          <figure className="relative border-2 border-ink bg-surface">
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={1200}
              height={1558}
              className="aspect-[4/5] w-full object-cover object-[50%_20%]"
              fetchPriority="high"
            />
            <figcaption className="flex items-center justify-between border-t-2 border-ink px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-wider">
              <span>{profile.location}</span>
              <span className="bg-ink px-2 py-0.5 text-neon">Open to roles</span>
            </figcaption>
          </figure>
          <div
            className="absolute -left-3 top-6 hidden rotate-[-6deg] border-2 border-ink bg-surface px-3 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-wider shadow-[4px_4px_0_#0A0A0A] sm:block"
            aria-hidden
          >
            MSc · Warwick
          </div>
        </div>
      </div>
    </section>
  )
}
