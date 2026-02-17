'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkillPillProps {
  skill: string
  index: number
  category: string
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Programming: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-400/30',
    text: 'text-cyan-400',
  },
  Frameworks: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    text: 'text-blue-400',
  },
  'AI/ML': {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-400/30',
    text: 'text-indigo-400',
  },
  'DevOps/Cloud': {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    text: 'text-purple-400',
  },
  Databases: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-400/30',
    text: 'text-cyan-400',
  },
  Concepts: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    text: 'text-blue-400',
  },
  'Soft Skills': {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-400/30',
    text: 'text-indigo-400',
  },
}

export function SkillPill({ skill, index, category }: SkillPillProps) {
  const colors = categoryColors[category] || categoryColors.Programming

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'inline-block px-4 py-2 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg',
        colors.bg,
        colors.border,
        colors.text
      )}
    >
      <span className="text-sm font-medium">{skill}</span>
    </motion.span>
  )
}
