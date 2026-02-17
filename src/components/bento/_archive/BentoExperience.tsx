'use client'

import Image from 'next/image'
import { BentoCard } from './BentoCard'
import { LucideIcon } from 'lucide-react'

interface ExperienceItem {
  period: string
  company: string
  role: string
  logo: string
  icon: LucideIcon
  highlights: Array<{
    icon: LucideIcon
    text: string
  }>
  glowColor: 'cyan' | 'blue' | 'indigo' | 'purple'
}

interface BentoExperienceProps {
  experiences: ExperienceItem[]
  span?: { cols: string; rows: string }
}

export function BentoExperience({ experiences, span }: BentoExperienceProps) {
  return (
    <BentoCard span={span} glowColor="blue" interactive={false} className="col-span-full">
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 p-2 flex items-center justify-center">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={32}
                      height={32}
                      className="object-contain brightness-150 contrast-125"
                    />
                  </div>
                  <div className="text-sm text-white/40">{exp.period}</div>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`w-5 h-5 text-${exp.glowColor}-400`} />
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                </div>

                <div className="text-white/60 font-medium mb-4 text-sm">{exp.company}</div>

                <div className="space-y-2">
                  {exp.highlights.map((highlight, i) => {
                    const HighlightIcon = highlight.icon
                    return (
                      <p key={i} className="flex items-start gap-2 text-white/60 text-sm">
                        <HighlightIcon className={`w-4 h-4 text-${exp.glowColor}-400 mt-0.5 flex-shrink-0`} />
                        <span>{highlight.text}</span>
                      </p>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </BentoCard>
  )
}
