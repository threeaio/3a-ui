'use client'
import React from 'react'
import { Slider } from '@3a.solutions/ui/slider'
import { Label } from '@3a.solutions/ui/forms'
import { StyleguideRender } from '@/ui/styleguide-render'

export const SliderWithTicksExamples: React.FC = () => {
  const [basicValue, setBasicValue] = React.useState<number>(50)
  const [customTicksValue, setCustomTicksValue] = React.useState<number>(500)
  const [temperatureValue, setTemperatureValue] = React.useState<number>(22)

  // Custom formatter to display values with temperature symbol
  const formatTemperature = (value: number) => `${value}°C`

  const getBasicRangeTickLabel = (value: number, min: number, max: number) => {
    return value == min || value == max ? value.toString() : ''
  }

  return (
    <StyleguideRender label="Single Slider with Ticks">
      <div className="max-w-2xl space-y-20">
        {/* Example 1: Basic Ticks */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Basic Tick Marks</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="basic-ticks-slider">Value: {basicValue}</Label>
            <Slider
              id="basic-ticks-slider"
              min={0}
              max={100}
              step={10}
              showTicks
              showTickLabels
              getTickLabel={(value) => getBasicRangeTickLabel(value, 0, 100)}
              value={[basicValue]}
              tickLabelClassName="font-mono"
              onValueChange={(values) => setBasicValue(values[0] || 0)}
            />
          </div>
        </div>

        {/* Example 2: Custom Tick Count with Labels */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Custom Tick Count</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="custom-ticks-slider">Value: {customTicksValue}</Label>
            <Slider
              id="custom-ticks-slider"
              min={0}
              max={1000}
              step={100}
              showTicks
              tickCount={6} // Specific number of ticks
              showTickLabels
              value={[customTicksValue]}
              tickLabelClassName="font-mono"
              onValueChange={(values) => setCustomTicksValue(values[0] || 0)}
            />
          </div>
        </div>

        {/* Example 3: Custom Formatting */}
        <div className="space-y-5">
          <h3 className="text-muted-foreground text-sm">Custom Labels</h3>
          <div className="flex flex-col gap-5">
            <Label htmlFor="temperature-slider">Temperature: {formatTemperature(temperatureValue)}</Label>
            <Slider
              id="temperature-slider"
              min={16}
              max={28}
              step={1}
              showTicks
              tickCount={7}
              showTickLabels
              getTickLabel={formatTemperature}
              value={[temperatureValue]}
              tickLabelClassName="font-mono"
              onValueChange={(values) => setTemperatureValue(values[0] || 22)}
            />
          </div>
        </div>
      </div>
    </StyleguideRender>
  )
}
