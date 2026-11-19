import { hireMeHref, profile } from '~/data/portfolio'
import { Icon } from './Icon'
import { MorphPill } from './MorphPill'

const links = [
  { label: 'Email', href: `mailto:${profile.email}`, text: profile.email },
  { label: 'LinkedIn', href: profile.linkedin, text: 'Gauraiya Gaur' },
  { label: 'GitHub', href: profile.github, text: 'gauraiyagaur' },
  ...profile.cvs.map((cv) => ({ label: `${cv.label} CV`, href: cv.url, text: cv.url ? 'Download PDF' : 'Coming soon', download: true })),
]

export function Footer() {
  return (
    <footer id="contact" className="pt-20 sm:pt-28">
      <div className="container-grid">
        <div className="relative overflow-hidden rounded-[2.5rem] px-5 py-12 sm:px-12 sm:py-16 [background:linear-gradient(135deg,#efebff_0%,#fde8f4_55%,#e3f8f0_100%)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end [&>*]:min-w-0">
            <div className="lg:col-span-7">
              <p className="eyebrow !bg-white">Contact</p>
              <h2 className="display mt-5 text-[clamp(2.25rem,7vw,5rem)]">
                Let’s build something <span className="text-gradient">real.</span>
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">Open to data science and AI engineering roles. I usually reply within a day.</p>
              <div className="mt-8">
                <MorphPill href={hireMeHref} variant="primary">
                  Hire Me
                </MorphPill>
              </div>
            </div>
            <ul className="space-y-2 lg:col-span-5">
              {links.map((l) => (
                <li key={l.label}>
                  {!l.href ? (
                    <span className="flex items-center justify-between gap-4 rounded-2xl bg-white/50 px-5 py-4" aria-disabled>
                      <span className="text-sm font-bold text-ink/60">{l.label}</span>
                      <span className="text-sm text-muted">{l.text}</span>
                    </span>
                  ) : (
                  <a
                    href={l.href}
                    {...('download' in l && l.download ? { download: true } : {})}
                    {...(l.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-2xl bg-white/80 px-5 py-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span className="text-sm font-bold">{l.label}</span>
                    <span className="flex min-w-0 items-center gap-2 text-sm text-ink-soft group-hover:text-accent">
                      <span className="break-all">{l.text}</span>
                      <Icon name="arrow" size={14} stroke={2.5} />
                    </span>
                  </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-grid flex flex-col gap-2 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p>Custom TanStack Start build · Visual inspiration from Lovable &amp; Dribbble</p>
      </div>
    </footer>
  )
}
