import { motion } from 'motion/react'
import { hireMeHref, profile } from '~/data/portfolio'
import { Icon } from './Icon'
import { CvMenu } from './CvMenu'
import { MorphPill } from './MorphPill'

const clients = ['MathCo', 'Walmart Connect', 'Best Buy', 'Redbox', 'GoFundMe', 'Warwick']

const float = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay },
})

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-10 sm:pt-16">
      <div className="container-grid grid items-center gap-16 pb-16 sm:gap-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {profile.role}
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(2.75rem,9vw,6.25rem)]">
            Gauraiya <span className="text-gradient">Gaur.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MorphPill href={hireMeHref} variant="primary">
              Hire Me
            </MorphPill>
            <MorphPill href="#work" variant="outline">
              My Work
            </MorphPill>
            <CvMenu />
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

        <div className="relative order-first mx-auto w-full max-w-[19rem] sm:max-w-md lg:order-none lg:col-span-6 lg:max-w-none lg:pl-10">
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
            <figcaption className="absolute bottom-3 left-3 flex items-center rounded-full sm:left-auto sm:right-3 bg-white/90 px-4 py-2.5 text-xs font-semibold backdrop-blur-md">
              <span className="inline-flex items-center gap-2 text-mint">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                Open to roles
              </span>
            </figcaption>
          </figure>

          {/* Phones: compact floating cards over the photo */}
          <motion.div {...float(0)} className="card absolute -left-3 top-4 flex items-center gap-2 p-2 pr-3 sm:hidden" aria-hidden>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
              <Icon name="trophy" size={13} />
            </span>
            <span>
              <span className="block text-sm font-extrabold leading-none">×4</span>
              <span className="mt-0.5 block text-[0.625rem] text-ink-soft">Distinction modules</span>
            </span>
          </motion.div>
          <motion.div {...float(0.8)} className="card absolute -right-3 top-[36%] flex items-center gap-2 p-2 pr-3 sm:hidden" aria-hidden>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-peach-soft text-peach">
              <Icon name="briefcase" size={13} />
            </span>
            <span>
              <span className="block text-sm font-extrabold leading-none">3.5 yrs</span>
              <span className="mt-0.5 block text-[0.625rem] text-ink-soft">Enterprise data science</span>
            </span>
          </motion.div>
          <motion.div {...float(1.6)} className="card absolute -left-6 top-[50%] w-36 p-2.5 sm:hidden">
            <p className="flex items-center gap-1.5 text-[0.625rem] font-semibold text-pink">
              <Icon name="users" size={11} stroke={2.5} /> The human edge
            </p>
            <p className="mt-1 text-xs font-extrabold leading-snug">I speak every room’s language.</p>
            <p className="mt-0.5 text-[0.625rem] leading-snug text-ink-soft">Praised for stakeholder management; connects with every age group.</p>
          </motion.div>
          <motion.div {...float(2.4)} className="card absolute -bottom-10 -right-6 w-36 p-2.5 sm:hidden">
            <p className="flex items-center gap-1.5 text-[0.625rem] font-semibold text-accent">
              <Icon name="code" size={11} stroke={2.5} /> Why AI
            </p>
            <p className="mt-1 text-xs font-extrabold leading-snug">Backend alone wasn’t my scene.</p>
            <p className="mt-0.5 text-[0.625rem] leading-snug text-ink-soft">AI lets me measure impact and give the business real reasoning.</p>
          </motion.div>

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
            {...float(1.8)}
            className="card absolute -left-4 top-[60%] hidden w-52 p-4 sm:block lg:left-0"
          >
            <p className="flex items-center gap-2 text-xs font-semibold text-accent">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft">
                <Icon name="code" size={13} stroke={2.5} />
              </span>
              Why AI
            </p>
            <p className="mt-2 text-sm font-extrabold leading-snug tracking-tight">Backend alone wasn’t my scene.</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
              So I moved into AI. It gives me room to go beyond development, measure impact and give the business real reasoning.
            </p>
          </motion.div>

          <motion.div
            {...float(2.4)}
            className="card absolute -right-4 top-6 hidden items-center gap-3 p-3 pr-5 sm:flex lg:-right-8"
            aria-hidden
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-peach-soft text-peach">
              <Icon name="briefcase" size={16} />
            </span>
            <div>
              <p className="text-sm font-extrabold leading-none">3.5 yrs</p>
              <p className="mt-1 text-xs text-ink-soft">Enterprise data science</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
