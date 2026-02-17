'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { EducationCard } from '@/components/cards/EducationCard'
import { education, certifications } from '@/lib/constants/content'

interface EducationSectionProps {
  id?: string
}

export default function EducationSection({ id = 'education' }: EducationSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4" />
          <p className="text-xl text-theme opacity-60 mb-16 max-w-2xl">
            Academic background and professional certifications in AI, software engineering, and product management
          </p>

          {/* Education Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {education.map((edu, index) => (
              <EducationCard key={edu.institution} {...edu} index={index} />
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-theme mb-8">Additional Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-theme font-semibold text-sm">{cert.name}</h4>
                    <span className="text-cyan-400 text-xs font-mono">{cert.year}</span>
                  </div>
                  <p className="text-theme opacity-60 text-xs">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
