import type { IconName } from '~/data/portfolio'

const paths: Record<IconName | 'lock' | 'arrow' | 'download' | 'plus' | 'github', string> = {
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  spark: 'M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19',
  briefcase: 'M3 8h18v12H3zM8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M3 13h18',
  leap: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M9 18h6',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  download: 'M12 3v12M7 10l5 5 5-5M4 20h16',
  plus: 'M12 5v14M5 12h14',
  github: 'M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.5 12.5 0 0 0-6.5 0C6 1.1 4.9 1.4 4.9 1.4a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.4 8.5c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.4V21',
}

export function Icon({
  name,
  size = 24,
  stroke = 2,
  className,
}: {
  name: keyof typeof paths
  size?: number
  stroke?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  )
}
