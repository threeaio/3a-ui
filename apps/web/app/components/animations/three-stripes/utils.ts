import { oscillator } from '@threeaio/oscillator'
import { Point, StripePoints, OscillatorConfig, BiasConfig } from './types'

export const calculateBiasEffect = (position: number, bias: number, spread: number): number => {
  const normalizedPos = position - bias
  return Math.exp(-(normalizedPos * normalizedPos) / (2 * spread * spread))
}

export const calculateStripeHeight = (
  index: number,
  stripeCount: number,
  currentTime: number,
  baseHeight: number,
  primaryOscillator: OscillatorConfig,
  secondaryOscillator: OscillatorConfig,
  bias: BiasConfig,
): number => {
  const phaseShift = (index / stripeCount) * Math.PI * 2
  const relativePosition = index / (stripeCount - 1)
  const biasEffect = calculateBiasEffect(relativePosition, bias.position, bias.spread)

  const primaryOscillatorValue = oscillator({
    currentTimeMs: currentTime,
    bpm: primaryOscillator.bpm,
    waveformfun: primaryOscillator.waveform,
    phaseShift,
  })

  const secondaryOscillatorValue = oscillator({
    currentTimeMs: currentTime,
    bpm: secondaryOscillator.bpm,
    waveformfun: secondaryOscillator.waveform,
    phaseShift: phaseShift + 0.33,
  })

  return (
    baseHeight +
    primaryOscillatorValue * primaryOscillator.amplitude +
    secondaryOscillatorValue * secondaryOscillator.amplitude +
    biasEffect * bias.amplitude
  )
}

export const calculateStripePoints = (
  startX: number,
  stripeWidth: number,
  horizonY: number,
  vanishingX: number,
  verticalDistance: number,
  currentHeight: number,
  roundness: number,
  controlPointDistanceFromHorizon: number,
  intermediatePointDistanceFromHorizon: number,
  computedDepthExtensionFactor: number,
): StripePoints => {
  const leftTopLineX = startX
  const leftTopLineY = horizonY - verticalDistance / 2 - currentHeight

  const rightTopLineX = startX + stripeWidth
  const rightTopLineY = horizonY - verticalDistance / 2 - currentHeight

  const leftFloorLineX = vanishingX + (leftTopLineX - vanishingX) * (1 + roundness)
  const leftFloorLineY = horizonY + (verticalDistance / 2) * (1 + roundness)
  const rightFloorLineX = vanishingX + (rightTopLineX - vanishingX) * (1 + roundness)
  const rightFloorLineY = horizonY + (verticalDistance / 2) * (1 + roundness)

  const leftFloorLineControlX = vanishingX + (leftTopLineX - vanishingX)
  const leftFloorLineControlY = horizonY + verticalDistance / 2
  const rightFloorLineControlX = vanishingX + (rightTopLineX - vanishingX)
  const rightFloorLineControlY = horizonY + verticalDistance / 2

  const leftTopLineControlX = leftTopLineX
  const rightTopLineControlX = rightTopLineX

  const leftTopLineControlY = Math.max(
    horizonY - controlPointDistanceFromHorizon,
    leftTopLineY,
  )
  const rightTopLineControlY = Math.max(
    horizonY - controlPointDistanceFromHorizon,
    rightTopLineY,
  )

  const leftIntermediateY = Math.max(
    horizonY - intermediatePointDistanceFromHorizon,
    leftTopLineY,
  )
  const rightIntermediateY = Math.max(
    horizonY - intermediatePointDistanceFromHorizon,
    rightTopLineY,
  )

  const leftExtendedFloorLineX = vanishingX + (leftFloorLineX - vanishingX) * computedDepthExtensionFactor
  const leftExtendedFloorLineY = horizonY + (leftFloorLineY - horizonY) * computedDepthExtensionFactor
  const rightExtendedFloorLineX = vanishingX + (rightFloorLineX - vanishingX) * computedDepthExtensionFactor
  const rightExtendedFloorLineY = horizonY + (rightFloorLineY - horizonY) * computedDepthExtensionFactor

  return {
    leftTop: { x: leftTopLineX, y: leftTopLineY },
    rightTop: { x: rightTopLineX, y: rightTopLineY },
    leftFloor: { x: leftFloorLineX, y: leftFloorLineY },
    rightFloor: { x: rightFloorLineX, y: rightFloorLineY },
    leftExtendedFloor: { x: leftExtendedFloorLineX, y: leftExtendedFloorLineY },
    rightExtendedFloor: { x: rightExtendedFloorLineX, y: rightExtendedFloorLineY },
    leftControl: { x: leftFloorLineControlX, y: leftFloorLineControlY },
    rightControl: { x: rightFloorLineControlX, y: rightFloorLineControlY },
    leftTopControl: { x: leftTopLineControlX, y: leftTopLineControlY },
    rightTopControl: { x: rightTopLineControlX, y: rightTopLineControlY },
    leftIntermediate: { x: leftTopLineX, y: leftIntermediateY },
    rightIntermediate: { x: rightTopLineX, y: rightIntermediateY },
  }
}

export const drawStripe = (ctx: CanvasRenderingContext2D, points: StripePoints): void => {
  ctx.beginPath()
  ctx.moveTo(points.leftExtendedFloor.x, points.leftExtendedFloor.y)
  ctx.lineTo(points.leftFloor.x, points.leftFloor.y)
  ctx.bezierCurveTo(
    points.leftControl.x,
    points.leftControl.y,
    points.leftTopControl.x,
    points.leftTopControl.y,
    points.leftIntermediate.x,
    points.leftIntermediate.y,
  )
  ctx.lineTo(points.leftTop.x, points.leftTop.y)
  ctx.lineTo(points.rightTop.x, points.rightTop.y)
  ctx.lineTo(points.rightIntermediate.x, points.rightIntermediate.y)
  ctx.bezierCurveTo(
    points.rightTopControl.x,
    points.rightTopControl.y,
    points.rightControl.x,
    points.rightControl.y,
    points.rightFloor.x,
    points.rightFloor.y,
  )
  ctx.lineTo(points.rightExtendedFloor.x, points.rightExtendedFloor.y)
  ctx.lineTo(points.leftExtendedFloor.x, points.leftExtendedFloor.y)
  ctx.stroke()
} 