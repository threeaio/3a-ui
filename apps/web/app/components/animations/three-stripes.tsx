'use client'

import { useRef, useEffect } from 'react'

interface ThreeStripesProps {
  className?: string
  stripeCount?: number
  vanishingPointX?: number // 0-1 relative position
  lineSpacing?: number // horizontal spacing between lines
  verticalDistance?: number // distance between top and bottom points
  debug?: boolean // Add debug prop
}

export function ThreeStripes({
  className,
  stripeCount = 50,
  vanishingPointX = 0.5,
  lineSpacing = 10,
  verticalDistance = 100,
  debug = false, // Add debug prop with default value
}: ThreeStripesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Drawing function
    const draw = () => {
      const { width, height } = canvas

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate horizon y-position
      const horizonY = height / 2

      // Calculate vanishing point x-position
      const vpX = width * vanishingPointX

      // Calculate middle x-position for centering lines
      const centerX = width / 2

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

      // Draw stripes (pairs of lines)
      for (let i = 0; i < stripeCount; i += 2) {
        // Calculate points for left line of stripe
        const leftTopX = centerX + (i - (stripeCount - 1) / 2) * lineSpacing
        const leftTopY = horizonY - verticalDistance / 2

        // Calculate points for right line of stripe
        const rightTopX = centerX + (i + 1 - (stripeCount - 1) / 2) * lineSpacing
        const rightTopY = horizonY - verticalDistance / 2

        // Calculate bottom points with perspective
        const perspectiveFactor = 1
        const leftBottomX = vpX + (leftTopX - vpX) * (1 + perspectiveFactor)
        const leftBottomY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)
        const rightBottomX = vpX + (rightTopX - vpX) * (1 + perspectiveFactor)
        const rightBottomY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)

        // Calculate control points for curves

        const controlPerspectiveFactor = 0.1
        const leftBottomControlX = vpX + (leftTopX - vpX) * (1 + controlPerspectiveFactor)
        const leftBottomControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)
        const rightBottomControlX = vpX + (rightTopX - vpX) * (1 + controlPerspectiveFactor)
        const rightBottomControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)

        const controlOffset = 80
        const leftTopControlX = leftTopX
        const leftTopControlY = leftTopY + controlOffset
        const rightTopControlX = rightTopX
        const rightTopControlY = rightTopY + controlOffset

        const extensionFactor = 2
        const leftExtendedBottomX = vpX + (leftBottomX - vpX) * extensionFactor
        const leftExtendedBottomY = horizonY + (leftBottomY - horizonY) * extensionFactor
        const rightExtendedBottomX = vpX + (rightBottomX - vpX) * extensionFactor
        const rightExtendedBottomY = horizonY + (rightBottomY - horizonY) * extensionFactor

        if (debug) {
          // Draw control points and their connections
          ctx.fillStyle = 'blue'
          ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'

          // Left curve control points
          ctx.beginPath()
          ctx.arc(leftBottomControlX, leftBottomControlY, 4, 0, Math.PI * 2)
          ctx.arc(leftTopControlX, leftTopControlY, 4, 0, Math.PI * 2)
          ctx.fill()

          // Right curve control points
          ctx.beginPath()
          ctx.arc(rightBottomControlX, rightBottomControlY, 4, 0, Math.PI * 2)
          ctx.arc(rightTopControlX, rightTopControlY, 4, 0, Math.PI * 2)
          ctx.fill()

          // Draw lines connecting control points to curve points
          ctx.beginPath()
          ctx.moveTo(leftBottomX, leftBottomY)
          ctx.lineTo(leftBottomControlX, leftBottomControlY)
          ctx.moveTo(leftTopX, leftTopY)
          ctx.lineTo(leftTopControlX, leftTopControlY)
          ctx.moveTo(rightBottomX, rightBottomY)
          ctx.lineTo(rightBottomControlX, rightBottomControlY)
          ctx.moveTo(rightTopX, rightTopY)
          ctx.lineTo(rightTopControlX, rightTopControlY)
          ctx.stroke()
        }

        // Reset styles for stripe drawing
        ctx.strokeStyle = '#666'
        ctx.lineWidth = 2

        // Draw the complete stripe with extended connections
        ctx.beginPath()

        // Start from left extended bottom
        ctx.moveTo(leftExtendedBottomX, leftExtendedBottomY)

        // Draw to left bottom point
        ctx.lineTo(leftBottomX, leftBottomY)

        // Draw left curve
        ctx.bezierCurveTo(leftBottomControlX, leftBottomControlY, leftTopControlX, leftTopControlY, leftTopX, leftTopY)

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
          rightBottomControlX,
          rightBottomControlY,
          rightBottomX,
          rightBottomY,
        )

        // Draw to right extended bottom
        ctx.lineTo(rightExtendedBottomX, rightExtendedBottomY)

        // Connect back to left extended bottom
        ctx.lineTo(leftExtendedBottomX, leftExtendedBottomY)

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
  }, [stripeCount, vanishingPointX, lineSpacing, verticalDistance, debug])

  return (
    <div
      className={`
        absolute inset-0 w-full h-full 
        ${className ?? ''}
      `}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
