# Three Stripes Animation Documentation

## Overview

The `ThreeStripes` component is a client-side React component that leverages an HTML5 canvas to render a dynamic perspective stripe animation. It creates a visually engaging effect of stripes converging toward a vanishing point, mimicking perspective in 3D space while maintaining smooth curved edges. The component is highly configurable and responds to viewport changes, with retina display support for crisp rendering.

## Canvas Setup and Resize Handling

- **Canvas Reference:** The component uses a React ref to access the canvas element.
- **Retina Scaling:** The canvas dimensions are adjusted based on the device pixel ratio:
  ```typescript
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.round(displayWidth * dpr)
  canvas.height = Math.round(displayHeight * dpr)
  ```
- **Context Scaling:** The rendering context is scaled according to the device pixel ratio to maintain consistent dimensions:
  ```typescript
  ctx.scale(dpr, dpr)
  ```
- **Event Listeners:** The component registers resize event listeners to ensure the canvas dimensions and rendering adapt to viewport changes.

## Mathematical Principles

### Coordinate System

The canvas uses a standard coordinate system where:

- (0,0) is at the top-left corner
- X increases to the right
- Y increases downward

### Perspective and Vanishing Point

The animation creates a perspective effect through several key mathematical concepts:

1. **Vanishing Point Calculation:**

   ```typescript
   const vpX = (width / dpr) * vanishingPointX
   const horizonY = height / dpr / 2
   ```

   The vanishing point is positioned horizontally according to the `vanishingPointX` property (0-1 range) and vertically at the canvas midpoint.

2. **Stripe Positioning:**

   ```typescript
   const totalUnitWidth = stripeWidth + gapWidth
   const startX = centerX + (i - (stripeCount - 1) / 2) * totalUnitWidth
   ```

   Stripes are distributed symmetrically around the center axis, with spacing controlled by `stripeWidth` and `gapWidth`.

3. **Perspective Transformation:**

   ```typescript
   const perspectiveFactor = 1
   const leftBottomX = vpX + (leftTopX - vpX) * (1 + perspectiveFactor)
   const leftBottomY = horizonY + (verticalDistance / 2) * (1 + perspectiveFactor)
   ```

   This formula creates the illusion that stripes converge toward the vanishing point. For each point:

   - Vector from vanishing point to the original point is calculated: `(point - vpX)`
   - This vector is scaled by `(1 + perspectiveFactor)` to extend the point away from the vanishing point
   - The result is added back to the vanishing point to get the transformed coordinate

4. **Bottom Extension Factor:**
   ```typescript
   const computedExtensionFactor =
     bottomOffset !== undefined ? (displayHeight - bottomOffset - horizonY) / verticalDistance : 2
   ```
   This dynamically calculates how far the stripes should extend beyond the canvas based on the available space and desired bottom offset.

### Bezier Curve Mathematics

The smooth curves of the stripes use cubic Bezier curves defined by four points:

- Starting point (P0)
- Two control points (P1, P2) that influence the curve direction and shape
- Ending point (P3)

For each stripe edge, the component calculates:

1. **Control Points for the Left Curve:**

   ```typescript
   const leftBottomControlX = vpX + (leftTopX - vpX) * (1 + controlPerspectiveFactor)
   const leftBottomControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)
   const leftTopControlX = leftTopX
   const leftTopControlY = leftTopY + controlOffset + extraHeight
   ```

2. **Control Points for the Right Curve:**
   ```typescript
   const rightBottomControlX = vpX + (rightTopX - vpX) * (1 + controlPerspectiveFactor)
   const rightBottomControlY = horizonY + (verticalDistance / 2) * (1 + controlPerspectiveFactor)
   const rightTopControlX = rightTopX
   const rightTopControlY = rightTopY + controlOffset + extraHeight
   ```

The `controlPerspectiveFactor` (0.1) creates a subtler perspective effect for the control points compared to the edge points (which use `perspectiveFactor` of 1), resulting in curved transitions between the straight segments.

The Bezier curve is then drawn using:

```typescript
ctx.bezierCurveTo(controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, endPointX, endPointY)
```

### Complete Stripe Construction

Each stripe is constructed as a closed path following these steps:

1. Start at the extended bottom-left point
2. Draw a line to the perspective-transformed bottom-left point
3. Draw a Bezier curve from bottom-left to top-left
4. Extend upward with straight lines
5. Draw from top-left to top-right
6. Draw a Bezier curve from top-right to bottom-right
7. Extend to the bottom-right extended point
8. Close the path by connecting back to the starting point

This creates a complete stripe with curved transitions between straight segments, forming a visually appealing 3D perspective effect.

## Component Properties

- **`stripeCount`**: Determines the number of stripes to render (default: 20).
- **`vanishingPointX`**: Relative (0-1) value setting the horizontal position of the vanishing point (default: 0.5).
- **`stripeWidth`**: Width of each individual stripe in pixels (default: 20).
- **`gapWidth`**: Width of the gap between consecutive stripes in pixels (default: 5).
- **`verticalDistance`**: Controls the vertical space between top and bottom points (default: 60).
- **`extraHeight`**: Adds additional height to the stripe rendering (default: 880).
- **`bottomOffset`**: Adjusts the vertical ending point for the bottom of the stripes in pixels (default: 100).
- **`debug`**: When enabled, renders visual aids for understanding the underlying geometry (default: false).

## Debug Mode

When `debug` is enabled, the component visualizes:

- The horizon line as a dashed red line
- The vanishing point as a red circle
- Control points for Bezier curves as blue circles
- Connection lines between control points and curve points

These visual aids help in understanding and adjusting the mathematical parameters that influence the stripe appearance.

## Optimization and Cleanup

- The component efficiently manages canvas resizing with debouncing techniques
- All event listeners are properly removed during component cleanup
- Drawing operations use the correct device pixel ratio for optimal rendering

## Usage Example

```tsx
<ThreeStripes
  className="bg-black opacity-20"
  stripeCount={15}
  vanishingPointX={0.4}
  stripeWidth={30}
  gapWidth={10}
  debug={false}
/>
```

This creates a set of 15 stripes with a slightly off-center vanishing point, wider stripes, and larger gaps between them.
