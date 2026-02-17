'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { GlowOrb } from '@/components/animations/GlowOrb'
import { FloatingIcons } from '@/components/animations/FloatingIcons'
import { AnimatedGrid } from '@/components/animations/AnimatedGrid'
import { CodeSnippets } from '@/components/animations/CodeSnippets'
import { hero, personalInfo } from '@/lib/constants/content'

interface HeroSectionProps {
  id?: string
}

export default function HeroSection({ id = 'home' }: HeroSectionProps) {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <AnimatedGrid />

        {/* Code Snippets */}
        <CodeSnippets />

        {/* Floating Icons */}
        <FloatingIcons />

        {/* Glow Orbs */}
        <GlowOrb
          size={400}
          color="cyan"
          top="20%"
          left="10%"
          delay={0}
          duration={8}
        />
        <GlowOrb
          size={500}
          color="blue"
          top="60%"
          left="70%"
          delay={2}
          duration={10}
        />
        <GlowOrb
          size={350}
          color="indigo"
          top="40%"
          left="85%"
          delay={4}
          duration={12}
        />
      </div>

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 via-transparent to-transparent"
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 text-center">
        {/* Premium Chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.chips.map((chip, index) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.15,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              className="relative group px-6 py-3 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-400/30 text-cyan-300 backdrop-blur-md font-medium text-sm tracking-wide overflow-hidden shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">{chip}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* Name with Premium Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-hero font-extrabold mb-2 relative inline-block">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white dark:from-white dark:via-cyan-100 dark:to-white bg-clip-text text-transparent animate-text-glow drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              {personalInfo.name}
            </span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl -z-10"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </h1>
        </motion.div>

        {/* Title with Refined Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-5xl font-bold text-theme opacity-90 mb-8 leading-tight tracking-tight"
        >
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100 bg-clip-text text-transparent">
            {hero.headline}
          </span>
        </motion.h2>

        {/* Subheadline with Premium Styling */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl lg:text-3xl text-theme opacity-60 max-w-4xl mx-auto mb-16 font-light leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        {/* Premium CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-6 mb-24"
        >
          <MagneticButton
            onClick={() => handleScroll('#projects')}
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white font-semibold text-lg overflow-hidden shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:shadow-[0_30px_70px_rgba(6,182,212,0.5)] transition-all duration-500 flex items-center gap-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </MagneticButton>

          <MagneticButton
            onClick={() => handleScroll('#contact')}
            className="group relative px-10 py-5 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/20 text-theme font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Let's Connect</span>
          </MagneticButton>
        </motion.div>

        {/* Refined Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="flex flex-col items-center gap-3 text-theme opacity-30 hover:opacity-60 transition-opacity duration-300"
        >
          <span className="text-xs tracking-[0.3em] font-light uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.2
            }}
            className="relative"
          >
            <ChevronDown className="w-6 h-6" />
            <motion.div
              className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
