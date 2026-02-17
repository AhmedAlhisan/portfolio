'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ImpactCard } from '@/components/cards/ImpactCard'
import { impactCards } from '@/lib/constants/content'

interface ImpactSectionProps {
  id?: string
}

export default function ImpactSection({ id = 'impact' }: ImpactSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            Impact
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4" />
          <p className="text-xl text-theme opacity-60 mb-16 max-w-2xl">
            Key achievements with measurable business impact
          </p>

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactCards.map((card, index) => (
              <ImpactCard key={card.title} {...card} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
