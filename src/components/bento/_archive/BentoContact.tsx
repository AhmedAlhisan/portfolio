'use client'

import { BentoCard } from './BentoCard'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface BentoContactProps {
  href: string
  icon: LucideIcon
  label: string
  value: string
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  span?: { cols: string; rows: string }
  className?: string
}

export function BentoContact({
  href,
  icon: Icon,
  label,
  value,
  glowColor = 'cyan',
  span,
  className
}: BentoContactProps) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
      <BentoCard glowColor={glowColor} span={span} className={className}>
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-xl bg-${glowColor}-500/10 border border-${glowColor}-500/20`}>
            <Icon className={`w-6 h-6 text-${glowColor}-400`} />
          </div>
          <div className="flex-1">
            <div className="text-white/40 text-sm mb-1">{label}</div>
            <div className={`text-xl md:text-2xl text-white group-hover:text-${glowColor}-400 transition-colors`}>
              {value}
            </div>
          </div>
          <ArrowRight className={`w-6 h-6 text-${glowColor}-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all`} />
        </div>
      </BentoCard>
    </a>
  )
}
