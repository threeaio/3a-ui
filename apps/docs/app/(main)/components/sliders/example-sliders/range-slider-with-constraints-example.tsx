'use client'

import React from 'react'
import { RangeSlider } from '@3a.solutions/ui/slider'
import { Label } from '@3a.solutions/ui/forms'
import { StyleguideRender } from '@/ui/styleguide-render'

export function RangeSliderWithConstraintsExample() {
  const [values, setValues] = React.useState<[number, number]>([-5, 10])

  return (
    <StyleguideRender label="Constrained Range Slider">
      <div className="flex max-w-2xl flex-col gap-5">
        <Label>Temperature Range with Constraints (-1, 5)</Label>
        <div className="space-y-2">
          <RangeSlider
            min={-10}
            max={20}
            step={1}
            value={values}
            onChange={setValues}
            leftHandleMax={-1} // Left handle cannot go above -1°C
            rightHandleMin={5} // Right handle cannot go below 5°C
            showTicks
            tickLabelClassName="font-mono"
            tickCount={7}
            showTickLabels
            getTickLabel={(value) => `${value}°C`}
          />
        </div>
      </div>
    </StyleguideRender>
  )
}
