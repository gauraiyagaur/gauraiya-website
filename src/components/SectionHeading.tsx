import type { ReactNode } from 'react'

export function SectionHeading({
  label,
  title,
  children,
  id,
  dark = false,
}: {
  index?: string
  label: string
  title: ReactNode
  children?: ReactNode
  id: string
  dark?: boolean
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`eyebrow mx-auto ${dark ? 'bg-white/10 text-white' : ''}`}>{label}</p>
      <h2 id={id} className={`display mt-4 text-[2rem] sm:text-5xl ${dark ? 'text-white' : ''}`}>
        {title}
      </h2>
      {children ? (
        <div className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{children}</div>
      ) : null}
    </div>
  )
}
