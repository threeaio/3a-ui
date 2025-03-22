'use client'
import React from 'react'
import { RangeSlider } from '@3a.solutions/ui/slider'
import { Label } from '@3a.solutions/ui/forms'
import { StyleguideRender } from '@/ui/styleguide-render'

export const RangeSliderWithTicksExamples: React.FC = () => {
  const [basicRange, setBasicRange] = React.useState<[number, number]>([30, 70])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([200, 800])
  const [timeRange, setTimeRange] = React.useState<[number, number]>([9, 17])

  // Custom formatter for price display
  const formatPrice = (value: number) => `$${value}`

  // Custom formatter for time display (24h format to AM/PM)
  const formatTime = (value: number) => {
    const hour = Math.floor(value)
    const minute = Math.round((value - hour) * 60)
    const period = hour >= 12 ? 'PM' : 'AM'
    const adjustedHour = hour % 12 || 12
    return `${adjustedHour}${minute > 0 ? `:${minute.toString().padStart(2, '0')}` : ''} ${period}`
  }

  return (
    <StyleguideRender label="Range Slider with Ticks">
      <div className="max-w-2xl space-y-20">
        {/* Example 1: Basic Range with Ticks */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Basic Range Ticks</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="basic-range-slider">
              Range: {basicRange[0]} - {basicRange[1]}
            </Label>
            <RangeSlider min={0} max={100} step={10} showTicks value={basicRange} onChange={setBasicRange} />
          </div>
        </div>

        {/* Example 2: Price Range with Labels */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Price Filter</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="price-range-slider">
              Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </Label>
            <RangeSlider
              min={0}
              max={1000}
              step={100}
              showTicks
              tickCount={6}
              showTickLabels
              getTickLabel={formatPrice}
              value={priceRange}
              onChange={setPriceRange}
            />
          </div>
        </div>

        {/* Example 3: Time Range Selector */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Time Range</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="time-range-slider">
              Hours: {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
            </Label>
            <RangeSlider
              min={0}
              max={24}
              step={1}
              showTicks
              tickCount={7}
              showTickLabels
              getTickLabel={formatTime}
              value={timeRange}
              onChange={setTimeRange}
            />
          </div>
        </div>
      </div>
    </StyleguideRender>
  )
}
