'use client'

import * as React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'

export interface SliderTickProps {
  min: number
  max: number
  step: number
  tickCount?: number
  showTickLabels?: boolean
  className?: string
  tickClassName?: string
  tickLabelClassName?: string
  getTickLabel?: (value: number) => React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export function SliderTicks({
  min,
  max,
  step,
  tickCount,
  showTickLabels = false,
  className,
  tickClassName,
  tickLabelClassName,
  getTickLabel = (value) => value,
  orientation = 'horizontal',
}: SliderTickProps) {
  const isHorizontal = orientation === 'horizontal'

  // Calculate tick positions
  const ticks = React.useMemo(() => {
    // If tickCount is provided, create that many evenly spaced ticks
    if (tickCount) {
      return Array.from({ length: tickCount }, (_, i) => {
        const percentage = (i / (tickCount - 1)) * 100
        const value = min + ((max - min) * i) / (tickCount - 1)
        return { percentage, value: Math.round(value * 100) / 100 }
      })
    }

    // Otherwise, create ticks based on step
    const count = Math.floor((max - min) / step) + 1
    // Limit the number of ticks to prevent performance issues
    const maxTicksToShow = 20

    if (count > maxTicksToShow) {
      // If too many ticks, show an evenly distributed subset
      const newStep = Math.ceil((max - min) / (maxTicksToShow - 1))
      const newCount = Math.floor((max - min) / newStep) + 1

      return Array.from({ length: newCount }, (_, i) => {
        const value = min + i * newStep
        const percentage = ((value - min) / (max - min)) * 100
        return { percentage, value }
      })
    }

    return Array.from({ length: count }, (_, i) => {
      const value = min + i * step
      const percentage = ((value - min) / (max - min)) * 100
      return { percentage, value }
    })
  }, [min, max, step, tickCount])

  return (
    <div
      className={cn(
        'reative pointer-events-none h-10 w-full',
        isHorizontal ? 'top-full pt-2' : 'left-full h-full pl-2',
        className,
        tickClassName,
      )}
    >
      {ticks.map(({ percentage, value }) => (
        <div
          key={value}
          className={cn('absolute')}
          style={isHorizontal ? { left: `${percentage}%` } : { top: `${percentage}%` }}
        >
          <div className={cn('bg-default/50', isHorizontal ? 'h-2 w-px' : 'h-px w-2')} />
          {showTickLabels && (
            <div
              className={cn(
                'text-default/80 mt-1 whitespace-nowrap text-xs',
                isHorizontal ? 'text-center' : 'ml-3',
                'absolute',
                isHorizontal ? '-translate-x-1/2' : '-translate-y-1/2',
                tickLabelClassName,
              )}
              data-value={value}
            >
              {getTickLabel(value)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
