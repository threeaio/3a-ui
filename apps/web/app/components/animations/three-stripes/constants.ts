import { sine } from '@threeaio/utils/animation'

export const DEFAULT_STRIPE_CONFIG = {
  stripeCount: 140,
  vanishingPointX: 0.5,
  stripeWidth: 10,
  gapWidth: 4,
  verticalDistance: 60,
  debug: false,
  baseHeight: 60,
  offsetFromBottom: 0,
  primaryOscillator: {
    bpm: 7.5 / 3,
    amplitude: 150,
    waveform: sine,
    phaseMultiplier: 1,
  },
  secondaryOscillator: {
    bpm: 12,
    amplitude: 40,
    waveform: sine,
    phaseMultiplier: 2.2,
  },
  bias: {
    position: 0.8,
    amplitude: 180,
    spread: 0.1,
  },
  // Curve control configuration defaults
  controlPointDistanceFromHorizon: 0,
  intermediatePointDistanceFromHorizon: 200,
  roundness: 5.7,
} as const

export const CANVAS_STYLES = {
  strokeLight: 'oklch(0.4 0.15 215)',//'rgba(40,60,85,0)',
  strokeDark: 'oklch(0.25 0.3 183)',
  lineWidthLight: 0.4,
  lineWidthDark: 1,
  fillLight: 'transparent',
  fillDark: 'transparent',
  debugStroke: 'rgba(255, 0, 0, 0.5)',
  debugFill: 'red',
  debugControlPointFill: 'blue',
  debugControlPointStroke: 'rgba(0, 0, 255, 0.3)',
  debugPointRadius: 4,
  debugDashPattern: [5, 5],
} as const 