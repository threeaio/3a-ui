---
description: TECH AND STRUCTURE GUIDE
globs:
alwaysApply: true
---

# 3A-UI Technical Guide

## Table of Contents

- [Introduction](mdc:#introduction)
- [Tech Stack](mdc:#tech-stack)
- [Project Structure](mdc:#project-structure)
- [Coding Patterns](mdc:#coding-patterns)
- [Constraints and Rules](mdc:#constraints-and-rules)
- [Development Workflow](mdc:#development-workflow)
- [Best Practices](mdc:#best-practices)

## Introduction

This technical guide provides comprehensive documentation for the 3A-UI project's technical implementation. It outlines the core technologies, project structure, coding patterns, and best practices to ensure consistent and maintainable code across all applications.

The 3A-UI project is a monorepo using Turborepo, containing a shared UI library and multiple applications that utilize this library. The UI system is built on Tailwind CSS 4 with a custom theme using OKLCH color values for better color perception and consistency.

## Tech Stack

### Core Technologies

| Technology   | Version | Purpose                                          |
| ------------ | ------- | ------------------------------------------------ |
| React        | 19.0.0  | UI library                                       |
| Next.js      | 15.1.6  | React framework for server-rendered applications |
| TypeScript   | 5.7.3   | Type-safe JavaScript                             |
| Tailwind CSS | 4.0.9   | Utility-first CSS framework                      |
| Turborepo    | Latest  | Monorepo build system                            |
| shadcn/ui    | Latest  | Component library foundation                     |

### Key Dependencies

| Dependency            | Version | Purpose               |
| --------------------- | ------- | --------------------- |
| @tanstack/react-table | 8.21.2  | Data table management |
| lucide-react          | 0.476.0 | Icon library          |
| motion                | 12.4.9  | Animation library     |

### Font System

The project uses Google Fonts:

- **Geist** - Primary sans-serif font
- **Geist Mono** - Monospace font for code and technical content

## Project Structure

The 3A-UI project follows a monorepo structure using Turborepo:

```
Root
├── packages/
│   ├── eslint-config/       # Shared ESLint configuration
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── ui/                  # Core UI library (Tailwind 4 + shadcn/ui based)
│       ├── src/
│       │   ├── ui/          # Individual UI components
│       │   │   ├── badge/   # Badge components
│       │   │   ├── button/  # Button components
│       │   │   ├── forms/   # Form components (input, select, checkbox, etc.)
│       │   │   ├── slider/  # Slider components
│       │   │   └── tooltip/ # Tooltip components
│       │   ├── lib/         # Utility functions
│       │   │   ├── utils.ts # Common utilities like className merging
│       │   │   └── registry.ts # Component registry
│       │   ├── hooks/       # Custom React hooks
│       │   │   └── use-meta-color.ts # Hook for color management
│       │   ├── components/  # Higher-level components (empty currently)
│       │   └── styles.css   # Theme definition and global styles
│       └── package.json     # UI package dependencies
└── apps/
    ├── docs/                # UI documentation and styleguide app
    │   ├── app/             # Next.js app directory
    │   │   ├── components/  # Component showcase pages
    │   │   │   ├── badges/
    │   │   │   ├── buttons/
    │   │   │   ├── colors/
    │   │   │   ├── forms/
    │   │   │   ├── rhythm/
    │   │   │   └── layout.tsx
    │   │   ├── ui/          # Documentation-specific UI components
    │   │   │   ├── core-layout/
    │   │   │   ├── measure-visualizer/
    │   │   │   ├── styleguide-explanation.tsx
    │   │   │   ├── styleguide-render.tsx
    │   │   │   └── styleguide-section.tsx
    │   │   ├── layout.tsx   # Root layout
    │   │   ├── nav.tsx      # Navigation sidebar
    │   │   ├── page.tsx     # Root page
    │   │   └── styles.css   # App-specific styles
    │   └── package.json     # App dependencies
    └── web/                 # Landing page (not currently developed)
```

### UI Library Structure

The UI library is organized into several key directories:

1. **UI Components (`packages/ui/src/ui/`)**:

   - Each component or component group has its own directory
   - Component directories typically contain:
     - Main component file (e.g., `button.tsx`)
     - Related component variants (e.g., `button-group.tsx`)
     - Index file for exports (e.g., `index.ts`)

   Current component categories include:

   - `badge/` - Badge components for displaying status or labels
   - `button/` - Button components including variants and button groups
   - `forms/` - Form-related components including inputs, selects, checkboxes, etc.
   - `slider/` - Slider components for range selection
   - `tooltip/` - Tooltip components for displaying additional information

2. **Utilities (`packages/ui/src/lib/`)**:

   - `utils.ts` - Common utility functions like className merging
   - `registry.ts` - Component registry for documentation and management

3. **Hooks (`packages/ui/src/hooks/`)**:

   - Custom React hooks for reusable logic
   - Currently includes `use-meta-color.ts` for color management

4. **Components (`packages/ui/src/components/`)**:

   - Reserved for higher-level composite components
   - Currently empty, but available for future expansion

5. **Styles (`packages/ui/src/styles.css`)**:
   - Global styles and theme definitions
   - Tailwind configuration and custom theme variables

### Component Structure Pattern

Each UI component follows a consistent structure:

```tsx
// Example of a typical component structure (button.tsx)
import * as React from 'react'
import { cn } from '../lib/utils'

// Component variant definition
const buttonVariants = {
  variant: {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    // other variants...
  },
  size: {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  },
}

// Component props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

// Component implementation
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
```

### Key Architectural Decisions

1. **UI Component Organization**:

   - Core, reusable UI components live in the `packages/ui/src/ui` directory
   - Each component category has its own subdirectory
   - App-specific UI components live in the `app/ui` directory of each app
   - Component showcase pages are organized in the `app/components` directory

2. **Documentation Structure (apps/docs)**:
   - Each component category has its own directory in `app/components`
   - Documentation-specific UI components are in `app/ui`
   - Navigation is centralized in `app/nav.tsx`

## Coding Patterns

### Component Architecture

The project follows a consistent component architecture pattern:

1. **Base Components**: Foundational UI elements (buttons, inputs, badges)
2. **Compound Components**: Combinations of base components (input groups, button groups)
3. **Layout Components**: Structural elements (sections, cards)
4. **Page Components**: Full page layouts combining multiple components

### TypeScript Patterns

```tsx
// Type definitions for component props
interface StyleguideSectionProps {
  /**
   * The title of the section
   */
  title: string

  /**
   * Optional subline text that appears below the title
   */
  subline?: string

  /**
   * The content of the section
   */
  children: ReactNode

  /**
   * Optional additional CSS classes for the section container
   */
  className?: string
}

// React component with TypeScript
export const StyleguideSection: React.FC<StyleguideSectionProps> = ({ title, subline, children, className = '' }) => {
  // Implementation
}
```

### Navigation Pattern

The navigation is implemented using a structured data model:

```tsx
// Define the navigation item type
interface NavItem {
  title: string
  href: string
}

// Define the navigation group type
interface NavGroup {
  title: string
  items: NavItem[]
}

// Define the navigation data
const navigationGroups: NavGroup[] = [
  {
    title: 'Foundations',
    items: [
      { title: 'Colors', href: '/components/colors' },
      { title: 'Rhythm', href: '/components/rhythm' },
    ],
  },
  // More groups...
]
```

### Layout Patterns

The project uses consistent layout patterns:

1. **Component Layout**:

```tsx
export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-4.5rem)] pt-16 md:pt-0">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
```

2. **Styleguide Section**:

```tsx
<section className={className}>
  <div className="px-10 h-40 flex flex-col justify-center">
    <h2 className="font-semibold">{title}</h2>
    {subline && <p className="mt-1 text-muted-foreground">{subline}</p>}
  </div>
  <div className="border-t p-10 mb-5">{children}</div>
</section>
```

### Font Configuration

```tsx
// Initialize the fonts
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans', // Maps the font to the CSS variable
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono', // Maps the font to the CSS variable
})

// Apply in layout
;<body className={`${geist.variable} ${geistMono.variable} font-sans`}>{children}</body>
```

## Constraints and Rules

### Tailwind Usage Rules

1. **Color Usage**:
   - Never use default Tailwind color modifiers (e.g., `text-blue-500`)
   - Only use semantic color classes provided by the theme (e.g., `text-primary`)
   - Always pair background colors with their corresponding foreground colors

```tsx
// Correct usage
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

// Incorrect usage
<button className="bg-primary text-white">
  Primary Button
</button>
```

2. **Spacing System**:

   - Use the predefined spacing values for consistency
   - Follow the Row System for vertical rhythm

3. **Typography**:
   - Use the provided font families: `font-sans` and `font-mono`
   - Follow the text size and weight guidelines

### File Naming Conventions

- Use kebab-case (dasherized) for file names
- Component files should be named after the component they export
- Group related components in directories

## Development Workflow

### Setup and Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start the development server for the docs app
npm run dev --filter=docs
```

### Building and Testing

```bash
# Build all packages and apps
npm run build

# Build a specific app
npm run build --filter=docs

# Run linting
npm run lint
```

## Best Practices

### Code Organization

1. **Component Structure**:

   - Keep components focused on a single responsibility
   - Split large components into smaller, more manageable pieces
   - Use composition over inheritance

2. **State Management**:

   - Use React hooks for local state
   - Keep state as close as possible to where it's used

3. **Performance Considerations**:
   - Memoize expensive calculations with `useMemo`
   - Optimize re-renders with `React.memo` and `useCallback`
   - Use Next.js features like Image optimization and code splitting

### Styling Best Practices

1. **Tailwind Usage**:

   - Group related utility classes together
   - Extract common patterns into reusable components
   - Use the `className` prop for component customization

2. **Responsive Design**:

   - Design for mobile first, then enhance for larger screens
   - Use Tailwind's responsive prefixes consistently

3. **Accessibility**:
   - Ensure proper contrast ratios between text and backgrounds
   - Use semantic HTML elements
   - Include proper ARIA attributes where needed

### Documentation

1. **Component Documentation**:

   - Document props with TypeScript interfaces
   - Include usage examples
   - Document any non-obvious behaviors or edge cases

2. **Code Comments**:

   - Use JSDoc comments for functions and components
   - Explain complex logic or workarounds
   - Keep comments up-to-date with code changes

   # UI Package Import Guide

## Importing Components and Utilities

When working with the 3A-UI system, you should import components and utilities directly from the UI package using the following patterns:

### Component Imports

Components should be imported directly from their respective paths in the UI package:

```tsx
// Import a button component
import { Button, ButtonGroup } from '@3a-ui/ui/button'

// Import form components
import { Input, InputGroup } from '@3a-ui/ui/forms'
import { Label } from '@3a-ui/ui/forms'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@3a-ui/ui/forms'
import { Checkbox } from '@3a-ui/ui/forms'
import { Textarea } from '@3a-ui/ui/forms'
import { RadioGroup } from '@3a-ui/ui/forms'

// Import badge components
import { Badge } from '@3a-ui/ui/badge'

// Import slider components
import { Slider } from '@3a-ui/ui/slider'

// Import tooltip components
import { Tooltip, TooltipTrigger, TooltipContent } from '@3a-ui/ui/tooltip'
```

### Utility Imports

Utilities should be imported from the lib directory:

```tsx
// Import the cn utility for class name merging
import { cn } from '@3a-ui/ui/lib/utils'

// Import registry utilities if needed
import { registry } from '@3a-ui/ui/lib/registry'
```

### Hook Imports

Custom hooks should be imported from the hooks directory:

```tsx
// Import the useMetaColor hook
import { useMetaColor } from '@3a-ui/ui/hooks/use-meta-color'
```

### Icon Imports

Icons should be imported from lucide-react:

```tsx
import { ChevronDown, ChevronRight, Plus, Search } from 'lucide-react'
```

## Best Practices

1. **Always use package imports** - Avoid relative imports that reach into the UI package internals
2. **Import only what you need** - Use destructured imports to keep bundle size small
3. **Consistent import ordering** - Follow the pattern of React first, then external libraries, then internal packages, then local imports

```tsx
// Recommended import ordering
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'motion'
import { Button } from '@3a-ui/ui/button'
import { Input } from '@3a-ui/ui/forms'
import { cn } from '@3a-ui/ui/lib/utils'
import { useMetaColor } from '@3a-ui/ui/hooks/use-meta-color'
import { useAppData } from '../../hooks/use-app-data'
import { MyLocalComponent } from './my-local-component'
```

## Component Export Pattern

Each component directory follows a consistent export pattern through its index.ts file:

```tsx
// Example index.ts for button components
export * from './button'
export * from './button-group'
```

This allows for importing multiple related components from the same path:

```tsx
import { Button, ButtonGroup } from '@3a-ui/ui/button'
```
