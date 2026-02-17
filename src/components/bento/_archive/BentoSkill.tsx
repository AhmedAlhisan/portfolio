'use client'

import { BentoCard } from './BentoCard'

interface BentoSkillProps {
  title: string
  skills: string[]
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  span?: { cols: string; rows: string }
  className?: string
}

export function BentoSkill({ title, skills, glowColor = 'cyan', span, className }: BentoSkillProps) {
  return (
    <BentoCard glowColor={glowColor} span={span} className={className}>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold tracking-wider">{title}</h3>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="text-white/60 text-sm hover:text-white transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}
