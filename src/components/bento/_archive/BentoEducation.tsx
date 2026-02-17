'use client'

import Image from 'next/image'
import { BentoCard } from './BentoCard'
import { LucideIcon } from 'lucide-react'

interface BentoEducationProps {
  institution: string
  degree: string
  logo: string
  icon: LucideIcon
  glowColor?: 'cyan' | 'blue' | 'indigo' | 'purple'
  span?: { cols: string; rows: string }
  className?: string
}

export function BentoEducation({
  institution,
  degree,
  logo,
  icon: Icon,
  glowColor = 'cyan',
  span,
  className
}: BentoEducationProps) {
  return (
    <BentoCard glowColor={glowColor} span={span} className={className}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-white/10 border border-${glowColor}-500/20 flex items-center justify-center backdrop-blur-sm`}>
          <Image
            src={logo}
            alt={institution}
            width={32}
            height={32}
            className="object-contain brightness-150 contrast-125"
          />
        </div>
        <Icon className={`w-5 h-5 text-${glowColor}-400 animate-pulse-glow`} />
      </div>
      <div className="text-white font-medium mb-2">{institution}</div>
      <div className="text-white/60 text-sm">{degree}</div>
    </BentoCard>
  )
}
