'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { SkillPill } from '@/components/skills/SkillPill'
import { skills } from '@/lib/constants/content'

interface SkillsSectionProps {
  id?: string
}

export default function SkillsSection({ id = 'skills' }: SkillsSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4" />
          <p className="text-xl text-theme opacity-60 mb-16 max-w-2xl">
            Technical expertise spanning AI/ML, software engineering, and product management
          </p>

          {/* Skills Grid */}
          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-2xl font-bold text-theme mb-6">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill, index) => (
                    <SkillPill
                      key={skill}
                      skill={skill}
                      index={index}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
