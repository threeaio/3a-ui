import { CANVAS_STYLES } from './constants'
import { StripePoints } from './types'

export const drawDebugPoints = (ctx: CanvasRenderingContext2D, points: StripePoints): void => {
  // Draw control points and their connections
  ctx.fillStyle = CANVAS_STYLES.debugControlPointFill
  ctx.strokeStyle = CANVAS_STYLES.debugControlPointStroke

  // Left curve control points and intermediate point
  ctx.beginPath()
  ctx.arc(points.leftControl.x, points.leftControl.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.arc(points.leftTopControl.x, points.leftTopControl.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.arc(points.leftIntermediate.x, points.leftIntermediate.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.fill()

  // Right curve control points and intermediate point
  ctx.beginPath()
  ctx.arc(points.rightControl.x, points.rightControl.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.arc(points.rightTopControl.x, points.rightTopControl.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.arc(points.rightIntermediate.x, points.rightIntermediate.y, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.fill()

  // Draw lines connecting all points
  ctx.beginPath()
  ctx.moveTo(points.leftFloor.x, points.leftFloor.y)
  ctx.lineTo(points.leftControl.x, points.leftControl.y)
  ctx.moveTo(points.leftTop.x, points.leftTop.y)
  ctx.lineTo(points.leftIntermediate.x, points.leftIntermediate.y)
  ctx.lineTo(points.leftTopControl.x, points.leftTopControl.y)
  ctx.moveTo(points.rightFloor.x, points.rightFloor.y)
  ctx.lineTo(points.rightControl.x, points.rightControl.y)
  ctx.moveTo(points.rightTop.x, points.rightTop.y)
  ctx.lineTo(points.rightIntermediate.x, points.rightIntermediate.y)
  ctx.lineTo(points.rightTopControl.x, points.rightTopControl.y)
  ctx.stroke()
}

export const drawDebugHorizon = (
  ctx: CanvasRenderingContext2D,
  width: number,
  horizonY: number,
  vanishingX: number,
): void => {
  // Draw horizon line
  ctx.beginPath()
  ctx.strokeStyle = CANVAS_STYLES.debugStroke
  ctx.setLineDash(CANVAS_STYLES.debugDashPattern)
  ctx.moveTo(0, horizonY)
  ctx.lineTo(width, horizonY)
  ctx.stroke()
  ctx.setLineDash([])

  // Draw vanishing point
  ctx.beginPath()
  ctx.fillStyle = CANVAS_STYLES.debugFill
  ctx.arc(vanishingX, horizonY, CANVAS_STYLES.debugPointRadius, 0, Math.PI * 2)
  ctx.fill()
} 