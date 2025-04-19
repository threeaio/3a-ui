import { sine } from '@threeaio/utils/animation'

export const DEFAULT_STRIPE_CONFIG = {
  stripeCount: 170,
  vanishingPointX: 0.5,
  stripeWidth: 10,
  gapWidth: 3,
  verticalDistance: 60,
  debug: false,
  baseHeight: 60,
  offsetFromBottom: 0,
  primaryOscillator: {
    bpm: 7.5 / 3,
    amplitude: 140,
    waveform: sine,
  },
  secondaryOscillator: {
    bpm: 7.5 / 1.2,
    amplitude: 160,
    waveform: sine,
  },
  bias: {
    position: 0.8,
    amplitude: 120,
    spread: 0.2,
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