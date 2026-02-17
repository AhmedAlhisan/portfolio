'use client'

import { BentoCard } from './BentoCard'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface BentoProjectProps {
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
  impact?: {
    value: string
    label: string
  }
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  span?: { cols: string; rows: string }
  featured?: boolean
  className?: string
}

export function BentoProject({
  title,
  description,
  tags,
  icon: Icon,
  impact,
  glowColor = 'cyan',
  span,
  featured = false,
  className
}: BentoProjectProps) {
  return (
    <BentoCard glowColor={glowColor} span={span} className={className}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-${glowColor}-500/10 to-${glowColor}-600/10 border border-${glowColor}-500/20`}>
            <Icon className={`w-6 h-6 text-${glowColor}-400`} />
          </div>
        </div>

        <motion.h3
          className={`${featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} font-bold text-white group-hover:text-${glowColor}-400 transition-colors duration-300`}
        >
          {title}
        </motion.h3>

        <p className="text-xl text-white/60 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs text-${glowColor}-400 border border-${glowColor}-400/30 px-3 py-1 tracking-wider rounded-full hover:bg-${glowColor}-400/10 transition-colors`}
            >
              {tag}
            </span>
          ))}
        </div>

        {impact && (
          <div className="pt-4 flex items-center gap-4">
            <div>
              <div className={`text-4xl font-bold text-${glowColor}-400`}>{impact.value}</div>
              <div className="text-white/60 text-sm mt-1">{impact.label}</div>
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  )
}
