import type { IconName } from '~/data/portfolio'

type FlowIcon = 'doc' | 'profile' | 'sliders' | 'ban' | 'bulb' | 'shield' | 'target' | 'database' | 'gauge' | 'loop' | 'eye'

const paths: Record<IconName | FlowIcon | 'users' | 'lock' | 'arrow' | 'download' | 'plus' | 'github', string> = {
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a8 8 0 0 1 16 0v1',
  sliders: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4',
  ban: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6l12.8 12.8',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  database: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  gauge: 'M4 18a8 8 0 1 1 16 0M12 18l4-6',
  loop: 'M4 12a8 8 0 0 1 14-5.3M20 4v5h-5M20 12a8 8 0 0 1-14 5.3M4 20v-5h5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  spark: 'M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19',
  briefcase: 'M3 8h18v12H3zM8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M3 13h18',
  leap: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v1a4 4 0 0 0 4 4M17 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M9 18h6',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7.5M18 21v-1a6 6 0 0 0-3-5.2',
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
