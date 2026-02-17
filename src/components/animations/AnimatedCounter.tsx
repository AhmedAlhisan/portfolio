'use client'

import { useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!isInView || !ref.current) return

    if (prefersReducedMotion) {
      ref.current.textContent = `${prefix}${value}${suffix}`
      return
    }

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)

      if (ref.current) {
        ref.current.textContent = `${prefix}${current}${suffix}`
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration, suffix, prefix, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
