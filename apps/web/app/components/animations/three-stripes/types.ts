import { Simple2D } from "@threeaio/utils/types"

export type Point2D = Simple2D

export interface ControlPoint extends Simple2D {
  influence?: number // How much this control point influences the curve (0-1)
}

export interface StripeLine {
  start: Point2D
  end: Point2D
  startControl?: ControlPoint
  endControl?: ControlPoint
}

export interface StripeSection {
  leftLine: StripeLine
  rightLine: StripeLine
  width: number
}

export interface StripeSegment {
  top: StripeSection
  depth: StripeSection
  bottom?: StripeSection // New section for bottom part
}

export interface OscillatorConfig {
  bpm: number
  amplitude: number
  waveform: (x: number) => number
}

export interface BiasConfig {
  position: number // Position of the bias peak (0-1), default 0.5
  amplitude: number // Amplitude of the bias effect
  spread: number // Controls how quickly the effect falls off
}

export interface ThreeStripesProps {
  className?: string
  stripeCount?: number
  vanishingPointX?: number // 0-1 relative position
  stripeWidth?: number // width of each stripe
  gapWidth?: number // width of gap between stripes
  verticalDistance?: number // distance between top and bottom points
  debug?: boolean // Add debug prop
  baseHeight?: number
  offsetFromBottom?: number // configurable value from depth section (in pixels)
  bpm?: number
  animationAmplitude?: number
  waveform?: (x: number) => number
  // Second oscillator props
  secondaryBpm?: number
  secondaryAmplitude?: number
  secondaryWaveform?: (x: number) => number
  // Bias effect props
  bias?: BiasConfig
  // Curve control configuration
  controlPointDistanceFromHorizon?: number // How far above horizon the bezier control points are (in pixels)
  intermediatePointDistanceFromHorizon?: number // How far above horizon the intermediate points are (in pixels)
  roundness?: number // How much the rounding is applied to the control points (in pixels)
  primaryOscillator?: OscillatorConfig
  secondaryOscillator?: OscillatorConfig
}

export interface Point {
  x: number
  y: number
}

export interface StripePoints {
  leftTop: Point
  rightTop: Point
  leftFloor: Point
  rightFloor: Point
  leftExtendedFloor: Point
  rightExtendedFloor: Point
  leftControl: Point
  rightControl: Point
  leftTopControl: Point
  rightTopControl: Point
  leftIntermediate: Point
  rightIntermediate: Point
}

export interface DebugPoints {
  ctx: CanvasRenderingContext2D
  leftFloorLineX: number
  leftFloorLineY: number
  leftFloorLineControlX: number
  leftFloorLineControlY: number
  leftTopLineControlX: number
  leftTopLineControlY: number
  leftTopLineX: number
  leftTopLineY: number
  leftIntermediateY: number
  rightFloorLineX: number
  rightFloorLineY: number
  rightFloorLineControlX: number
  rightFloorLineControlY: number
  rightTopLineControlX: number
  rightTopLineControlY: number
  rightTopLineX: number
  rightTopLineY: number
  rightIntermediateY: number
} 