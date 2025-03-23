'use client'
import React from 'react'
import { Slider } from '@3a.solutions/ui/slider'
import { Button } from '@3a.solutions/ui/button'
import { Label } from '@3a.solutions/ui/forms'
import { Switch } from '@3a.solutions/ui/switch'
import { Volume2, VolumeX } from 'lucide-react'
import { StyleguideRender } from '@/ui/styleguide-render'

export const BasicSliderExample: React.FC = () => {
  const [volume, setVolume] = React.useState<number>(50)
  const [muted, setMuted] = React.useState<boolean>(false)

  return (
    <StyleguideRender label="Basic Slider Eaxample">
      <div className="flex items-center gap-5">
        <Button size="icon" variant="ghost" onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <VolumeX strokeWidth={1.5} className="text-muted-foreground size-6" />
          ) : (
            <Volume2 strokeWidth={1.5} className="size-6" />
          )}
        </Button>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center justify-between">
            <Label htmlFor="volume-slider" className="text-sm">
              Volume
            </Label>
            <span className="text-sm font-mono">{volume}%</span>
          </div>
          <Slider
            id="volume-slider"
            defaultValue={[volume]}
            onValueChange={(values) => setVolume(values[0] ?? 0)}
            disabled={muted}
            aria-disabled={muted}
          />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="auto-mute" className="cursor-pointer text-sm">
            Auto-mute
          </Label>
          <Switch id="auto-mute" checked={muted} onCheckedChange={setMuted} />
        </div>
      </div>
    </StyleguideRender>
  )
}
