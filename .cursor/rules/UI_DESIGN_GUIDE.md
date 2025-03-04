---
description: UI-DESIGN
globs:
alwaysApply: false
---

# 3A-UI Design Guide (Simplified for LLMs)

## Table of Contents

- [Introduction](#introduction)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing System](#spacing-system)
- [Component Design](#component-design)
- [Layout Patterns](#layout-patterns)
- [Dark Mode](#dark-mode)
- [Best Practices](#best-practices)
- [Common UI Patterns](#common-ui-patterns)

## Introduction

This simplified design guide provides essential information for LLMs to create and compose UI components for the 3A-UI design system. The design system is built on Tailwind CSS with a custom theme defined in the `packages/ui/src/styles.css` file, which serves as the source for generating the Tailwind classes alongside standard Tailwind classes.

## Color System

### Semantic Color Classes

Use these semantic color classes rather than direct color values:

| Color Purpose | Background Class | Text Class                    | Usage                              |
| ------------- | ---------------- | ----------------------------- | ---------------------------------- |
| `primary`     | `bg-primary`     | `text-primary-foreground`     | Main call-to-action elements       |
| `default`     | `bg-default`     | `text-default-foreground`     | Default UI elements                |
| `background`  | `bg-background`  | `text-foreground`             | Page backgrounds                   |
| `card`        | `bg-card`        | `text-card-foreground`        | Card backgrounds                   |
| `muted`       | `bg-muted`       | `text-muted-foreground`       | Subtle backgrounds, secondary text |
| `accent`      | `bg-accent`      | `text-accent-foreground`      | Subtle highlights                  |
| `destructive` | `bg-destructive` | `text-destructive-foreground` | Error states, delete actions       |
| `border`      | `border-border`  | -                             | Borders, dividers                  |
| `input`       | `border-input`   | -                             | Form input borders                 |
| `ring`        | `outline-ring`   | -                             | Focus rings                        |

### Color Usage Guidelines

1. **Always use semantic color classes** - Never use default Tailwind color modifiers
2. **Use color pairs correctly** - When using a background color, pair it with its corresponding foreground color
3. **Use `primary` sparingly** - Only for main actions, use `default` for most UI elements
4. **For buttons** - Prefer `default` and `outline` variants, use `primary` only for main actions

```jsx
// Correct usage
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

// Incorrect usage
<button className="bg-primary text-white">
  Primary Button
</button>
```

## Typography

The typography system is designed to be minimal and consistent, focusing on semantic meaning rather than decorative styling. The design system intentionally limits font size and weight variations to maintain a clean, professional appearance.

### Key Typography Principles

- **Minimal variation**: Use a limited set of font sizes and weights
- **Semantic structure**: Focus on the semantic meaning of text elements (headings, body, etc.)
- **Vertical containment**: Headings are typically contained in fixed-height wrappers for consistent vertical rhythm
- **Consistent styling**: Even H1 headings use regular size with `font-semibold` weight

### Font Families

- **Sans-serif**: `font-sans` (Geist Sans)
- **Monospace**: `font-mono` (Geist Mono)

### Text Sizes

| Class       | Usage                                                   |
| ----------- | ------------------------------------------------------- |
| `text-xs`   | Labels, captions, metadata, technical information       |
| `text-sm`   | Secondary text, form labels, navigation, error messages |
| `text-base` | Body text, form inputs (default)                        |
| `text-lg`   | Title of the page (but only for content-heavy pages)    |

### Font Weights

| Class           | Usage                                                                                |
| --------------- | ------------------------------------------------------------------------------------ |
| `font-normal`   | Most text content, body text, form inputs (default)                                  |
| `font-medium`   | Slightly emphasized text, labels in lists (use sparingly)                            |
| `font-semibold` | Headings, important labels, section titles (use sparingly but preferred over medium) |

### Heading Patterns

Headings follow a consistent pattern regardless of their semantic level (h1, h2, h3):

1. **Main Page Headings (H1)**:

   ```jsx
   <div className="h-80 pt-10 flex flex-col px-10 justify-start">
     <h1 className="font-semibold mb-5">Page Title</h1>
     <p className="text-muted-foreground max-w-2xl">Descriptive text about the page content.</p>
   </div>
   ```

2. **Section Headings (H2, H3)**:

   ```jsx
   <div className="px-10 h-40 flex flex-col justify-center">
     <h2 className="font-semibold">{title}</h2>
     {subline && <p className="mt-1 text-muted-foreground">{subline}</p>}
   </div>
   ```

3. **Sidebar/Navigation Headings**:
   ```jsx
   <h3 className="px-3 mt-5 mb-3 font-semibold">Section Title</h3>
   ```

### Text Color Usage

- **Primary text**: `text-foreground` (default)
- **Secondary text**: `text-muted-foreground`
- **Contextual text**: Use corresponding foreground colors (e.g., `text-primary-foreground` on `bg-primary`)

### Common Typography Patterns

```jsx
// Body text with secondary importance
<p className="text-muted-foreground max-w-2xl">
  This is a paragraph with secondary importance.
</p>

// Small text with emphasis
<span className="text-xs text-foreground font-medium">
  Important label
</span>

// Code or technical text
<code className="font-mono text-xs">
  technical-value
</code>

// Form error message
<p className="text-sm text-destructive">
  This field is required
</p>
```

### Best Practices

1. **Maintain vertical rhythm**: Always place headings in appropriate height containers
2. **Limit font size variation**: Stick to the defined text sizes
3. **Use weight and Spacing for emphasis**: Prefer `font-semibold` over larger sizes for emphasis
4. **Use text-muted-foreground for weakening**: E.g. Sublines of headings
5. **Respect max-width**: Use `max-w-2xl` for longer text blocks to maintain readability
6. **Use semantic HTML**: Use proper heading tags (h1, h2, h3) even when they look visually similar

### Accessibility Considerations

- Ensure sufficient color contrast between text and background
- Maintain a clear visual hierarchy despite minimal size differences
- Use proper semantic HTML elements for screen readers

## Spacing System

### Base Spacing Classes

| Tailwind Class   | Usage                                    |
| ---------------- | ---------------------------------------- |
| `p-2`, `gap-2`   | Tight spacing, compact UIs               |
| `p-5`, `gap-5`   | Standard spacing                         |
| `p-10`, `gap-10` | Generous spacing, section separation     |
| `p-20`, `gap-20` | Very large spacing, major section breaks |

### Height Classes

| Class  | Usage                                       |
| ------ | ------------------------------------------- |
| `h-13` | Compact rows (only for one-line forms / UI) |
| `h-20` | Standard rows                               |
| `h-40` | Double-height rows                          |
| `h-60` | Triple-height rows                          |
| `h-80` | Quadruple-height rows                       |

### Common Spacing Patterns

1. **Content Sections**:

   - Outer padding: `p-10`
   - Heading to content gap: `gap-2`
   - Between content blocks: `gap-5`

2. **Form Elements**:

   - Between form groups: `space-y-5`
   - Between label and input: `space-y-2`
   - Input padding: `px-3 py-2`

3. **Cards and Panels**:
   - Card padding: `p-5`
   - Content within cards: `space-y-2`

## Component Design

### Buttons

#### Button Variants

- `default`: Standard button
- `primary`: Call-to-action button (use sparingly)
- `destructive`: For destructive actions
- `outline`: Bordered button with transparent background (most used after default)
- `secondary`: Alternative button style (use sparingly)
- `ghost`: Button without background until hovered
- `link`: Appears as a text link

#### Button Sizes

- `sm`: Small button
- `default`: Standard size
- `lg`: Large button
- `icon`: Square button for icons only

```jsx
// Primary button with icon
<Button variant="primary">
  <ArrowRight className="size-4" />
  Next Step
</Button>

// Icon-only button
<Button variant="outline" size="icon">
  <Plus className="size-4" />
</Button>
```

### Form Elements

```jsx
// Input with label
<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>

// Error state
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" aria-invalid="true" />
  <p className="text-sm text-destructive">Please enter a valid email</p>
</div>
```

## Layout Patterns

### Row System

The Row System provides consistent vertical rhythm throughout the application.
Use rows (read: fixed-height in the [10, 20, 40 ...]-Range) only for elements where it is save to use a fixed height and it is needed (usually mall sections of UI, that should be composable or content-sections with a limited and fixed amount of content)

```jsx
// Standard row
<div className="h-20 px-5 flex items-center">
  Row content
</div>

// Double-height row
<div className="h-40 p-10">
  <h2 className="font-semibold">Section Title</h2>
  <p className="text-muted-foreground">Content with more vertical space</p>
</div>
```

### Card Pattern

```jsx
<div className="bg-card text-card-foreground p-5 rounded-lg border border-border">
  <h3 className="font-semibold mb-2.5">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

## Dark Mode

The design system automatically supports dark mode through the `.dark` class on an ancestor element. All semantic color variables automatically adjust for dark mode, ensuring proper contrast and readability.

## Best Practices

1. **Use semantic color naming** - Always use the semantic color classes rather than direct color values
2. **Maintain consistent spacing** - Use the defined spacing system for padding, margins, and gaps
3. **Follow the Row System** - Align with the Row System for consistent vertical rhythm
4. **Ensure accessibility** - Maintain proper contrast and focus states
5. **Use appropriate text sizes** - Follow the typography guidelines for readable text
6. **Test in both light and dark modes** - Ensure your UI looks good in both modes

## Common UI Patterns

### Section Headers

```jsx
<div className="px-10 h-40 flex flex-col justify-center">
  <h2 className="font-semibold">{title}</h2>
  {subline && <p className="mt-1 text-muted-foreground">{subline}</p>}
</div>
```

### Form Layouts

```jsx
<div className="space-y-5">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" />
  </div>

  <div className="flex justify-end">
    <Button>Submit</Button>
  </div>
</div>
```

### Action Bars

```jsx
<div className="h-20 px-5 flex items-center justify-between">
  <div className="flex items-center gap-5">
    <ButtonGroup variant="outline">
      <Button>Action</Button>
      <Button>Settings</Button>
    </ButtonGroup>
    <span className="text-muted-foreground text-xs">|</span>
    <Badge>Status</Badge>
  </div>

  <ButtonGroup variant="outline">
    <Button size="icon">
      <Plus />
    </Button>
  </ButtonGroup>
</div>
```

### Content Cards

```jsx
<div className="border rounded-xl bg-background">
  <div className="p-10">
    <div className="flex flex-col gap-2.5 max-w-2xl">
      <h2 className="font-semibold">Content Section</h2>
      <p className="text-muted-foreground">Content text goes here.</p>
    </div>
  </div>
</div>
```

---

**Note about styles.css**: The `packages/ui/src/styles.css` file serves as the source for generating the custom Tailwind classes used in this design system, alongside the standard classes provided by Tailwind. This file defines all the semantic color variables, spacing, and other custom properties that power the design system.
