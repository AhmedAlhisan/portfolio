'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function AnimatedGrid() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid Lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ['0px 0px', '80px 80px'],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Scanning Line Effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
            height: '200px',
          }}
          animate={{
            top: ['-200px', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 0%, var(--section-bg) 100%)',
        }}
      />
    </div>
  )
}
