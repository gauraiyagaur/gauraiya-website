import { motion } from 'motion/react'
import { hireMeHref, profile } from '~/data/portfolio'
import { Icon } from './Icon'
import { MorphPill } from './MorphPill'

const clients = ['Walmart Connect', 'Best Buy', 'Redbox', 'GoFundMe', 'Warwick']

const float = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay },
})

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-10 sm:pt-16">
      <div className="container-grid grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {profile.role}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.25rem,9vw,6.25rem)]">
            Gauraiya <span className="text-gradient">Gaur.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MorphPill href={hireMeHref} variant="primary">
              Hire Me
            </MorphPill>
            <MorphPill href="#work" variant="outline">
              My Work
            </MorphPill>
            <MorphPill href={profile.cvUrl} variant="soft" icon="download" download>
              Download CV
            </MorphPill>
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Worked with & trained at</p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {clients.map((c) => (
                <li key={c} className="text-lg font-extrabold tracking-tight text-ink/30 transition-colors hover:text-ink/70">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none lg:pl-10">
          {/* Pastel glow */}
          <div
            className="absolute -inset-6 -z-10 rounded-[3rem] opacity-90 blur-2xl [background:linear-gradient(135deg,#efebff,#fde8f4_50%,#e3f8f0)]"
            aria-hidden
          />
          <figure className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-[var(--shadow-lift)]">
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={1200}
              height={1558}
              className="aspect-[4/5] w-full object-cover object-[50%_20%]"
              fetchPriority="high"
            />
            <figcaption className="absolute bottom-3 right-3 flex items-center rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold backdrop-blur-md">
              <span className="inline-flex items-center gap-2 text-mint">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Open to roles
              </span>
            </figcaption>
          </figure>

          {/* Floating telemetry cards */}
          <motion.div
            {...float(0)}
            className="card absolute -left-4 top-10 hidden w-52 p-4 sm:block lg:-left-6"
            aria-hidden
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="trophy" size={18} />
              </span>
              <div>
                <p className="text-xl font-extrabold leading-none">×4</p>
                <p className="mt-1 text-xs text-ink-soft">Distinction modules</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...float(1.2)}
            className="card absolute -right-4 top-1/3 hidden w-64 p-4 sm:block lg:-right-12"
          >
            <p className="flex items-center gap-2 text-xs font-semibold text-pink">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-soft">
                <Icon name="users" size={13} stroke={2.5} />
              </span>
              Key insight · The human edge
            </p>
            <p className="mt-2 text-base font-extrabold leading-snug tracking-tight">I speak every room’s language.</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Praised for stakeholder management, and connects with people of any age group over shared interests.
            </p>
          </motion.div>

          <motion.div
            {...float(2.4)}
            className="card absolute -bottom-6 left-6 hidden items-center gap-3 p-3 pr-5 sm:flex"
            aria-hidden
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-peach-soft text-peach">
              <Icon name="briefcase" size={16} />
            </span>
            <div>
              <p className="text-sm font-extrabold leading-none">3.5+ yrs</p>
              <p className="mt-1 text-xs text-ink-soft">Enterprise data science</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
