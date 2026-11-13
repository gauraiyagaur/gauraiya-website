import { TBC, kpis } from '~/data/portfolio'

export function KpiStrip() {
  return (
    <section aria-label="Key numbers" className="border-b border-ink bg-surface">
      <div className="container-grid">
        <dl className="grid grid-cols-2 gap-px border-x border-ink bg-ink lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.id} className="flex flex-col gap-2 bg-surface p-4 sm:p-6 lg:p-8">
              <dt className="eyebrow order-2 mt-1 text-[0.6875rem] sm:text-xs">
                <span className="bg-neon px-1">{k.label}</span>
              </dt>
              <dd className={`display order-1 text-5xl sm:text-6xl ${k.value === TBC ? 'text-muted/60' : ''}`}>{k.value}</dd>
              <dd className="order-3 text-sm leading-snug text-ink-soft">{k.sublabel}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
