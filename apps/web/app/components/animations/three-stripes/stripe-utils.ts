import { createSimple2D, lerpPoints } from '@threeaio/utils/geom'
import { ControlPoint, StripeLine, StripeSection, Point2D } from './types'

export function createControlPoint(x: number, y: number, influence = 1): ControlPoint {
  return { ...createSimple2D(x, y), influence }
}

export function createStripeLine(
  start: Point2D,
  end: Point2D,
  startControl?: ControlPoint,
  endControl?: ControlPoint,
): StripeLine {
  return { start, end, startControl, endControl }
}

export function createStripeSection(
  leftStart: Point2D,
  leftEnd: Point2D,
  width: number,
  leftStartControl?: ControlPoint,
  leftEndControl?: ControlPoint,
): StripeSection {
  const leftLine = createStripeLine(leftStart, leftEnd, leftStartControl, leftEndControl)
  
  // Calculate right line points by offsetting left line by width
  const rightStart = createSimple2D(leftStart.x + width, leftStart.y)
  const rightEnd = createSimple2D(leftEnd.x + width, leftEnd.y)
  
  // Offset control points if they exist
  const rightStartControl = leftStartControl 
    ? createControlPoint(leftStartControl.x + width, leftStartControl.y, leftStartControl.influence)
    : undefined
  const rightEndControl = leftEndControl
    ? createControlPoint(leftEndControl.x + width, leftEndControl.y, leftEndControl.influence)
    : undefined

  const rightLine = createStripeLine(rightStart, rightEnd, rightStartControl, rightEndControl)

  return { leftLine, rightLine, width }
}

export function drawStripeLine(ctx: CanvasRenderingContext2D, line: StripeLine) {
  if (line.startControl && line.endControl) {
    ctx.bezierCurveTo(
      line.startControl.x,
      line.startControl.y,
      line.endControl.x,
      line.endControl.y,
      line.end.x,
      line.end.y,
    )
  } else {
    ctx.lineTo(line.end.x, line.end.y)
  }
}

export function drawStripeSection(ctx: CanvasRenderingContext2D, section: StripeSection) {
  ctx.beginPath()
  ctx.moveTo(section.leftLine.start.x, section.leftLine.start.y)
  drawStripeLine(ctx, section.leftLine)
  drawStripeLine(ctx, section.rightLine)
  ctx.lineTo(section.leftLine.start.x, section.leftLine.start.y)
  ctx.stroke()
} 