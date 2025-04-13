import { cn } from '@3a.solutions/ui/lib/utils'

interface MetricValueProps {
  value: string
  unit?: string
  variant?: 'default' | 'small'
  className?: string
}

export function MetricValue({ value, unit, variant = 'default', className }: MetricValueProps) {
  return (
    <span
      className={cn('font-mono tabular-nums font-light', variant === 'default' ? 'text-3xl' : 'text-xl', className)}
    >
      {value}
      {unit && <span className="text-base ml-1 tracking-tight">{unit}</span>}
    </span>
  )
}
