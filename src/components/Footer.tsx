import { hireMeHref, profile } from '~/data/portfolio'
import { MorphPill } from './MorphPill'

const links = [
  { label: 'Email', href: `mailto:${profile.email}`, text: profile.email },
  { label: 'LinkedIn', href: profile.linkedin, text: 'Gauraiya Gaur' },
  { label: 'GitHub', href: profile.github, text: 'gauraiyagaur' },
  { label: 'CV', href: profile.cvUrl, text: 'Download PDF', download: true },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-surface">
      <div className="container-grid py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="bg-neon px-1.5 py-0.5">(05)</span> Contact
            </p>
            <h2 className="display mt-6 text-[clamp(3rem,9vw,7rem)]">
              Let’s build
              <br />
              something <span className="bg-neon px-2">real</span>.
            </h2>
            <div className="mt-10">
              <MorphPill href={hireMeHref} variant="gradient">
                Hire Me
              </MorphPill>
            </div>
          </div>
          <ul className="self-end border-t-2 border-ink lg:col-span-5">
            {links.map((l) => (
              <li key={l.label} className="border-b border-ink">
                <a
                  href={l.href}
                  {...(l.download ? { download: true } : {})}
                  className="group flex items-center justify-between gap-4 py-4 hover:bg-neon"
                >
                  <span className="eyebrow">{l.label}</span>
                  <span className="truncate text-sm font-medium">
                    {l.text} <span aria-hidden>↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink">
        <div className="container-grid flex flex-col gap-2 py-6 font-mono text-[0.6875rem] uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <p>Custom TanStack Start build · Visual inspiration from Lovable &amp; Dribbble</p>
        </div>
      </div>
    </footer>
  )
}
