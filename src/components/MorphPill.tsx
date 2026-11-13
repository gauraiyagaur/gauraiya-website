import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Icon } from './Icon'

type Variant = 'primary' | 'soft' | 'outline' | 'light'

const styles: Record<Variant, string> = {
  primary: 'text-white [background:var(--gradient-cta)]',
  soft: 'bg-accent-soft text-accent',
  outline: 'border border-line bg-surface text-ink',
  light: 'bg-white text-accent',
}

/** Rounded CTA that lifts on hover and slides in an arrow. */
export function MorphPill({
  href,
  children,
  variant = 'primary',
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
  const pad = size === 'sm' ? 'min-h-10 px-4 text-sm' : 'min-h-12 px-6 text-[0.9375rem]'
  const glow = variant === 'primary' ? '0px 16px 30px -10px rgba(108,71,255,0.6)' : '0px 14px 26px -14px rgba(20,17,43,0.25)'
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
        rest: { y: 0, scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
        hover: { y: -2, scale: 1.02, boxShadow: glow },
        tap: { y: 0, scale: 0.98, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`inline-flex items-center justify-center rounded-full font-semibold ${pad} ${styles[variant]} ${className}`}
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
