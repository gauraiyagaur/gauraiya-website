import type { ReactNode } from 'react'

export function SectionHeading({
  index,
  label,
  title,
  children,
  id,
}: {
  index: string
  label: string
  title: ReactNode
  children?: ReactNode
  id: string
}) {
  return (
    <div className="grid gap-6 border-b border-ink pb-8 md:grid-cols-12 md:gap-8">
      <p className="eyebrow md:col-span-3">
        <span className="bg-neon px-1.5 py-0.5">({index})</span> {label}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="display text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {children ? <div className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">{children}</div> : null}
      </div>
    </div>
  )
}
