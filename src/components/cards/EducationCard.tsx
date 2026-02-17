'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface EducationCardProps {
  institution: string
  degree: string
  period: string
  status: string
  logo: string
  type: 'degree' | 'certification'
  index: number
}

export function EducationCard({
  institution,
  degree,
  period,
  status,
  logo,
  type,
  index,
}: EducationCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { margin: '-100px', once: true })

  const statusColors = {
    'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    Completed: 'bg-green-500/20 text-green-400 border-green-400/30',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10 hover:border-cyan-400/30 transition-all duration-300',
        type === 'degree' && 'md:col-span-2'
      )}
    >
      {/* Logo */}
      <div className="flex items-start justify-between mb-6">
        <div className="relative w-16 h-16 rounded-2xl bg-white/10 dark:bg-white/10 border border-white/10 dark:border-white/10 flex items-center justify-center overflow-hidden group-hover:border-cyan-400/30 transition-colors">
          <Image
            src={logo}
            alt={institution}
            width={48}
            height={48}
            className="object-contain brightness-150 contrast-125"
          />
        </div>

        {/* Status Badge */}
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm',
            statusColors[status as keyof typeof statusColors] || statusColors.Completed
          )}
        >
          {status}
        </span>
      </div>

      {/* Institution */}
      <h3 className="text-xl md:text-2xl font-bold text-theme mb-2 group-hover:text-cyan-400 transition-colors">
        {institution}
      </h3>

      {/* Degree */}
      <p className="text-theme opacity-70 text-base md:text-lg mb-4">{degree}</p>

      {/* Period */}
      <p className="text-sm font-mono text-theme opacity-50">{period}</p>
    </motion.div>
  )
}
