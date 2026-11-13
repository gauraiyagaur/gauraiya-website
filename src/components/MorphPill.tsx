import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Icon } from './Icon'

type Variant = 'gradient' | 'neon' | 'outline'

const styles: Record<Variant, string> = {
  gradient: 'border-ink text-ink [background:var(--gradient-cta)]',
  neon: 'border-ink bg-neon text-ink',
  outline: 'border-ink bg-surface text-ink',
}

/**
 * A pill-shaped CTA that morphs on hover: the pill squares off, lifts onto a
 * hard shadow, and an arrow slides in.
 */
export function MorphPill({
  href,
  children,
  variant = 'neon',
  icon = 'arrow',
  download,
  className = '',
  size = 'md',
  onClick,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  icon?: 'arrow' | 'download'
  download?: boolean
  className?: string
  size?: 'sm' | 'md'
  onClick?: () => void
}) {
  const pad = size === 'sm' ? 'min-h-10 px-4 text-xs' : 'min-h-12 px-6 text-[0.8125rem]'
  return (
    <motion.a
      href={href}
      download={download}
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="tap"
      variants={{
        rest: { borderRadius: 999, x: 0, y: 0, boxShadow: '0px 0px 0px #0A0A0A' },
        hover: { borderRadius: 4, x: -3, y: -3, boxShadow: '5px 5px 0px #0A0A0A' },
        tap: { borderRadius: 4, x: 0, y: 0, boxShadow: '0px 0px 0px #0A0A0A' },
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`inline-flex items-center justify-center gap-0 border-2 font-mono font-bold uppercase tracking-[0.06em] ${pad} ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <motion.span
        className="inline-flex overflow-hidden"
        variants={{
          rest: { width: icon === 'download' ? 'auto' : 0, marginLeft: icon === 'download' ? 8 : 0, opacity: icon === 'download' ? 1 : 0 },
          hover: { width: 'auto', marginLeft: 8, opacity: 1 },
          tap: { width: 'auto', marginLeft: 8, opacity: 1 },
        }}
      >
        <Icon name={icon} size={16} stroke={2.5} />
      </motion.span>
    </motion.a>
  )
}
