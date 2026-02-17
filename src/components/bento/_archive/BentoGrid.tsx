import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1', // Mobile: single column
        'md:grid-cols-4 md:gap-5', // Tablet: 4 columns
        'lg:grid-cols-6 lg:gap-6', // Desktop: 6 columns
        'xl:gap-8', // XL: larger gaps
        'auto-rows-auto', // Auto row sizing
        className
      )}
    >
      {children}
    </div>
  )
}
