'use client'

import Link from 'next/link'
import { Brain, Sparkles, ArrowRight } from 'lucide-react'
import { BentoCard } from './BentoCard'
import { GlowOrb } from '../animations/GlowOrb'
import { MagneticButton } from '../animations/MagneticButton'
import { motion } from 'framer-motion'

export function BentoHero() {
  return (
    <BentoCard
      span={{ cols: '1 / -1', rows: 'auto' }}
      glowColor="cyan"
      className="md:col-span-4 lg:col-span-4 lg:row-span-3 relative overflow-hidden p-12 md:p-16"
    >
      {/* Background Orbs */}
      <GlowOrb color="cyan" size={300} className="top-0 right-0" />
      <GlowOrb color="blue" size={400} className="bottom-0 left-0" delay={2} />

      <div className="relative z-10">
        {/* Animated Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <Brain className="w-5 h-5 text-cyan-400 animate-pulse-glow" />
            <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-medium">
              AI Product Manager & Engineer
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8"
        >
          <span className="text-white block hover:text-cyan-400 transition-colors duration-500">
            Ahmed
          </span>
          <span className="text-white block hover:text-blue-400 transition-colors duration-500">
            Alhisan
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-2xl mb-12"
        >
          10+ years transforming complex AI challenges into production-ready solutions. Specialized
          in voice intelligence, RAG architectures, and agentic systems.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="#work">
            <MagneticButton className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group backdrop-blur-sm">
              <span className="text-sm tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                VIEW WORK
              </span>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-2 transition-transform" />
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </BentoCard>
  )
}
