'use client'

import { motion } from 'framer-motion'
import { LucideIcon, Brain, Database, Target } from 'lucide-react'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { useInView } from '@/hooks/useInView'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Database,
  Target,
}

interface ImpactCardProps {
  title: string
  metric: {
    value: number
    suffix: string
    label: string
  } | null
  icon: string
  color: 'cyan' | 'blue' | 'indigo' | 'purple'
  highlights: string[]
  index: number
}

const colorClasses = {
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-600/10',
    border: 'border-cyan-400/20',
    icon: 'bg-cyan-500/20',
    iconText: 'text-cyan-400',
    glow: 'hover:shadow-[0_20px_60px_rgba(6,182,212,0.3)]',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/10',
    border: 'border-blue-400/20',
    icon: 'bg-blue-500/20',
    iconText: 'text-blue-400',
    glow: 'hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]',
  },
  indigo: {
    bg: 'from-indigo-500/10 to-indigo-600/10',
    border: 'border-indigo-400/20',
    icon: 'bg-indigo-500/20',
    iconText: 'text-indigo-400',
    glow: 'hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)]',
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-600/10',
    border: 'border-purple-400/20',
    icon: 'bg-purple-500/20',
    iconText: 'text-purple-400',
    glow: 'hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)]',
  },
}

export function ImpactCard({
  title,
  metric,
  icon,
  color,
  highlights,
  index,
}: ImpactCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-100px', once: true })
  const Icon = iconMap[icon] || Brain

  const colorConfig = colorClasses[color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'group relative p-8 rounded-3xl bg-gradient-to-br backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2',
        colorConfig.bg,
        colorConfig.border,
        colorConfig.glow
      )}
    >
      {/* Icon */}
      <div
        className={cn('inline-flex p-4 rounded-2xl mb-6', colorConfig.icon)}
      >
        <Icon className={cn('w-8 h-8', colorConfig.iconText)} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-theme mb-6">{title}</h3>

      {/* Metric (if provided) */}
      {metric && (
        <div className="mb-6">
          <div className={cn('text-6xl font-bold mb-2', colorConfig.iconText)}>
            {isInView && (
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
            )}
          </div>
          <div className="text-theme opacity-60 text-sm font-medium">
            {metric.label}
          </div>
        </div>
      )}

      {/* Highlights */}
      <ul className="space-y-3">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2 text-theme opacity-70">
            <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0', colorConfig.icon)} />
            <span className="text-sm leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
