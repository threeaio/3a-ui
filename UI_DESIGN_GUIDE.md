# 3A-UI Design Guide

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

This design guide provides comprehensive documentation for the 3A-UI design system. It outlines the core principles, components, and patterns to ensure consistent and accessible user interfaces across all applications.

The design system is built on Tailwind CSS with a custom theme using OKLCH color values for better color perception and consistency. It supports both light and dark modes out of the box.

## Color System

### Base Colors

The color system is built around semantic color naming, where each color has a base and foreground variant. This pattern makes it easy to create accessible combinations.

#### Primary Colors

| Color Name           | Light Mode             | Dark Mode              | Usage                                                                                     |
| -------------------- | ---------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `primary`            | `oklch(0.65 0.92 180)` | `oklch(0.65 0.92 180)` | Main brand color, call-to-action elements, use seldom, if possible only once per "screen" |
| `primary-foreground` | `oklch(0.145 0 0)`     | `oklch(0.205 0 0)`     | Text on primary backgrounds                                                               |

#### Semantic Colors

| Color Name               | Tailwind Class                | Usage                                      |
| ------------------------ | ----------------------------- | ------------------------------------------ |
| `background`             | `bg-background`               | Page backgrounds                           |
| `foreground`             | `text-foreground`             | Default text color                         |
| `card`                   | `bg-card`                     | Card backgrounds                           |
| `card-foreground`        | `text-card-foreground`        | Text on card backgrounds                   |
| `muted`                  | `bg-muted`                    | Subtle backgrounds, disabled states        |
| `muted-foreground`       | `text-muted-foreground`       | Secondary text, less important information |
| `accent`                 | `bg-accent`                   | Subtle highlights                          |
| `accent-foreground`      | `text-accent-foreground`      | Text on accent backgrounds                 |
| `destructive`            | `bg-destructive`              | Error states, delete actions               |
| `destructive-foreground` | `text-destructive-foreground` | Text on destructive backgrounds            |
| `border`                 | `border-border`               | Borders, dividers                          |
| `input`                  | `border-input`                | Form input borders                         |
| `ring`                   | `outline-ring`                | Focus rings                                |

#### Chart Colors

For data visualization:

| Color Name | Tailwind Class | Light Mode | Dark Mode |
| ---------- | -------------- | ---------- | --------- |
| `chart-1`  | `bg-chart-1`   | Green      | Purple    |
| `chart-2`  | `bg-chart-2`   | Blue       | Teal      |
| `chart-3`  | `bg-chart-3`   | Indigo     | Amber     |
| `chart-4`  | `bg-chart-4`   | Yellow     | Violet    |
| `chart-5`  | `bg-chart-5`   | Amber      | Orange    |

### Observed Color Usage Patterns

Based on the codebase analysis, these are the most commonly used color combinations:

1. **Content Areas**:

   - Background: `bg-background`
   - Text: `text-foreground` (primary text), `text-muted-foreground` (secondary text)
   - Borders: `border-border`

2. **Cards and Panels**:

   - Background: `bg-card` or `bg-muted`
   - Text: `text-card-foreground`
   - Borders: `border-border`

3. **Form Elements**:

   - Borders: `border-input`
   - Focus state: `ring-ring`
   - Error state: `text-destructive` for error messages

4. **Buttons**:

   - Primary actions: `bg-primary text-primary-foreground`
   - Secondary actions: `bg-secondary text-secondary-foreground`
   - Destructive actions: `bg-destructive text-destructive-foreground`

5. **Sidebar**:
   - Background: `bg-sidebar`
   - Text: `text-sidebar-foreground`
   - Active items: `bg-sidebar-accent text-sidebar-accent-foreground`

### Usage Guidelines

1. **Never use default Tailwind color modifiers** - Always use the semantic color classes provided by the theme.
2. **Use color pairs correctly** - When using a background color, pair it with its corresponding foreground color for proper contrast.
3. **Maintain accessibility** - Ensure sufficient contrast between text and background colors.

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

### Font Families

The design system uses two main font families:

- **Sans-serif** (`font-sans`): Used for most text content (Geist Sans)
- **Monospace** (`font-mono`): Used for code, technical information, and specific UI elements (Geist Mono)

### Text Sizes

| Class       | Size               | Usage                                                   |
| ----------- | ------------------ | ------------------------------------------------------- |
| `text-xs`   | Extra small (12px) | Labels, captions, metadata, technical information       |
| `text-sm`   | Small (14px)       | Secondary text, form labels, navigation, error messages |
| `text-base` | Base (16px)        | Body text, form inputs (default on mobile)              |
| `text-lg`   | Large (18px)       | Subheadings, emphasized text                            |
| `text-xl`   | Extra large (20px) | Section headings                                        |

### Font Weights

| Class           | Weight         | Usage                                      |
| --------------- | -------------- | ------------------------------------------ |
| `font-normal`   | Normal (400)   | Most text content, body text, form inputs  |
| `font-medium`   | Medium (500)   | Slightly emphasized text, labels in lists  |
| `font-semibold` | Semibold (600) | Headings, important labels, section titles |

### Observed Typography Patterns

Based on the codebase analysis, these are the most common typography patterns:

1. **Headings**:

   - Section titles: `font-semibold` (no explicit size, inherits from parent)
   - Subsection titles: `font-semibold text-lg`

2. **Body Text**:

   - Primary content: Default text (no explicit classes needed)
   - Secondary content: `text-muted-foreground`
   - Small print: `text-xs text-muted-foreground`

3. **Form Labels**:

   - Standard labels: `text-sm` (from the Label component)
   - Error messages: `text-sm text-destructive`

4. **Technical Information**:

   - Code snippets: `font-mono text-xs`
   - Technical labels: `text-xs font-mono`

5. **UI Elements**:
   - Buttons: `text-sm font-normal`
   - Badges: `text-xs font-medium`
   - Navigation: `text-sm`

### Typography Examples

```jsx
// Heading
<h2 className="font-semibold">Section Title</h2>

// Body text with secondary importance
<p className="text-muted-foreground">
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

## Spacing System

The spacing system helps maintain consistent spacing throughout the application. It aligns with the Row System to keep elements in sync.

### Base Spacing Values

| Size | Tailwind Class   | Value           | Usage                                    |
| ---- | ---------------- | --------------- | ---------------------------------------- |
| 1    | `p-2`, `gap-2`   | --------------- | Tight spacing, compact UIs               |
| 2    | `p-5`, `gap-5`   | 1.25rem (20px)  | Standard spacing                         |
| 3    | `p-10`, `gap-10` | 2.5rem (40px)   | Generous spacing, section separation     |
| 4    | `p-20`, `gap-20` | 5rem (80px)     | Very large spacing, major section breaks |

### Height Classes

| Size | Class  | Value          | Usage                                  |
| ---- | ------ | -------------- | -------------------------------------- |
| 0    | `h-13` | 3.25rem (52px) | Compact rows (for one-line forms / UI) |
| 1    | `h-20` | 5rem (80px)    | Standard rows                          |
| 2    | `h-40` | 10rem (160px)  | Double-height rows                     |
| 3    | `h-60` | 15rem (240px)  | Triple-height rows                     |
| 4    | `h-80` | 20rem (320px)  | Quadruple-height rows                  |

### Observed Spacing Patterns

Based on the codebase analysis, these are the common spacing patterns for different situations:

1. **Content Sections**:

   - Outer padding: `p-10` (size 3)
   - Heading to content gap: `gap-2.5` (size 1)
   - Between content blocks: `gap-5` (size 2)

2. **Form Elements**:

   - Between form groups: `space-y-5` (size 2)
   - Between label and input: `space-y-2` (smaller than size 1)
   - Input padding: `px-3 py-2` (custom size)

3. **Buttons and Interactive Elements**:

   - Button padding: `px-4 py-2` (default size)
   - Button groups gap: `gap-2` (smaller than size 1)
   - Icon spacing in buttons: `gap-2` (smaller than size 1)

4. **Cards and Panels**:

   - Card padding: `p-5` (size 2)
   - Content within cards: `space-y-2` (size 1)

5. **Navigation and Sidebars**:

   - Navigation item padding: `px-3 py-2` (custom size)
   - Between navigation groups: `mt-5 mb-3` (custom size)

6. **Lists and Grids**:
   - List item gap: `gap-2` (size 1)
   - Grid gap: `gap-5` (size 2)

### Spacing Guidelines

1. **Use consistent spacing** - Stick to the defined spacing values rather than arbitrary values.
2. **Avoid direct neighbors** - Don't use values directly adjacent to the defined spacing values.
3. **For text content** - Use padding rather than fixed heights when dealing with text or lists.

```jsx
// Correct spacing
<div className="p-5">
  <h2 className="mb-2">Heading</h2>
  <p className="mb-5">Content with proper spacing</p>
</div>

// Incorrect spacing
<div className="p-6">
  <h2 className="mb-3">Heading</h2>
  <p className="mb-4">Content with inconsistent spacing</p>
</div>
```

## Component Design

### Buttons

Buttons are interactive elements that trigger actions when clicked. The button system provides various variants, sizes, and states.

#### Button Variants

- `default`: Standard button
- `primary`: Call-to-action button
- `destructive`: For destructive actions
- `outline`: Bordered button with transparent background
- `secondary`: Alternative button style
- `ghost`: Button without background until hovered
- `link`: Appears as a text link

#### Button Sizes

- `sm`: Small button
- `default`: Standard size
- `lg`: Large button
- `icon`: Square button for icons only

#### Button States

- Normal
- Disabled: `disabled` attribute
- Loading: Add a spinner icon

#### Button with Icons

Icons can be combined with text or used alone. Icons should be sized appropriately (`size-4` is standard).

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

### Badges

Badges are small visual indicators used for status, labels, or counts.

```jsx
// Default badge
<Badge>New</Badge>

// Badge with icon
<Badge>
  <Check className="size-3" />
  Completed
</Badge>
```

### Form Elements

Form elements include inputs, textareas, selects, and labels. They follow consistent styling patterns.

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

The Row System provides consistent vertical rhythm throughout the application. It uses predefined height classes to maintain alignment.

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

Cards are used to group related content.

```jsx
<div className="bg-card text-card-foreground p-5 rounded-lg border border-border">
  <h3 className="font-semibold mb-2.5">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Sidebar Pattern

For sidebar navigation and panels.

```jsx
<div className="bg-sidebar text-sidebar-foreground">
  <div className="p-5 border-b border-sidebar-border">
    <h3 className="font-semibold">Sidebar Title</h3>
  </div>
  <nav className="p-2.5">
    <a className="bg-sidebar-accent text-sidebar-accent-foreground px-3 py-2 rounded-md block">Navigation Item</a>
  </nav>
</div>
```

## Dark Mode

The design system automatically supports dark mode through the `.dark` class on an ancestor element (typically the `<html>` or `<body>` tag).

All semantic color variables automatically adjust for dark mode, ensuring proper contrast and readability.

## Best Practices

1. **Use semantic color naming** - Always use the semantic color classes rather than direct color values.
2. **Maintain consistent spacing** - Use the defined spacing system for padding, margins, and gaps.
3. **Follow the Row System** - Align with the Row System for consistent vertical rhythm.
4. **Ensure accessibility** - Maintain proper contrast and focus states.
5. **Use appropriate text sizes** - Follow the typography guidelines for readable text.
6. **Combine components correctly** - Use components together in ways that maintain proper spacing and alignment.
7. **Test in both light and dark modes** - Ensure your UI looks good in both modes.

## Common UI Patterns

Based on the codebase analysis, here are some common UI patterns and how they're implemented:

### Section Headers

```jsx
<div className="px-10 h-40 flex flex-col justify-center">
  <h2 className="font-semibold">{title}</h2>
  {subline && <p className="mt-1 text-muted-foreground">{subline}</p>}
</div>
```

### Content Sections with Explanations

```jsx
<StyleguideExplanation>
  <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
    Main explanation text with <span className="text-foreground">emphasized parts</span>.
  </p>
  <ul className="list-disc pl-5 text-muted-foreground max-w-2xl leading-tight mb-5 space-y-2">
    <li>
      <span className="text-foreground font-medium">Feature:</span> Description
    </li>
  </ul>
</StyleguideExplanation>
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

This guide is a living document and will be updated as the design system evolves.
