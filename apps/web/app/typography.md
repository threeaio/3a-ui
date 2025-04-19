# Typography System

## Font Families

The application uses two primary font families:

- **Geist** (`font-sans`) - Main font for all content
  - Weights: 400, 500, 600, 700, 800, 900
- **JetBrains Mono** (`font-mono`) - Monospace font for code and technical content

## Type Scale

### Headlines

```tsx
// Main Hero Headline
<h1 className="text-3xl font-extrabold uppercase leading-[1em] tracking-tight">
  Solutions.
  <br />
  handcrafted and AI-accelerated.
</h1>

// Section Headlines
<h2 className="text-2xl font-extrabold uppercase leading-[1em] tracking-tight">
  Digital solutions
  <br />
  that do not suck
</h2>
```

### Body Text

```tsx
// Standard Body Text
<p className="text-sm opacity-80">
  Experience our elegant and intuitive digital solutions that streamline your business processes.
</p>
```

### Special Text Elements

```tsx
// Word List Items (Rotated Text)
<span className="text-5xl font-extrabold uppercase tracking-tight hover:text-primary">brutalist</span>
```

## Typography Patterns

### Common Characteristics

1. **Headlines**

   - Always uppercase
   - Extra bold weight
   - Tight tracking
   - Compact line height
   - Often use line breaks for rhythm

2. **Body Text**

   - Smaller size (`text-sm`)
   - Slightly reduced opacity
   - Regular weight
   - Natural line height

3. **Interactive Elements**
   - Use primary color on hover
   - Smooth transitions
   - Often include special effects (like rotation)

### Usage Examples

```tsx
// Hero Section with Primary Color Emphasis
<h1>
  <span className="text-primary">Solutions.</span>
  <br />
  handcrafted and AI-accelerated.
</h1>

// Section Description
<p className="text-sm opacity-80">
  In turbulent times, you need a partner who knows how to
  play the claviature of time.
</p>

// Interactive Word List
<span className="text-5xl font-extrabold uppercase tracking-tight
             hover:text-primary transition-all duration-300">
  modernist
</span>
```

## Best Practices

1. Use semantic HTML elements (`h1`, `h2`, `p`)
2. Maintain hierarchy through consistent sizing
3. Use line breaks strategically for visual rhythm
4. Apply opacity for secondary content
5. Keep transitions smooth (300ms duration)
6. Use primary color highlights sparingly and purposefully

## Implementation Notes

- Font families are configured globally in the root layout
- Typography classes are composed using Tailwind CSS
- Interactive states use smooth transitions
- Text blocks maintain proper spacing through container classes
