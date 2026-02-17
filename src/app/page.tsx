'use client'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navigation from '@/components/navigation/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ImpactSection from '@/components/sections/ImpactSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black">
        <Navigation />

        <main>
          <HeroSection id="home" />
          <AboutSection id="about" />
          <ImpactSection id="impact" />
          <ProjectsSection id="projects" />
          <ExperienceSection id="experience" />
          <SkillsSection id="skills" />
          <EducationSection id="education" />
          <ContactSection id="contact" />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 dark:border-white/5 bg-theme py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-theme opacity-40 text-sm">
              <div>© {new Date().getFullYear()} Ahmed Alhisan. All rights reserved.</div>
              <div className="flex gap-8">
                <a href="#about" className="hover:opacity-100 transition-opacity">
                  About
                </a>
                <a href="#projects" className="hover:opacity-100 transition-opacity">
                  Projects
                </a>
                <a href="#contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
