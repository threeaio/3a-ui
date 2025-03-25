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