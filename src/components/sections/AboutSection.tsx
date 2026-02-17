'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { Award, Users } from 'lucide-react'
import { about } from '@/lib/constants/content'

interface AboutSectionProps {
  id?: string
}

export default function AboutSection({ id = 'about' }: AboutSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            About
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-12" />

          {/* Content */}
          <div className="space-y-6">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-body-premium text-theme opacity-80 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-theme font-semibold">
                  {about.badges[0].label}
                </div>
                <div className="text-theme opacity-60 text-sm">
                  {about.badges[0].value}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 backdrop-blur-sm">
              <div className="p-3 rounded-xl bg-indigo-500/20">
                <Award className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-theme font-semibold">
                  {about.badges[1].label}
                </div>
                <div className="text-theme opacity-60 text-sm">
                  {about.badges[1].value}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
