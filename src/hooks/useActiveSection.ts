'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Create an observer for each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If section is intersecting with at least 50% visibility
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -50% 0px',
          threshold: [0, 0.3, 0.5, 0.7, 1],
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  return activeSection
}
