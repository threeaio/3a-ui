# Tailwind CSS Theme Guide

This guide explains how to use our custom Tailwind CSS theme variables in your components. Our theme is built with a light and dark mode, using OKLCH color values for better color perception and consistency.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Color Variables](#color-variables)
- [Border Radius](#border-radius)
- [Animations](#animations)
- [Dark Mode](#dark-mode)
- [Theme Structure](#theme-structure)

## Basic Usage

Our Tailwind setup uses custom CSS variables that map to specific utility classes. For example:

```jsx
// Using text color
<p className="text-muted">This text uses the muted color</p>

// Using background color
<div className="bg-primary text-primary-foreground">
  This has primary background with appropriate foreground text
</div>
```

## Color Variables

Below is a mapping of our CSS variables to their corresponding Tailwind utility classes:

| CSS Variable               | Tailwind Class                                             | Light Mode Value            | Dark Mode Value             |
| -------------------------- | ---------------------------------------------------------- | --------------------------- | --------------------------- |
| `--background`             | `bg-background`                                            | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          |
| `--foreground`             | `text-foreground`                                          | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          |
| `--card`                   | `bg-card`                                                  | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          |
| `--card-foreground`        | `text-card-foreground`                                     | `oklch(0.145 0 0)`          | `oklch(0.97 0 0)`           |
| `--popover`                | `bg-popover`                                               | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          |
| `--popover-foreground`     | `text-popover-foreground`                                  | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          |
| `--primary`                | `bg-primary`, `text-primary`, `border-primary`             | `oklch(0.65 0.92 180)`      | `oklch(0.65 0.92 180)`      |
| `--primary-foreground`     | `text-primary-foreground`                                  | `oklch(0.145 0 0)`          | `oklch(0.205 0 0)`          |
| `--secondary`              | `bg-secondary`, `text-secondary`, `border-secondary`       | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          |
| `--secondary-foreground`   | `text-secondary-foreground`                                | `oklch(0.205 0 0)`          | `oklch(0.985 0 0)`          |
| `--muted`                  | `bg-muted`, `text-muted`, `border-muted`                   | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          |
| `--muted-foreground`       | `text-muted-foreground`                                    | `oklch(0.556 0 0)`          | `oklch(0.708 0 0)`          |
| `--accent`                 | `bg-accent`, `text-accent`, `border-accent`                | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          |
| `--accent-foreground`      | `text-accent-foreground`                                   | `oklch(0.205 0 0)`          | `oklch(0.985 0 0)`          |
| `--destructive`            | `bg-destructive`, `text-destructive`, `border-destructive` | `oklch(0.837 0.337 25.331)` | `oklch(0.837 0.337 25.331)` |
| `--destructive-foreground` | `text-destructive-foreground`                              | `oklch(0.145 0 0)`          | `oklch(0.145 0 0)`          |
| `--border`                 | `border-border`                                            | `oklch(0.922 0 0)`          | `oklch(0.269 0 0)`          |
| `--input`                  | `border-input`                                             | `oklch(0.922 0 0)`          | `oklch(0.269 0 0)`          |
| `--ring`                   | `outline-ring`                                             | `oklch(0.87 0 0)`           | `oklch(0.439 0 0)`          |

### Chart Colors

For data visualization:

| CSS Variable | Tailwind Class                                 | Light Mode Value            | Dark Mode Value              |
| ------------ | ---------------------------------------------- | --------------------------- | ---------------------------- |
| `--chart-1`  | `text-chart-1`, `bg-chart-1`, `border-chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| `--chart-2`  | `text-chart-2`, `bg-chart-2`, `border-chart-2` | `oklch(0.6 0.118 184.704)`  | `oklch(0.696 0.17 162.48)`   |
| `--chart-3`  | `text-chart-3`, `bg-chart-3`, `border-chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)`   |
| `--chart-4`  | `text-chart-4`, `bg-chart-4`, `border-chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)`   |
| `--chart-5`  | `text-chart-5`, `bg-chart-5`, `border-chart-5` | `oklch(0.769 0.188 70.08)`  | `oklch(0.645 0.246 16.439)`  |

### Sidebar Colors

For sidebar components:

| CSS Variable                   | Tailwind Class                               | Light Mode Value   | Dark Mode Value    |
| ------------------------------ | -------------------------------------------- | ------------------ | ------------------ |
| `--sidebar`                    | `bg-sidebar`                                 | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--sidebar-foreground`         | `text-sidebar-foreground`                    | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-primary`            | `bg-sidebar-primary`, `text-sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.269 0 0)` |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground`            | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-accent`             | `bg-sidebar-accent`, `text-sidebar-accent`   | `oklch(0.97 0 0)`  | `oklch(0.269 0 0)` |
| `--sidebar-accent-foreground`  | `text-sidebar-accent-foreground`             | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-border`             | `border-sidebar-border`                      | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| `--sidebar-ring`               | `outline-sidebar-ring`                       | `oklch(0.87 0 0)`  | `oklch(0.439 0 0)` |

## Border Radius

Our theme includes custom border radius values:

| CSS Variable  | Tailwind Class | Value                       |
| ------------- | -------------- | --------------------------- |
| `--radius-sm` | `rounded-sm`   | `calc(var(--radius) - 4px)` |
| `--radius-md` | `rounded-md`   | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `rounded-lg`   | `var(--radius)` (0.625rem)  |
| `--radius-xl` | `rounded-xl`   | `calc(var(--radius) + 4px)` |

Example usage:

```jsx
<div className="rounded-lg bg-card p-4">This card has the default large border radius</div>
```

## Animations

The theme includes animation utilities for accordions:

| CSS Variable               | Tailwind Class           | Description                         |
| -------------------------- | ------------------------ | ----------------------------------- |
| `--animate-accordion-down` | `animate-accordion-down` | Animation for expanding accordions  |
| `--animate-accordion-up`   | `animate-accordion-up`   | Animation for collapsing accordions |

Example usage:

```jsx
<div className="overflow-hidden animate-accordion-down">This content will animate downward when appearing</div>
```

## Dark Mode

Our theme automatically applies dark mode styles when the `.dark` class is present on an ancestor element (typically the `<html>` or `<body>` tag).

Example of manually toggling dark mode:

```jsx
// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

// Component with a dark mode toggle button
function DarkModeToggle() {
  return (
    <button onClick={toggleDarkMode} className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
      Toggle Dark Mode
    </button>
  );
}
```

## Theme Structure

Our theme is structured with semantic color naming, where each color has a base and foreground variant:

1. **Base colors** (e.g., `bg-primary`, `text-primary`) - Used for backgrounds or text of that color
2. **Foreground colors** (e.g., `text-primary-foreground`) - Used for content on top of the base color

This pattern makes it easy to create accessible combinations:

```jsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  This button uses primary colors with proper contrast
</button>

<div className="bg-card p-6 rounded-lg border border-border">
  <h3 className="text-card-foreground font-bold">Card Title</h3>
  <p className="text-muted-foreground">
    This card uses semantic color naming for proper contrast
  </p>
</div>
```

### Common Patterns

Here are some common UI patterns using our theme:

```jsx
// Primary button
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
  Primary Button
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90">
  Secondary Button
</button>

// Destructive button
<button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90">
  Delete
</button>

// Card
<div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
  Card Content
</div>

// Input
<input
  className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter text..."
/>

// Sidebar navigation item
<a className="bg-sidebar-accent text-sidebar-accent-foreground px-3 py-2 rounded-md hover:bg-sidebar-accent/90">
  Navigation Item
</a>
```

By following these patterns, you'll create a consistent UI that automatically adapts to both light and dark modes while maintaining proper contrast and accessibility.
