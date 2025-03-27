import { sine } from '@threeaio/utils/animation'

export const DEFAULT_STRIPE_CONFIG = {
  stripeCount: 20,
  vanishingPointX: 0.5,
  stripeWidth: 20,
  gapWidth: 20,
  verticalDistance: 260,
  debug: false,
  baseHeight: -20,
  offsetFromBottom: 0,
  primaryOscillator: {
    bpm: 7.5 / 1.2,
    amplitude: 160,
    waveform: sine,
  },
  secondaryOscillator: {
    bpm: 7.5 / 4,
    amplitude: 100,
    waveform: sine,
  },
  bias: {
    position: 0.8,
    amplitude: 220,
    spread: 0.15,
  },
  // Curve control configuration defaults
  controlPointDistanceFromHorizon: 2,
  intermediatePointDistanceFromHorizon: 100,
  roundness: 0.7,
} as const

export const CANVAS_STYLES = {
  stroke: '#44485b',
  lineWidth: 1,
  debugStroke: 'rgba(255, 0, 0, 0.5)',
  debugFill: 'red',
  debugControlPointFill: 'blue',
  debugControlPointStroke: 'rgba(0, 0, 255, 0.3)',
  debugPointRadius: 4,
  debugDashPattern: [5, 5],
} as const 