'use client'

import { useEffect, useRef } from 'react'

interface NodeGardenCanvasProps {
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NodeGardenCanvas({ className }: NodeGardenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const speed = 0.2

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    const nodeCount = 250
    const connectionDistance = 100
    const nodeRadius = 2

    const createNode = (width: number, height: number): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: nodeRadius,
    })

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Recreate nodes when canvas is resized
      nodes = Array.from({ length: nodeCount }, () => createNode(canvas.width, canvas.height))
    }

    const updateNodes = () => {
      if (!canvas) return

      const width = canvas.width
      const height = canvas.height

      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      })
    }

    const drawNodes = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i]
        if (!nodeA) continue

        // Only check nodes that could possibly be within connectionDistance
        // This creates a "box" around the current node
        const startX = Math.max(0, nodeA.x - connectionDistance)
        const endX = Math.min(canvas.width, nodeA.x + connectionDistance)
        const startY = Math.max(0, nodeA.y - connectionDistance)
        const endY = Math.min(canvas.height, nodeA.y + connectionDistance)

        // Only check nodes after the current one (j > i) that are within the possible connection box
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j]
          if (!nodeB) continue

          // Skip nodes outside our possible connection box
          if (nodeB.x < startX || nodeB.x > endX || nodeB.y < startY || nodeB.y > endY) continue

          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = Math.max(1 - distance / connectionDistance, 0.1)
            ctx.strokeStyle = `rgba(0, 255, 157, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = '#00ff9d'
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      updateNodes()
      drawNodes()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`
    absolute inset-0 w-full h-full 
    [mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,.1),rgba(0,0,0,.2),rgba(0,0,0,1))] 
    ${className ?? ''}
  `}
    />
  )
}
