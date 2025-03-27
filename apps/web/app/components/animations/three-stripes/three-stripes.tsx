'use client'

import { useRef, useEffect } from 'react'
import { ThreeStripesProps } from './types'
import { DEFAULT_STRIPE_CONFIG, CANVAS_STYLES } from './constants'
import { calculateStripeHeight, calculateStripePoints, drawStripe } from './utils'
import { drawDebugPoints, drawDebugHorizon } from './debug-utils'

export function ThreeStripes({
  stripeCount = DEFAULT_STRIPE_CONFIG.stripeCount,
  vanishingPointX = DEFAULT_STRIPE_CONFIG.vanishingPointX,
  stripeWidth = DEFAULT_STRIPE_CONFIG.stripeWidth,
  gapWidth = DEFAULT_STRIPE_CONFIG.gapWidth,
  verticalDistance = DEFAULT_STRIPE_CONFIG.verticalDistance,
  debug = DEFAULT_STRIPE_CONFIG.debug,
  baseHeight = DEFAULT_STRIPE_CONFIG.baseHeight,
  offsetFromBottom = DEFAULT_STRIPE_CONFIG.offsetFromBottom,
  primaryOscillator = DEFAULT_STRIPE_CONFIG.primaryOscillator,
  secondaryOscillator = DEFAULT_STRIPE_CONFIG.secondaryOscillator,
  bias = DEFAULT_STRIPE_CONFIG.bias,
  controlPointDistanceFromHorizon = DEFAULT_STRIPE_CONFIG.controlPointDistanceFromHorizon,
  intermediatePointDistanceFromHorizon = DEFAULT_STRIPE_CONFIG.intermediatePointDistanceFromHorizon,
  roundness = DEFAULT_STRIPE_CONFIG.roundness,
}: ThreeStripesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animatedHeightsRef = useRef<number[]>(new Array(stripeCount).fill(baseHeight))
  const requestAnimationFrameRef = useRef<number>(0)

  // Animation effect
  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now()

      // Update height for each stripe
      for (let i = 0; i < stripeCount; i++) {
        animatedHeightsRef.current[i] = calculateStripeHeight(
          i,
          stripeCount,
          currentTime,
          baseHeight,
          primaryOscillator,
          secondaryOscillator,
          bias,
        )
      }

      // Force redraw
      if (canvasRef.current) {
        window.dispatchEvent(new Event('resize'))
      }

      requestAnimationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current)
      }
    }
  }, [primaryOscillator, secondaryOscillator, baseHeight, stripeCount, bias])

  // Canvas setup and drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      const dpr = window.devicePixelRatio || 1
      const displayWidth = container.clientWidth
      const displayHeight = container.clientHeight

      canvas.width = Math.round(displayWidth * dpr)
      canvas.height = Math.round(displayHeight * dpr)
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const { width, height } = canvas
      const dpr = window.devicePixelRatio || 1
      const displayWidth = width / dpr
      const displayHeight = height / dpr

      // Clear canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight)

      // Calculate common values
      const horizonY = displayHeight / 2
      const vanishingX = displayWidth * vanishingPointX
      const centerX = displayWidth / 2
      const computedDepthExtensionFactor = Math.max(1, (displayHeight - offsetFromBottom) / verticalDistance)

      // Draw debug elements if needed
      if (debug) {
        drawDebugHorizon(ctx, displayWidth, horizonY, vanishingX)
      }

      // Set up stripe drawing style
      ctx.strokeStyle = CANVAS_STYLES.stroke
      ctx.lineWidth = CANVAS_STYLES.lineWidth

      // Draw stripes
      const totalUnitWidth = stripeWidth + gapWidth
      const totalWidth = stripeCount * stripeWidth + (stripeCount - 1) * gapWidth

      for (let i = 0; i < stripeCount; i++) {
        const startX = centerX - totalWidth / 2 + i * totalUnitWidth
        const currentHeight = animatedHeightsRef.current[i] || 0

        const points = calculateStripePoints(
          startX,
          stripeWidth,
          horizonY,
          vanishingX,
          verticalDistance,
          currentHeight,
          roundness,
          controlPointDistanceFromHorizon,
          intermediatePointDistanceFromHorizon,
          computedDepthExtensionFactor,
        )

        drawStripe(ctx, points)

        if (debug) {
          drawDebugPoints(ctx, points)
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('resize', draw)

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
    offsetFromBottom,
    bias,
    controlPointDistanceFromHorizon,
    intermediatePointDistanceFromHorizon,
    roundness,
  ])

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
