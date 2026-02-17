'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  DollarSign,
  TrendingUp,
  Zap,
  Database,
  GitBranch,
  Terminal,
  BarChart3,
  Rocket,
  Target,
  Cpu,
  Server,
  Activity,
  PieChart,
  LineChart,
  Sparkles
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const icons = [
  Code2, DollarSign, TrendingUp, Zap, Database, GitBranch,
  Terminal, BarChart3, Rocket, Target, Cpu, Server,
  Activity, PieChart, LineChart, Sparkles
]

interface FloatingIcon {
  Icon: typeof Code2
  x: string
  y: string
  delay: number
  duration: number
  size: number
  opacity: number
  rotate: number
}

// Generate random floating icons with varied positions and animations
const generateFloatingIcons = (count: number): FloatingIcon[] => {
  return Array.from({ length: count }, (_, i) => ({
    Icon: icons[i % icons.length],
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 20 + Math.random() * 20,
    size: 16 + Math.random() * 24,
    opacity: 0.03 + Math.random() * 0.07,
    rotate: Math.random() * 360,
  }))
}

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [floatingIcons] = useState(() => generateFloatingIcons(20))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || prefersReducedMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => {
        const { Icon, x, y, delay, duration, size, opacity, rotate } = item

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              left: x,
              top: y,
              opacity: 0,
              scale: 0,
              rotate: rotate,
            }}
            animate={{
              left: [x, `${parseFloat(x) + (Math.random() - 0.5) * 30}%`, x],
              top: [y, `${parseFloat(y) + (Math.random() - 0.5) * 30}%`, y],
              opacity: [0, opacity, opacity, 0],
              scale: [0, 1, 1, 0],
              rotate: [rotate, rotate + 360],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Icon
              className="text-cyan-400/20"
              style={{
                width: size,
                height: size,
                filter: 'blur(0.5px)',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
