'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface BentoCardProps {
  children: React.ReactNode
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  className?: string
  span?: { cols: string; rows: string }
  interactive?: boolean
}

export function BentoCard({
  children,
  glowColor = 'cyan',
  className,
  span,
  interactive = true
}: BentoCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const glowColors = {
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] border-cyan-500/10 hover:border-cyan-500/30',
    blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] border-blue-500/10 hover:border-blue-500/30',
    indigo:
      'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] border-indigo-500/10 hover:border-indigo-500/30',
    purple:
      'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] border-purple-500/10 hover:border-purple-500/30'
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={
        prefersReducedMotion || !interactive
          ? {}
          : {
              y: -4,
              transition: { duration: 0.2 }
            }
      }
      style={
        span
          ? {
              gridColumn: span.cols,
              gridRow: span.rows
            }
          : undefined
      }
      className={cn(
        'relative rounded-2xl border bg-gradient-to-br from-white/5 to-transparent',
        'backdrop-blur-sm p-8 overflow-hidden transition-all duration-300',
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  )
}
