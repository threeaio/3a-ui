'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { DEFAULT_STRIPE_CONFIG } from './constants'
import type { OscillatorConfig, BiasConfig } from './types'

type RequiredConfig = {
  className: string
  stripeCount: number
  vanishingPointX: number
  stripeWidth: number
  gapWidth: number
  verticalDistance: number
  debug: boolean
  baseHeight: number
  offsetFromBottom: number
  primaryOscillator: OscillatorConfig
  secondaryOscillator: OscillatorConfig
  bias: BiasConfig
  controlPointDistanceFromHorizon: number
  intermediatePointDistanceFromHorizon: number
  roundness: number
}

type ThreeStripesContextValue = {
  config: RequiredConfig
  setStripeCount: (value: number) => void
  setVanishingPointX: (value: number) => void
  setStripeWidth: (value: number) => void
  setGapWidth: (value: number) => void
  setVerticalDistance: (value: number) => void
  setDebug: (value: boolean) => void
  setBaseHeight: (value: number) => void
  setOffsetFromBottom: (value: number) => void
  setPrimaryOscillator: (value: Partial<OscillatorConfig>) => void
  setSecondaryOscillator: (value: Partial<OscillatorConfig>) => void
  setBias: (value: Partial<BiasConfig>) => void
  setControlPointDistanceFromHorizon: (value: number) => void
  setIntermediatePointDistanceFromHorizon: (value: number) => void
  setRoundness: (value: number) => void
  resetToDefaults: () => void
}

const ThreeStripesContext = createContext<ThreeStripesContextValue | null>(null)

export function ThreeStripesProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<RequiredConfig>({
    ...DEFAULT_STRIPE_CONFIG,
    className: '',
  } as RequiredConfig)

  const setStripeCount = (value: number) => setConfig((prev) => ({ ...prev, stripeCount: value }))

  const setVanishingPointX = (value: number) => setConfig((prev) => ({ ...prev, vanishingPointX: value }))

  const setStripeWidth = (value: number) => setConfig((prev) => ({ ...prev, stripeWidth: value }))

  const setGapWidth = (value: number) => setConfig((prev) => ({ ...prev, gapWidth: value }))

  const setVerticalDistance = (value: number) => setConfig((prev) => ({ ...prev, verticalDistance: value }))

  const setDebug = (value: boolean) => setConfig((prev) => ({ ...prev, debug: value }))

  const setBaseHeight = (value: number) => setConfig((prev) => ({ ...prev, baseHeight: value }))

  const setOffsetFromBottom = (value: number) => setConfig((prev) => ({ ...prev, offsetFromBottom: value }))

  const setPrimaryOscillator = (value: Partial<OscillatorConfig>) =>
    setConfig((prev) => ({
      ...prev,
      primaryOscillator: {
        ...prev.primaryOscillator,
        ...value,
      } as OscillatorConfig,
    }))

  const setSecondaryOscillator = (value: Partial<OscillatorConfig>) =>
    setConfig((prev) => ({
      ...prev,
      secondaryOscillator: {
        ...prev.secondaryOscillator,
        ...value,
      } as OscillatorConfig,
    }))

  const setBias = (value: Partial<BiasConfig>) =>
    setConfig((prev) => ({
      ...prev,
      bias: {
        ...prev.bias,
        ...value,
      } as BiasConfig,
    }))

  const setControlPointDistanceFromHorizon = (value: number) =>
    setConfig((prev) => ({ ...prev, controlPointDistanceFromHorizon: value }))

  const setIntermediatePointDistanceFromHorizon = (value: number) =>
    setConfig((prev) => ({ ...prev, intermediatePointDistanceFromHorizon: value }))

  const setRoundness = (value: number) => setConfig((prev) => ({ ...prev, roundness: value }))

  const resetToDefaults = () => setConfig({ ...DEFAULT_STRIPE_CONFIG, className: '' } as RequiredConfig)

  return (
    <ThreeStripesContext.Provider
      value={{
        config,
        setStripeCount,
        setVanishingPointX,
        setStripeWidth,
        setGapWidth,
        setVerticalDistance,
        setDebug,
        setBaseHeight,
        setOffsetFromBottom,
        setPrimaryOscillator,
        setSecondaryOscillator,
        setBias,
        setControlPointDistanceFromHorizon,
        setIntermediatePointDistanceFromHorizon,
        setRoundness,
        resetToDefaults,
      }}
    >
      {children}
    </ThreeStripesContext.Provider>
  )
}

export function useThreeStripes() {
  const context = useContext(ThreeStripesContext)
  if (!context) {
    throw new Error('useThreeStripes must be used within a ThreeStripesProvider')
  }
  return context
}
