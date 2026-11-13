import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { TBC, kpis } from '~/data/portfolio'

/** Counts up to the numeric part of a value like "3.5+" when scrolled into view. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!match || !inView) return
    const target = parseFloat(match[1])
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setShown(v.toFixed(decimals) + match[2]),
    })
    return () => controls.stop()
  }, [inView])

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  )
}

export function KpiStrip() {
  return (
    <section aria-label="Key numbers" className="border-b border-ink bg-surface">
      <div className="container-grid">
        <dl className="grid grid-cols-2 gap-px border-x border-ink bg-ink lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.id} className="group flex flex-col gap-2 bg-surface p-4 transition-colors hover:bg-paper sm:p-6 lg:p-8">
              <dt className="eyebrow order-2 mt-1 text-[0.6875rem] sm:text-xs">
                <span className="bg-neon px-1">{k.label}</span>
              </dt>
              <dd
                className={`order-1 font-mono text-5xl font-bold tracking-tighter sm:text-6xl ${k.value === TBC ? 'text-muted/60' : ''}`}
              >
                {k.value === TBC ? k.value : <CountUp value={k.value} />}
              </dd>
              <dd className="order-3 text-sm leading-snug text-ink-soft">{k.sublabel}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
