'use client'

import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ContactForm } from '@/components/forms/ContactForm'
import { Mail, Linkedin, Download } from 'lucide-react'
import { personalInfo, contact } from '@/lib/constants/content'

interface ContactSectionProps {
  id?: string
}

export default function ContactSection({ id = 'contact' }: ContactSectionProps) {
  return (
    <section id={id} className="py-24 md:py-32 bg-theme">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <AnimatedSection>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-5xl md:text-6xl font-bold text-theme mb-6">
              {contact.cta}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-6" />
            <p className="text-xl text-theme opacity-60 max-w-2xl mx-auto">
              {contact.description}
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10">
              <h3 className="text-2xl font-bold text-theme mb-6">Send a Message</h3>
              <ContactForm />
            </div>

            {/* Direct Contact Options */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10">
                <h3 className="text-2xl font-bold text-theme mb-6">Direct Contact</h3>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-theme opacity-60 mb-1">Email</div>
                      <div className="text-theme font-medium group-hover:text-cyan-400 transition-colors">
                        {personalInfo.contact.email}
                      </div>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://${personalInfo.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                      <Linkedin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-theme opacity-60 mb-1">LinkedIn</div>
                      <div className="text-theme font-medium group-hover:text-blue-400 transition-colors">
                        Connect on LinkedIn
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${personalInfo.contact.phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 hover:border-indigo-400/40 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                      <Mail className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-theme opacity-60 mb-1">Phone</div>
                      <div className="text-theme font-medium group-hover:text-indigo-400 transition-colors">
                        {personalInfo.contact.phone}
                      </div>
                    </div>
                  </a>

                  {/* Download CV */}
                  <button
                    onClick={() => {
                      // TODO: Implement CV download
                      alert('CV download will be implemented')
                    }}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group"
                  >
                    <Download className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-theme font-semibold group-hover:text-purple-300 transition-colors">
                      Download CV
                    </span>
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:border-white/10 text-center">
                <div className="text-sm text-theme opacity-60 mb-2">Based in</div>
                <div className="text-xl font-semibold text-theme">{personalInfo.location}</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
