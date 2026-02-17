'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'

interface TimelineItemProps {
  period: string
  company: string
  role: string
  logo: string
  highlights: string[]
  index: number
  isLast?: boolean
}

export function TimelineItem({
  period,
  company,
  role,
  logo,
  highlights,
  index,
  isLast = false,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-100px', once: true })

  return (
    <div ref={ref} className="relative flex gap-8">
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative z-10 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
        </motion.div>

        {/* Vertical Line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            className="w-0.5 h-full bg-gradient-to-b from-cyan-400/50 to-transparent origin-top mt-2"
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
        className="flex-1 pb-12"
      >
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
          {/* Period */}
          <div className="text-sm font-mono text-cyan-400 mb-4 tracking-wider">
            {period}
          </div>

          {/* Company & Logo */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12 rounded-xl bg-white/10 dark:bg-white/10 border border-white/10 dark:border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt={company}
                width={40}
                height={40}
                className="object-contain brightness-150 contrast-125"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-theme group-hover:text-cyan-400 transition-colors">
                {company}
              </h3>
              <p className="text-theme opacity-60 text-sm md:text-base">{role}</p>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-3 mt-6">
            {highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + i * 0.05 }}
                className="flex items-start gap-3 text-theme opacity-70"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50 flex-shrink-0" />
                <span className="text-sm md:text-base leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
