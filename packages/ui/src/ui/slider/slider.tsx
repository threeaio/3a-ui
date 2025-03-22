'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@3a.solutions/ui/lib/utils'
import { SliderTicks } from './slider-ticks'

export interface SliderProps extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'orientation'> {
  showTicks?: boolean
  tickCount?: number
  showTickLabels?: boolean
  tickClassName?: string
  tickLabelClassName?: string
  getTickLabel?: (value: number) => React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  showTicks = false,
  tickCount,
  showTickLabels = false,
  tickClassName,
  tickLabelClassName,
  getTickLabel,
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  )

  return (
    <div className="relative">
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        className={cn(
          'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'bg-default/10 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1',
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              'bg-default absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="before:border-default before:bg-background before:ring-ring before:focus-visible:outline-hidden relative block h-0 w-0 shrink-0 cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:block before:size-4 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:border before:shadow-sm before:transition-[color,box-shadow] before:hover:ring-4 before:focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>

      {showTicks && (
        <SliderTicks
          min={min}
          max={max}
          step={step}
          tickCount={tickCount}
          showTickLabels={showTickLabels}
          tickClassName={tickClassName}
          tickLabelClassName={tickLabelClassName}
          getTickLabel={getTickLabel}
          orientation={orientation}
        />
      )}
    </div>
  )
}

export { Slider }
