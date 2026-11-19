import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { TBC, kpis } from '~/data/portfolio'

/** Counts up to the numeric part of a value like "3.5+" when scrolled into view. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const num = match ? match[1] : value
  const suffix = match ? match[2] : ''
  const [shown, setShown] = useState(num)

  useEffect(() => {
    if (!match || !inView) return
    const target = parseFloat(match[1])
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setShown(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView])

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {/* A worded unit like " yrs" sits smaller beside the number; symbols like "+" stay full size. */}
      {/^\s/.test(suffix) ? <span className="ml-1 text-xl font-bold text-white/80 sm:ml-1.5 sm:text-3xl">{suffix.trim()}</span> : suffix}
    </span>
  )
}

export function KpiStrip() {
  return (
    <section aria-label="Key numbers" className="container-grid">
      <div className="relative overflow-hidden rounded-[2rem] px-6 py-10 text-white sm:px-10 sm:py-14 [background:linear-gradient(135deg,#150c2e_0%,#2a1657_60%,#3b1d7a_100%)]">
        {/* Glow + dotted texture */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-60 w-60 rounded-full bg-pink/25 blur-3xl" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden
        />
        <dl className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <div key={k.id} className={`px-2 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-white/15' : ''} ${i % 2 === 1 ? 'border-l border-white/15 lg:border-l' : ''}`}>
              <dd className={`text-4xl font-extrabold tracking-tight sm:text-6xl ${k.value === TBC ? 'text-white/40' : ''}`}>
                {k.value === TBC ? k.value : <CountUp value={k.value} />}
              </dd>
              <dt className="mt-3 text-sm font-bold">{k.label}</dt>
              <dd className="mt-1 text-sm leading-snug text-white/60">{k.sublabel}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
