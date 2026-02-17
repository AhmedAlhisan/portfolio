'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ProjectCaseStudy } from '@/components/cards/ProjectCaseStudy'
import { projects } from '@/lib/constants/content'

interface ProjectsSectionProps {
  id?: string
}

export default function ProjectsSection({ id = 'projects' }: ProjectsSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
            Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4" />
          <p className="text-xl text-theme opacity-60 mb-16 max-w-2xl">
            Featured case studies showcasing production-ready AI systems with measurable impact
          </p>

          {/* Project Case Studies */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <ProjectCaseStudy key={project.id} {...project} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
