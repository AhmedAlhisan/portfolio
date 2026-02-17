'use client'

import { motion } from 'framer-motion'
import { LucideIcon, FileAudio, Mic, Brain, Heart, Server, Search, Database, GitMerge, Bot, CheckCircle, MessageCircle, Trophy, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  FileAudio,
  Mic,
  Brain,
  Heart,
  Server,
  Search,
  Database,
  GitMerge,
  Bot,
  CheckCircle,
  MessageCircle,
  Trophy,
  Zap,
  Sparkles,
}

interface DiagramNode {
  id: string
  label: string
  icon: string
  color: string
}

interface DiagramConnection {
  from: string
  to: string
  label?: string
}

interface ArchitectureDiagramProps {
  nodes: DiagramNode[]
  connections: DiagramConnection[]
}

const colorClasses = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-400/30',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-400/30',
    text: 'text-indigo-400',
    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
}

export function ArchitectureDiagram({ nodes, connections }: ArchitectureDiagramProps) {
  return (
    <div className="relative py-12">
      {/* Nodes */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
        {nodes.map((node, index) => {
          const Icon = iconMap[node.icon] || Brain
          const colors = colorClasses[node.color as keyof typeof colorClasses] || colorClasses.cyan
          const isLast = index === nodes.length - 1

          return (
            <div key={node.id} className="flex items-center gap-4 md:gap-6">
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className={cn(
                  'relative flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105',
                  colors.bg,
                  colors.border,
                  colors.glow
                )}
              >
                <div className={cn('p-3 rounded-xl', colors.bg)}>
                  <Icon className={cn('w-6 h-6 md:w-8 md:h-8', colors.text)} />
                </div>
                <div className={cn('text-sm md:text-base font-medium text-center whitespace-nowrap', colors.text)}>
                  {node.label}
                </div>
              </motion.div>

              {/* Arrow */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className="hidden md:flex items-center"
                >
                  <div className="relative">
                    {/* Arrow line with gradient */}
                    <div className={cn('w-12 lg:w-16 h-0.5 bg-gradient-to-r',
                      `from-${node.color}-400/50 to-${nodes[index + 1]?.color || node.color}-400/50`
                    )} />
                    {/* Arrow head */}
                    <div className={cn(
                      'absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0',
                      'border-t-4 border-t-transparent',
                      'border-b-4 border-b-transparent',
                      'border-l-8',
                      `border-l-${nodes[index + 1]?.color || node.color}-400/50`
                    )} />

                    {/* Flow animation */}
                    <motion.div
                      className={cn('absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full', colors.bg, colors.border)}
                      animate={{
                        x: [0, 48, 48],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Connection label (if exists) */}
                    {connections[index]?.label && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 whitespace-nowrap">
                        {connections[index].label}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Vertical arrows */}
      <div className="md:hidden flex flex-col items-center gap-4 mt-8">
        {nodes.map((node, index) => {
          if (index === nodes.length - 1) return null
          const colors = colorClasses[node.color as keyof typeof colorClasses] || colorClasses.cyan

          return (
            <motion.div
              key={`arrow-${index}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative flex flex-col items-center"
            >
              <div className={cn('w-0.5 h-8 bg-gradient-to-b',
                `from-${node.color}-400/50 to-${nodes[index + 1]?.color || node.color}-400/50`
              )} />
              <div className={cn(
                'w-0 h-0 mt-0.5',
                'border-l-4 border-l-transparent',
                'border-r-4 border-r-transparent',
                'border-t-8',
                `border-t-${nodes[index + 1]?.color || node.color}-400/50`
              )} />

              {connections[index]?.label && (
                <div className="text-xs text-white/40 mt-2">
                  {connections[index].label}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
