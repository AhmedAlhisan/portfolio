'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useActiveSection } from '@/hooks/useActiveSection'
import { navLinks } from '@/lib/constants/content'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds)

  // Handle scroll for navbar visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Show/hide navbar based on scroll direction
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)

      // Add background blur when scrolled
      setIsScrolled(currentScrollPos > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        visible ? 'translate-y-0' : '-translate-y-full',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/10 dark:border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-theme text-sm font-medium tracking-wider hover:text-cyan-400 transition-colors"
          >
            AHMED ALHISAN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'relative text-sm tracking-wide transition-all duration-300 group',
                    isActive
                      ? 'text-cyan-400'
                      : 'text-theme opacity-60 hover:opacity-100'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              )
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-white/10 dark:border-white/10 transition-all duration-300 hover:scale-105 group"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-theme opacity-80 group-hover:text-yellow-400 transition-colors group-hover:rotate-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-theme opacity-80 group-hover:text-blue-400 transition-colors group-hover:rotate-180 duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-white/10 dark:border-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-theme opacity-80" />
              ) : (
                <Moon className="w-4 h-4 text-theme opacity-80" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-theme"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-blur-fade-in">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'text-sm tracking-wide transition-colors py-2 px-4 rounded-lg',
                    isActive
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-theme opacity-60 hover:opacity-100 hover:bg-white/5 dark:hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
