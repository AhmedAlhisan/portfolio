'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram'
import { cn } from '@/lib/utils'

interface ProjectCaseStudyProps {
  id: string
  title: string
  problem: string
  approach: string
  architecture: {
    nodes: Array<{
      id: string
      label: string
      icon: string
      color: 'cyan' | 'blue' | 'indigo' | 'purple'
    }>
    connections: Array<{
      from: string
      to: string
      label?: string
    }>
  }
  techStack: string[]
  results: string
  learnings: string
  index: number
}

type Tab = 'problem' | 'approach' | 'architecture' | 'tech' | 'results' | 'learnings'

const tabs: { id: Tab; label: string }[] = [
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'results', label: 'Results' },
  { id: 'learnings', label: 'Learnings' },
]

export function ProjectCaseStudy({
  title,
  problem,
  approach,
  architecture,
  techStack,
  results,
  learnings,
  index,
}: ProjectCaseStudyProps) {
  const [activeTab, setActiveTab] = useState<Tab>('problem')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10 hover:border-white/20 dark:hover:border-white/20 transition-all duration-300"
    >
      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-bold text-theme mb-8 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 dark:border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                : 'text-theme opacity-60 hover:opacity-100 hover:bg-white/5 dark:hover:bg-white/5'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'problem' && (
          <motion.div
            key="problem"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-cyan-400 mb-4">Problem</h4>
            <p className="text-lg text-theme opacity-70 leading-relaxed">{problem}</p>
          </motion.div>
        )}

        {activeTab === 'approach' && (
          <motion.div
            key="approach"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-blue-400 mb-4">Approach</h4>
            <p className="text-lg text-theme opacity-70 leading-relaxed">{approach}</p>
          </motion.div>
        )}

        {activeTab === 'architecture' && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-indigo-400 mb-4">Architecture</h4>
            <ArchitectureDiagram
              nodes={architecture.nodes}
              connections={architecture.connections}
            />
          </motion.div>
        )}

        {activeTab === 'tech' && (
          <motion.div
            key="tech"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-purple-400 mb-6">Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-400/30 text-purple-400 text-sm font-medium hover:scale-105 transition-transform"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-cyan-400 mb-4">Results</h4>
            <p className="text-lg text-theme opacity-70 leading-relaxed">{results}</p>
          </motion.div>
        )}

        {activeTab === 'learnings' && (
          <motion.div
            key="learnings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-semibold text-blue-400 mb-4">Key Learnings</h4>
            <p className="text-lg text-theme opacity-70 leading-relaxed">{learnings}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
