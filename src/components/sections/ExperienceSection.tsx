'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { TimelineItem } from '@/components/timeline/TimelineItem'
import { experiences } from '@/lib/constants/content'

interface ExperienceSectionProps {
  id?: string
}

export default function ExperienceSection({ id = 'experience' }: ExperienceSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4" />
          <p className="text-xl text-theme opacity-60 mb-16 max-w-2xl">
            7+ years of software engineering and AI product management across diverse industries
          </p>

          {/* Timeline */}
          <div className="relative mt-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.company}
                {...experience}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
