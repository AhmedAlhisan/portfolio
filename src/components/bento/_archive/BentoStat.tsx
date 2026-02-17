'use client'

import { BentoCard } from './BentoCard'
import { AnimatedCounter } from '../animations/AnimatedCounter'
import { LucideIcon } from 'lucide-react'

interface BentoStatProps {
  icon: LucideIcon
  value?: number
  suffix?: string
  label: string
  description: string
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  span?: { cols: string; rows: string }
  className?: string
}

export function BentoStat({
  icon: Icon,
  value,
  suffix,
  label,
  description,
  glowColor = 'cyan',
  span,
  className
}: BentoStatProps) {
  return (
    <BentoCard glowColor={glowColor} span={span} className={className}>
      <div className="relative">
        <Icon className="w-8 h-8 text-current mb-4 animate-pulse-glow" />
        {value !== undefined ? (
          <>
            <div className="text-5xl md:text-6xl font-bold text-current mb-3">
              <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <div className="text-white/80 text-sm mb-2 font-medium">{label}</div>
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>
          </>
        ) : (
          <>
            <div className="text-white/80 text-base mb-2 font-medium">{label}</div>
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>
          </>
        )}
      </div>
    </BentoCard>
  )
}
