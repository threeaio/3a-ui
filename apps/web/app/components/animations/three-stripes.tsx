'use client'

import { cn } from '@3a.solutions/ui/lib/utils'
import { useRef, useEffect } from 'react'

interface ThreeStripesProps {
  className?: string
  stripeCount?: number
  vanishingPointX?: number // 0-1 relative position
  stripeWidth?: number // width of each stripe
  gapWidth?: number // width of gap between stripes
  verticalDistance?: number // distance between top and bottom points
  debug?: boolean // Add debug prop
  extraHeight?: number // extra height for the stripe
  depthOffset?: number // configurable value from depth section (in pixels)
}

export function ThreeStripes({
  className,
  stripeCount = 20,
  vanishingPointX = 0.5,
  stripeWidth = 20, // New default
  gapWidth = 5, // New default
  verticalDistance = 60,
  debug = false, // Add debug prop with default value
  extraHeight = 880,
  depthOffset = 0, // renamed from bottomOffset
}: ThreeStripesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        depthOffset !== undefined ? (displayHeight - depthOffset - horizonY) / verticalDistance : 2

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
        // Calculate the starting X position for each stripe
        const totalUnitWidth = stripeWidth + gapWidth
        const startX = centerX + (i - (stripeCount - 1) / 2) * totalUnitWidth

        // Calculate points for left and right edges of the stripe
        const leftTopX = startX
        const leftTopY = horizonY - verticalDistance / 2 - extraHeight

        const rightTopX = startX + stripeWidth // Use stripeWidth for the stripe's width
        const rightTopY = horizonY - verticalDistance / 2 - extraHeight

        // Calculate depth points with perspective
        const perspectiveFactor = 1
        const leftDepthX = vpX + (leftTopX - vpX) * (1 + perspectiveFactor)
        const leftDepthY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)
        const rightDepthX = vpX + (rightTopX - vpX) * (1 + perspectiveFactor)
        const rightDepthY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)

        // Calculate control points for curves
        const controlPerspectiveFactor = 0.1
        const leftDepthControlX = vpX + (leftTopX - vpX) * (1 + controlPerspectiveFactor)
        const leftDepthControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)
        const rightDepthControlX = vpX + (rightTopX - vpX) * (1 + controlPerspectiveFactor)
        const rightDepthControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)

        const controlOffset = 80
        const leftTopControlX = leftTopX
        const leftTopControlY = leftTopY + controlOffset + extraHeight
        const rightTopControlX = rightTopX
        const rightTopControlY = rightTopY + controlOffset + extraHeight

        const leftExtendedDepthX = vpX + (leftDepthX - vpX) * computedDepthExtensionFactor
        const leftExtendedDepthY = horizonY + (leftDepthY - horizonY) * computedDepthExtensionFactor
        const rightExtendedDepthX = vpX + (rightDepthX - vpX) * computedDepthExtensionFactor
        const rightExtendedDepthY = horizonY + (rightDepthY - horizonY) * computedDepthExtensionFactor

        if (debug) {
          // Draw control points and their connections
          ctx.fillStyle = 'blue'
          ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'

          // Left curve control points
          ctx.beginPath()
          ctx.arc(leftDepthControlX, leftDepthControlY, 4, 0, Math.PI * 2)
          ctx.arc(leftTopControlX, leftTopControlY, 4, 0, Math.PI * 2)
          ctx.fill()

          // Right curve control points
          ctx.beginPath()
          ctx.arc(rightDepthControlX, rightDepthControlY, 4, 0, Math.PI * 2)
          ctx.arc(rightTopControlX, rightTopControlY, 4, 0, Math.PI * 2)
          ctx.fill()

          // Draw lines connecting control points to curve points
          ctx.beginPath()
          ctx.moveTo(leftDepthX, leftDepthY)
          ctx.lineTo(leftDepthControlX, leftDepthControlY)
          ctx.moveTo(leftTopX, leftTopY)
          ctx.lineTo(leftTopControlX, leftTopControlY)
          ctx.moveTo(rightDepthX, rightDepthY)
          ctx.lineTo(rightDepthControlX, rightDepthControlY)
          ctx.moveTo(rightTopX, rightTopY)
          ctx.lineTo(rightTopControlX, rightTopControlY)
          ctx.stroke()
        }

        // Reset styles for stripe drawing
        ctx.strokeStyle = '#666'
        ctx.lineWidth = 1

        // Draw the complete stripe with extended connections
        ctx.beginPath()

        // Start from left extended depth
        ctx.moveTo(leftExtendedDepthX, leftExtendedDepthY)

        // Draw to left depth point
        ctx.lineTo(leftDepthX, leftDepthY)

        // Draw left curve
        ctx.bezierCurveTo(leftDepthControlX, leftDepthControlY, leftTopControlX, leftTopControlY, leftTopX, leftTopY)

        // Draw to left top extension
        ctx.lineTo(leftTopX, leftTopY - 80)

        // Draw to right top extension
        ctx.lineTo(rightTopX, rightTopY - 80)

        // Draw to right top point
        ctx.lineTo(rightTopX, rightTopY)

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
  }, [stripeCount, vanishingPointX, stripeWidth, gapWidth, verticalDistance, debug, extraHeight, depthOffset])

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
