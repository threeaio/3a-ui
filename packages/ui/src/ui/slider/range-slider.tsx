'use client'

import * as React from 'react'
import { useRanger } from '@tanstack/react-ranger'
import { cn } from '@3a.solutions/ui/lib/utils'
import { SliderTicks } from './slider-ticks'

interface RangeSliderProps {
  className?: string
  min?: number
  max?: number
  step?: number
  value?: [number, number]
  defaultValue?: [number, number]
  onChange?: (value: [number, number]) => void
  // Handle constraints
  leftHandleMax?: number
  rightHandleMin?: number
  // Tick related props
  showTicks?: boolean
  tickCount?: number
  showTickLabels?: boolean
  tickClassName?: string
  tickLabelClassName?: string
  getTickLabel?: (value: number) => React.ReactNode
}

function RangeSlider({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [25, 75],
  onChange,
  // Handle constraints
  leftHandleMax,
  rightHandleMin,
  // Tick related props
  showTicks = false,
  tickCount,
  showTickLabels = false,
  tickClassName,
  tickLabelClassName,
  getTickLabel,
}: RangeSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [internalValues, setInternalValues] = React.useState<[number, number]>(value ?? defaultValue)
  const values = value ?? internalValues

  // Define constants for styling consistency with the native Slider
  const THUMB_SIZE = 16 // 4rem in pixels (size-4 class)

  const rangerInstance = useRanger({
    getRangerElement: () => trackRef.current,
    values: value ? value : values,
    min,
    max,
    stepSize: step,
    onChange: (instance) => {
      const newValues = instance.sortedValues as [number, number]

      // Apply constraints
      if (leftHandleMax !== undefined && newValues[0] > leftHandleMax) {
        newValues[0] = leftHandleMax
      }
      if (rightHandleMin !== undefined && newValues[1] < rightHandleMin) {
        newValues[1] = rightHandleMin
      }

      if (value) {
        onChange?.(newValues)
      } else {
        setInternalValues(newValues)
      }
    },
    onDrag: (instance) => {
      const newValues = instance.sortedValues as [number, number]

      // Apply constraints
      if (leftHandleMax !== undefined && newValues[0] > leftHandleMax) {
        newValues[0] = leftHandleMax
      }
      if (rightHandleMin !== undefined && newValues[1] < rightHandleMin) {
        newValues[1] = rightHandleMin
      }

      if (value) {
        onChange?.(newValues)
      } else {
        setInternalValues(newValues)
      }
    },
  })

  const { handles, getPercentageForValue } = rangerInstance

  return (
    <div className="relative">
      <div
        className={cn('relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50', className)}
      >
        {/* Track container with same styling as native Slider */}
        <div ref={trackRef} className="bg-default/10 relative h-1 w-full overflow-hidden rounded-full">
          {/* Active track - positioned to align with the center of the thumbs */}
          <div
            className="bg-default absolute h-full"
            style={{
              left: `${getPercentageForValue(values[0])}%`,
              right: `${100 - getPercentageForValue(values[1])}%`,
            }}
          />
        </div>

        {/* Thumbs with size 0, using pseudo-element for appearance */}
        {handles().map(({ value, isActive, onKeyDownHandler, onMouseDownHandler, onTouchStart }, index) => (
          <button
            key={index}
            onKeyDown={onKeyDownHandler}
            onMouseDown={onMouseDownHandler}
            onTouchStart={onTouchStart}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            className={cn(
              'before:border-default before:bg-background before:ring-ring before:focus-visible:outline-hidden absolute block h-0 w-0 shrink-0 cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:block before:size-4 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:border before:shadow-sm before:transition-[color,box-shadow] before:hover:ring-4 before:focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
              isActive && 'z-10 before:z-10',
            )}
            style={{
              left: `${getPercentageForValue(value)}%`,
              top: '50%',
            }}
          />
        ))}
      </div>
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
        />
      )}
    </div>
  )
}

export { RangeSlider }
export type { RangeSliderProps }
