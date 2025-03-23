'use client'
import React from 'react'
import { Slider } from '@3a.solutions/ui/slider'
import { RangeSlider } from '@3a.solutions/ui/slider'
import { StyleguideSection } from '@/ui/styleguide-section'
import { StyleguideRender } from '@/ui/styleguide-render'
import StyleguideExplanation from '@/ui/styleguide-explanation'
import { Label } from '@3a.solutions/ui/forms'
import { BasicSliderExample } from './example-sliders/basic-slider-example'
import { RangeSliderExample } from './example-sliders/range-slider-example'
import { SliderWithTicksExamples } from './example-sliders/slider-with-ticks-examples'
import { RangeSliderWithTicksExamples } from './example-sliders/range-slider-with-ticks-examples'
import { RangeSliderWithConstraintsExample } from './example-sliders/range-slider-with-constraints-example'

const SliderShowcase: React.FC = () => {
  const [singleValue, setSingleValue] = React.useState<number>(50)
  const [rangeValue, setRangeValue] = React.useState<[number, number]>([25, 75])

  return (
    <StyleguideSection title="Slider Components" subline="Core slider components and their usage">
      <StyleguideExplanation>
        <p className="text-muted-foreground mb-5 max-w-2xl leading-tight">
          Sliders allow users to make selections from a range of values. The slider system provides:
        </p>
        <ul className="text-muted-foreground mb-5 max-w-2xl list-disc space-y-2 pl-5 leading-tight">
          <li>
            <span className="text-foreground font-medium">Single Slider:</span> Select a single value from a range
          </li>
          <li>
            <span className="text-foreground font-medium">Range Slider:</span> Select a range between two values
          </li>
          <li>
            <span className="text-foreground font-medium">Customization:</span> Min/max values, step sizes, and styling
            options
          </li>
          <li>
            <span className="text-foreground font-medium">Tick Marks:</span> Visual indicators for values along the
            track
          </li>
          <li>
            <span className="text-foreground font-medium">Constraints:</span> Restrict the range of values that can be
            selected
          </li>
        </ul>
      </StyleguideExplanation>

      {/* Individual Components */}
      <StyleguideRender label="Simple Slider">
        <div className="max-w-2xl space-y-10">
          <div className="flex flex-col gap-5">
            <Label htmlFor="default-slider">Default Slider: {singleValue}</Label>
            <Slider
              id="default-slider"
              min={0}
              max={100}
              defaultValue={[singleValue]}
              onValueChange={(values) => setSingleValue(values[0] ?? 0)}
            />
          </div>

          <div className="flex flex-col gap-5">
            <Label htmlFor="custom-range-slider">Custom Range Slider (0-500, step: 10)</Label>
            <Slider id="custom-range-slider" min={0} max={500} step={10} defaultValue={[200]} />
          </div>

          <div className="flex flex-col gap-5">
            <Label htmlFor="disabled-slider">Disabled Slider</Label>
            <Slider id="disabled-slider" defaultValue={[40]} disabled />
          </div>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Range Slider">
        <div className="max-w-2xl space-y-10">
          <div className="flex flex-col gap-5">
            <Label>
              Default Range Slider: {rangeValue[0]} - {rangeValue[1]}
            </Label>
            <RangeSlider defaultValue={rangeValue} onChange={(values) => setRangeValue(values)} />
          </div>

          <div className="flex flex-col gap-5">
            <Label>Custom Range with Step (step: 5)</Label>
            <RangeSlider min={0} max={100} step={5} defaultValue={[20, 80]} />
          </div>

          <div className="flex flex-col gap-5">
            <Label>Price Range (€0 - €1000)</Label>
            <RangeSlider min={0} max={1000} step={10} defaultValue={[200, 600]} />
            <div className=" flex justify-between text-xs font-mono">
              <span>€0</span>
              <span>€1000</span>
            </div>
          </div>
        </div>
      </StyleguideRender>

      {/* Slider with Ticks Examples */}
      <SliderWithTicksExamples />

      {/* Range Slider with Ticks Examples */}
      <RangeSliderWithTicksExamples />

      {/* Constrained Range Slider Example */}
      <RangeSliderWithConstraintsExample />

      {/* Example Use Cases */}
      <BasicSliderExample />

      <RangeSliderExample />
    </StyleguideSection>
  )
}

export default SliderShowcase
