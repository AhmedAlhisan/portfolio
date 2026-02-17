'use client'

import { useEffect, useState, useRef, RefObject } from 'react'

interface UseInViewOptions {
  once?: boolean
  margin?: string
  threshold?: number
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const { once = false, margin = '0px', threshold = 0.1 } = options

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && once && observerRef.current) {
          observerRef.current.disconnect()
        }
      },
      {
        rootMargin: margin,
        threshold
      }
    )

    observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref, options.once, options.margin, options.threshold])

  return isInView
}
