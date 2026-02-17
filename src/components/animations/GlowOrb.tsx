'use client'

import { motion } from 'framer-motion'

interface GlowOrbProps {
  color?: 'cyan' | 'blue' | 'indigo' | 'purple'
  size?: number
  delay?: number
  duration?: number
  top?: string
  left?: string
  className?: string
}

export function GlowOrb({
  color = 'cyan',
  size = 384,
  delay = 0,
  duration = 6,
  top,
  left,
  className = ''
}: GlowOrbProps) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20',
    blue: 'bg-blue-500/20',
    indigo: 'bg-indigo-500/20',
    purple: 'bg-purple-500/20'
  }

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colorClasses[color]} ${className}`}
      style={{ width: size, height: size, top, left }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    />
  )
}
