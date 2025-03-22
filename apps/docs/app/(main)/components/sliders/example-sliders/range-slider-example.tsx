'use client'
import React from 'react'
import { RangeSlider } from '@3a.solutions/ui/slider'
import { Label } from '@3a.solutions/ui/forms'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { Check } from 'lucide-react'
import { Badge } from '@3a.solutions/ui/badge'
import { StyleguideRender } from '@/ui/styleguide-render'

export const RangeSliderExample: React.FC = () => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([250, 750])
  const [isFiltering, setIsFiltering] = React.useState<boolean>(false)

  const handleApplyFilter = () => {
    setIsFiltering(true)
  }

  const handleResetFilter = () => {
    setPriceRange([250, 750])
    setIsFiltering(false)
  }

  return (
    <StyleguideRender label="Range Slider Example">
      <div className="flex flex-col justify-center">
        <div>
          <div className="space-y-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="price-filter" className="text-sm">
                  Price Range
                </Label>
                <span className="text-sm font-medium">
                  €{priceRange[0]} - €{priceRange[1]}
                </span>
              </div>

              <RangeSlider
                min={0}
                max={1000}
                step={1}
                value={priceRange}
                onChange={(values) => setPriceRange(values)}
              />

              <div className="text-muted-foreground flex justify-between pt-1 text-xs">
                <span>€0</span>
                <span>€1000</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="flex items-center justify-between">
                {isFiltering && (
                  <Badge className="flex items-center gap-1.5">
                    <Check className="size-3.5" />
                    Filter Applied
                  </Badge>
                )}
              </div>
              <ButtonGroup variant="outline">
                <Button onClick={handleResetFilter}>Reset</Button>
                <Button onClick={handleApplyFilter}>Apply Filter</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </StyleguideRender>
  )
}
