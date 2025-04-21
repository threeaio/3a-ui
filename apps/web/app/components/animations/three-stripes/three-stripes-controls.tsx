'use client'

import { useState } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Label } from '@3a.solutions/ui/forms'
import { Slider } from '@3a.solutions/ui/slider'
import { Switch } from '@3a.solutions/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3a.solutions/ui/tabs'
import { useThreeStripes } from './three-stripes-context'
import { ArrowLeft, ArrowRight, Settings } from 'lucide-react'
import Link from 'next/link'

type SliderProps = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  label: string
  unit?: string
}

function CompactSlider({ value, onChange, min, max, step, label, unit }: SliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <Label>{label}</Label>
        <span className="text-muted-foreground">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit}
        </span>
      </div>
      <Slider value={[value]} onValueChange={([v]) => onChange(v ?? value)} min={min} max={max} step={step} />
    </div>
  )
}

export function ThreeStripesControls() {
  const [open, setOpen] = useState(false)
  const {
    config,
    setStripeCount,
    setVanishingPointX,
    setStripeWidth,
    setGapWidth,
    setDebug,
    setBaseHeight,
    setPrimaryOscillator,
    setSecondaryOscillator,
    setBias,
    setRoundness,
  } = useThreeStripes()

  // Ensure all values are defined with defaults
  const stripeCount = config.stripeCount ?? 140
  const vanishingPointX = config.vanishingPointX ?? 0.5
  const stripeWidth = config.stripeWidth ?? 10
  const gapWidth = config.gapWidth ?? 4
  const baseHeight = config.baseHeight ?? 60
  const roundness = config.roundness ?? 5.7

  return (
    <div className="bg-background fixed bottom-0 p-20 border-t border-input z-100 w-full">
      <Tabs defaultValue="basic" className="">
        <div className="flex items-baseline gap-10 ">
          <Link
            href="/"
            className="text-2xl  text-balanced font-extrabold dark:font-bold uppercase leading-[1em] tracking-tight  hover:text-primary inline-block items-baseline"
          >
            <ArrowLeft className="size-9 mr-5 inline-block" strokeWidth={2.5} />
            <span>Back</span>
          </Link>
          <TabsList className="mb-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="primary">Osc 1</TabsTrigger>
            <TabsTrigger value="secondary">Osc 2</TabsTrigger>
            <TabsTrigger value="bias">Wave Bias</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic" className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <CompactSlider
              label="Stripe Count"
              value={stripeCount}
              onChange={setStripeCount}
              min={1}
              max={200}
              step={1}
            />
            <CompactSlider
              label="Vanishing Point"
              value={vanishingPointX * 100}
              onChange={(v) => setVanishingPointX(v / 100)}
              min={0}
              max={100}
              step={1}
              unit="%"
            />
            <CompactSlider
              label="Stripe Width"
              value={stripeWidth}
              onChange={setStripeWidth}
              min={1}
              max={200}
              step={1}
              unit="px"
            />
            <CompactSlider
              label="Gap Width"
              value={gapWidth}
              onChange={setGapWidth}
              min={0}
              max={200}
              step={1}
              unit="px"
            />
          </div>
        </TabsContent>
        <TabsContent value="primary" className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <CompactSlider
              label="BPM"
              value={config.primaryOscillator.bpm}
              onChange={(v) => setPrimaryOscillator({ bpm: v })}
              min={0.1}
              max={200}
              step={0.1}
            />
            <CompactSlider
              label="Amplitude"
              value={config.primaryOscillator.amplitude}
              onChange={(v) => setPrimaryOscillator({ amplitude: v })}
              min={0}
              max={300}
              step={1}
            />
            <CompactSlider
              label="Phase Multiplier"
              value={config.primaryOscillator.phaseMultiplier}
              onChange={(v) => setPrimaryOscillator({ phaseMultiplier: v })}
              min={0.5}
              max={10}
              step={0.1}
            />
          </div>
        </TabsContent>
        <TabsContent value="secondary" className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <CompactSlider
              label="BPM"
              value={config.secondaryOscillator.bpm}
              onChange={(v) => setSecondaryOscillator({ bpm: v })}
              min={0.1}
              max={200}
              step={0.1}
            />
            <CompactSlider
              label="Amplitude"
              value={config.secondaryOscillator.amplitude}
              onChange={(v) => setSecondaryOscillator({ amplitude: v })}
              min={0}
              max={300}
              step={1}
            />
            <CompactSlider
              label="Phase Multiplier"
              value={config.secondaryOscillator.phaseMultiplier}
              onChange={(v) => setSecondaryOscillator({ phaseMultiplier: v })}
              min={0.5}
              max={10}
              step={0.1}
            />
          </div>
        </TabsContent>
        <TabsContent value="bias" className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <CompactSlider
              label="Position"
              value={config.bias.position * 100}
              onChange={(v) => setBias({ position: v / 100 })}
              min={0}
              max={100}
              step={1}
              unit="%"
            />
            <CompactSlider
              label="Amplitude"
              value={config.bias.amplitude}
              onChange={(v) => setBias({ amplitude: v })}
              min={0}
              max={300}
              step={1}
            />
            <CompactSlider
              label="Spread"
              value={config.bias.spread * 100}
              onChange={(v) => setBias({ spread: v / 100 })}
              min={1}
              max={100}
              step={1}
              unit="%"
            />
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <Label>Debug Mode</Label>
                <Switch checked={config.debug} onCheckedChange={setDebug} />
              </div>
            </div>
            <CompactSlider
              label="Base Height"
              value={baseHeight}
              onChange={setBaseHeight}
              min={0}
              max={200}
              step={1}
              unit="px"
            />
            <CompactSlider label="Roundness" value={roundness} onChange={setRoundness} min={0} max={10} step={0.1} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
