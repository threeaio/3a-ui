'use client'

import { useRef, useEffect } from 'react'
import { oscillator } from '@threeaio/oscillator'
import { circular, noise, pulse, sawtooth, sine } from '@threeaio/utils/animation'

interface ThreeStripesProps {
  className?: string
  stripeCount?: number
  vanishingPointX?: number // 0-1 relative position
  stripeWidth?: number // width of each stripe
  gapWidth?: number // width of gap between stripes
  verticalDistance?: number // distance between top and bottom points
  debug?: boolean // Add debug prop
  baseHeight?: number
  depthOffset?: number // configurable value from depth section (in pixels)
  bpm?: number
  animationAmplitude?: number
  waveform?: (x: number) => number
  // Second oscillator props
  secondaryBpm?: number
  secondaryAmplitude?: number
  secondaryWaveform?: (x: number) => number
  // Bias effect props
  bias?: number // Position of the bias peak (0-1), default 0.5
  biasAmplitude?: number // Amplitude of the bias effect
  biasSpread?: number // Controls how quickly the effect falls off (like standard deviation in Gaussian)
  // Curve control configuration
  controlPointDistanceFromHorizon?: number // How far above horizon the bezier control points are (in pixels)
  intermediatePointDistanceFromHorizon?: number // How far above horizon the intermediate points are (in pixels)
  controlPointOffsetFromCorner?: number // Minimum distance control points stay below corners (in pixels)
  intermediatePointOffsetFromCorner?: number // Minimum distance intermediate points stay below corners (in pixels)
  perspectiveFactor?: number // How much the rounding is applied to the control points (in pixels)
}

export function ThreeStripes({
  stripeCount = 50,
  vanishingPointX = 0.5,
  stripeWidth = 20,
  gapWidth = 20,
  verticalDistance = 160,
  debug = false,
  baseHeight = 20,
  depthOffset = 0,
  bpm = 7.5,
  animationAmplitude = 120,
  waveform = sine,
  // Second oscillator defaults
  secondaryBpm = 7.5 / 4,
  secondaryAmplitude = 200,
  secondaryWaveform = sine,
  // Bias effect defaults
  bias = 0.9,
  biasAmplitude = 160,
  biasSpread = 0.15, // Controls how quickly the effect falls off
  // Curve control configuration defaults
  controlPointDistanceFromHorizon = 2, // Control points start 10px above horizon
  intermediatePointDistanceFromHorizon = 100, // Intermediate points start 50px above horizon
  controlPointOffsetFromCorner = 0, // TODO: Control points stay 40px above corners
  intermediatePointOffsetFromCorner = 0, // Intermediate points stay 20px above corners
  perspectiveFactor = 0.7,
}: ThreeStripesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Create an array to store heights for each stripe
  const animatedHeightsRef = useRef<number[]>(new Array(stripeCount).fill(baseHeight))
  const requestAnimationFrameRef = useRef<number>(0)

  // Animation effect
  useEffect(() => {
    // Helper function to calculate Gaussian-like falloff
    const calculateBiasEffect = (position: number, bias: number, spread: number) => {
      // Convert position to range -1 to 1 for easier calculation
      const normalizedPos = position - bias
      // Calculate Gaussian-like falloff (simplified for performance)
      return Math.exp(-(normalizedPos * normalizedPos) / (2 * spread * spread))
    }

    const animate = () => {
      const currentTime = Date.now()

      // Update height for each stripe with phase offset based on index
      for (let i = 0; i < stripeCount; i++) {
        const phaseShift = (i / stripeCount) * Math.PI * 2 // Distribute phase shifts across 2π

        // Calculate relative position for bias effect (0 to 1)
        const relativePosition = i / (stripeCount - 1)
        // Calculate bias multiplier (0 to 1)
        const biasEffect = calculateBiasEffect(relativePosition, bias, biasSpread)

        // Primary oscillator
        const primaryOscillatorValue = oscillator({
          currentTimeMs: currentTime,
          bpm,
          waveformfun: waveform,
          phaseShift,
        })

        // Secondary oscillator
        const secondaryOscillatorValue = oscillator({
          currentTimeMs: currentTime,
          bpm: secondaryBpm,
          waveformfun: secondaryWaveform,
          phaseShift: phaseShift + 0.33,
        })

        // Combine oscillators and bias effect
        const combinedHeight =
          baseHeight +
          // Oscillator effects
          primaryOscillatorValue * animationAmplitude +
          secondaryOscillatorValue * secondaryAmplitude +
          // Bias effect - adds extra height based on position
          biasEffect * biasAmplitude

        animatedHeightsRef.current[i] = combinedHeight
      }

      // Force redraw
      if (canvasRef.current) {
        const event = new Event('resize')
        window.dispatchEvent(event)
      }

      requestAnimationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current)
      }
    }
  }, [
    bpm,
    secondaryBpm,
    baseHeight,
    animationAmplitude,
    secondaryAmplitude,
    stripeCount,
    waveform,
    secondaryWaveform,
    bias,
    biasAmplitude,
    biasSpread,
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container with retina support
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1

      // Get display size
      const displayWidth = container.clientWidth
      const displayHeight = container.clientHeight

      // Set canvas size for retina display
      canvas.width = Math.round(displayWidth * dpr)
      canvas.height = Math.round(displayHeight * dpr)

      // Set display size (CSS pixels)
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`

      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Drawing function
    const draw = () => {
      const { width, height } = canvas
      const dpr = window.devicePixelRatio || 1

      // Clear canvas - use display dimensions
      ctx.clearRect(0, 0, width / dpr, height / dpr)

      // Calculate horizon y-position using display dimensions
      const horizonY = height / dpr / 2

      // Calculate vanishing point x-position using display dimensions
      const vpX = (width / dpr) * vanishingPointX

      // Calculate middle x-position using display dimensions
      const centerX = width / dpr / 2

      // NEW: compute extension factor from depth if depthOffset is provided
      const displayHeight = height / dpr
      const computedDepthExtensionFactor =
        depthOffset !== undefined ? Math.max(1, (displayHeight - depthOffset) / verticalDistance) : 2

      // Draw debug horizon line if debug mode is on
      if (debug) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'
        ctx.setLineDash([5, 5])
        ctx.moveTo(0, horizonY)
        ctx.lineTo(width, horizonY)
        ctx.stroke()
        ctx.setLineDash([])

        // Draw vanishing point
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.arc(vpX, horizonY, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw stripes
      for (let i = 0; i < stripeCount; i++) {
        const currentHeight = animatedHeightsRef.current[i] as number

        // Calculate the starting X position for each stripe
        const totalUnitWidth = stripeWidth + gapWidth
        const totalWidth = stripeCount * stripeWidth + (stripeCount - 1) * gapWidth
        const startX = centerX - totalWidth / 2 + i * totalUnitWidth

        // Calculate points using currentHeight instead of animatedHeightRef.current
        const leftTopX = startX
        const leftTopY = horizonY - verticalDistance / 2 - currentHeight

        const rightTopX = startX + stripeWidth
        const rightTopY = horizonY - verticalDistance / 2 - currentHeight

        // Calculate depth points with perspective

        const leftDepthX = vpX + (leftTopX - vpX) * (1 + perspectiveFactor)
        const leftDepthY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)
        const rightDepthX = vpX + (rightTopX - vpX) * (1 + perspectiveFactor)
        const rightDepthY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)

        // Calculate control points for curves
        const leftDepthControlX = vpX + (leftTopX - vpX)
        const leftDepthControlY = horizonY + verticalDistance / 2
        const rightDepthControlX = vpX + (rightTopX - vpX)
        const rightDepthControlY = horizonY + verticalDistance / 2

        // Control points and intermediate points for smoother transition
        const fixedIntermediateDistanceFromHorizon = intermediatePointDistanceFromHorizon
        const fixedControlDistanceFromHorizon = controlPointDistanceFromHorizon
        const leftTopControlX = leftTopX
        const rightTopControlX = rightTopX

        // Calculate control point Y positions
        const leftTopControlY = Math.max(
          horizonY - fixedControlDistanceFromHorizon,
          leftTopY - controlPointOffsetFromCorner,
        )
        const rightTopControlY = Math.max(
          horizonY - fixedControlDistanceFromHorizon,
          rightTopY - controlPointOffsetFromCorner,
        )

        // Calculate intermediate points between control points and corners
        const leftIntermediateY = Math.max(
          horizonY - fixedIntermediateDistanceFromHorizon,
          leftTopY - intermediatePointOffsetFromCorner,
        )
        const rightIntermediateY = Math.max(
          horizonY - fixedIntermediateDistanceFromHorizon,
          rightTopY - intermediatePointOffsetFromCorner,
        )

        const leftExtendedDepthX = vpX + (leftDepthX - vpX) * computedDepthExtensionFactor
        const leftExtendedDepthY = horizonY + (leftDepthY - horizonY) * computedDepthExtensionFactor
        const rightExtendedDepthX = vpX + (rightDepthX - vpX) * computedDepthExtensionFactor
        const rightExtendedDepthY = horizonY + (rightDepthY - horizonY) * computedDepthExtensionFactor

        if (debug) {
          // Draw control points and their connections
          ctx.fillStyle = 'blue'
          ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'

          // Left curve control points and intermediate point
          ctx.beginPath()
          ctx.arc(leftDepthControlX, leftDepthControlY, 4, 0, Math.PI * 2)
          ctx.arc(leftTopControlX, leftTopControlY, 4, 0, Math.PI * 2)
          ctx.arc(leftTopX, leftIntermediateY, 4, 0, Math.PI * 2) // Debug intermediate point
          ctx.fill()

          // Right curve control points and intermediate point
          ctx.beginPath()
          ctx.arc(rightDepthControlX, rightDepthControlY, 4, 0, Math.PI * 2)
          ctx.arc(rightTopControlX, rightTopControlY, 4, 0, Math.PI * 2)
          ctx.arc(rightTopX, rightIntermediateY, 4, 0, Math.PI * 2) // Debug intermediate point
          ctx.fill()

          // Draw lines connecting all points
          ctx.beginPath()
          ctx.moveTo(leftDepthX, leftDepthY)
          ctx.lineTo(leftDepthControlX, leftDepthControlY)
          ctx.moveTo(leftTopX, leftTopY)
          ctx.lineTo(leftTopX, leftIntermediateY)
          ctx.lineTo(leftTopControlX, leftTopControlY)
          ctx.moveTo(rightDepthX, rightDepthY)
          ctx.lineTo(rightDepthControlX, rightDepthControlY)
          ctx.moveTo(rightTopX, rightTopY)
          ctx.lineTo(rightTopX, rightIntermediateY)
          ctx.lineTo(rightTopControlX, rightTopControlY)
          ctx.stroke()
        }

        // Reset styles for stripe drawing
        ctx.strokeStyle = '#44485b'
        ctx.lineWidth = 1

        // Draw the complete stripe with extended connections
        ctx.beginPath()

        // Start from left extended depth
        ctx.moveTo(leftExtendedDepthX, leftExtendedDepthY)

        // Draw to left depth point
        ctx.lineTo(leftDepthX, leftDepthY)

        // Draw left curve starting from a fixed point above horizon
        ctx.bezierCurveTo(
          leftDepthControlX,
          leftDepthControlY,
          leftTopControlX,
          leftTopControlY,
          leftTopX,
          leftIntermediateY,
        )

        // Draw straight line to corner
        ctx.lineTo(leftTopX, leftTopY)

        // Draw straight section to the top
        ctx.lineTo(leftTopX, leftTopY)

        // Draw straight line at the top
        ctx.lineTo(rightTopX, rightTopY)

        // Draw straight section down to corner
        ctx.lineTo(rightTopX, rightTopY)

        // Draw straight line to intermediate point
        ctx.lineTo(rightTopX, rightIntermediateY)

        // Draw right curve
        ctx.bezierCurveTo(
          rightTopControlX,
          rightTopControlY,
          rightDepthControlX,
          rightDepthControlY,
          rightDepthX,
          rightDepthY,
        )

        // Draw to right extended depth
        ctx.lineTo(rightExtendedDepthX, rightExtendedDepthY)

        // Connect back to left extended depth
        ctx.lineTo(leftExtendedDepthX, leftExtendedDepthY)

        ctx.stroke()
      }
    }

    // Initial draw
    draw()

    // Handle resize
    window.addEventListener('resize', draw)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', draw)
    }
  }, [
    stripeCount,
    vanishingPointX,
    stripeWidth,
    gapWidth,
    verticalDistance,
    debug,
    depthOffset,
    bias,
    biasAmplitude,
    biasSpread,
    controlPointDistanceFromHorizon,
    intermediatePointDistanceFromHorizon,
    controlPointOffsetFromCorner,
    intermediatePointOffsetFromCorner,
    perspectiveFactor,
  ])

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-black to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
