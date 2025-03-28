---
description: UI GUIDE
globs:
alwaysApply: true
---

# 3A-UI Library: Simplified Usage Guide

## Table of Contents

- [Introduction](#introduction)
- [Available Components](#available-components)
- [How to Import Components](#how-to-import-components)
- [Utility Functions](#utility-functions)
- [Component Usage Examples](#component-usage-examples)
  - [Button Components](#button-components)
  - [Form Components](#form-components)
  - [Badge Component](#badge-component)
  - [BadgeSelect Component](#badgeselect-component)
  - [Tooltip Component](#tooltip-component)
  - [Slider Component](#slider-component)
  - [RangeSlider Component](#rangeslider-component)
  - [Switch Component](#switch-component)
- [Layout Patterns](#layout-patterns)
- [Responsive Design](#responsive-design)
- [Accessibility Considerations](#accessibility-considerations)
- [Best Practices](#best-practices)

## Introduction

3A-UI is a modern React component library built with TypeScript, Tailwind CSS, and Radix UI primitives. This guide explains how to use the available components and utilities.

## Available Components

The library exports these main component categories:

1. **Button Components**: `Button`, `ButtonGroup`
2. **Form Components**: `Input`, `Select`, `Checkbox`, `RadioGroup`, `Label`, `Textarea`, `InputGroup`
3. **Badge Component**: `Badge`
4. **BadgeSelect Component**: `BadgeSelect`
5. **Tooltip Components**: `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`
6. **Slider Component**: `Slider`
7. **RangeSlider Component**: `RangeSlider`, `SliderTicks`
8. **Switch Component**: `Switch`

## How to Import Components

Import components directly from their respective packages:

```tsx
// Button components
import { Button, ButtonGroup } from '@3a-ui/ui/button'

// Form components
import {
  Input,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Checkbox,
  RadioGroup,
  Label,
  Textarea,
  InputGroup,
} from '@3a-ui/ui/forms'

// Badge component
import { Badge } from '@3a-ui/ui/badge'

// BadgeSelect component
import { BadgeSelect } from '@3a-ui/ui/badge-select'

// Tooltip components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@3a-ui/ui/tooltip'

// Slider components
import { Slider } from '@3a-ui/ui/slider'
import { RangeSlider } from '@3a-ui/ui/slider/range-slider'
import { SliderTicks } from '@3a-ui/ui/slider/slider-ticks'

// Switch component
import { Switch } from '@3a-ui/ui/switch'

// Utility functions
import { cn } from '@3a-ui/ui/lib/utils'
```

## Utility Functions

The library exports a utility function:

- **cn**: A utility for merging Tailwind CSS classes with proper precedence using `clsx` and `tailwind-merge`

```tsx
import { cn } from '@3a-ui/ui/lib/utils'

// Usage
;<div className={cn('base-class', condition && 'conditional-class')}>Content</div>
```

## Component Usage Examples

### Button Components

Buttons come in various variants, sizes, and states:

```tsx
// Basic button
<Button>Standard</Button>

// Button variants
<Button variant="primary">Call to Action</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>

// Icon button
<Button size="icon" variant="outline">
  <Mail className="h-4 w-4" />
</Button>

// Button with icon
<Button>
  <Plus className="size-4 mr-2" />
  Add Item
</Button>

// Button states
<Button disabled>Disabled</Button>
<Button>
  <Loader2 className="size-4 animate-spin mr-2" />
  Loading
</Button>

// Button groups
<ButtonGroup>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</ButtonGroup>

<ButtonGroup variant="outline" size="icon">
  <Button><Minus className="size-4" /></Button>
  <Button><Plus className="size-4" /></Button>
  <Button><Pen className="size-4" /></Button>
</ButtonGroup>
```

### Form Components

Form components for collecting user input:

```tsx
// Basic input
<Input placeholder="Enter text..." />

// Input with icon and clear button
<Input
  placeholder="Search..."
  icon={<Search className="size-4" />}
  clearable
/>
      <StyleguideExplanation>
        <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
          The BadgeSelect component combines the visual appearance of a badge with the functionality of a select
          dropdown. It features:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground max-w-2xl leading-tight mb-5 space-y-2">
          <li>
            <span className="text-foreground font-medium">Compact Design:</span> Takes minimal space while maintaining
            functionality
          </li>
          <li>
            <span className="text-foreground font-medium">Smooth Animations:</span> Elegant transitions when changing
            values
          </li>
          <li>
            <span className="text-foreground font-medium">Badge Variants:</span> Supports all badge color variants
          </li>
          <li>
            <span className="text-foreground font-medium">Controlled & Uncontrolled:</span> Can be used in both modes
          </li>
          <li>
            <span className="text-foreground font-medium">Accessibility:</span> Fully keyboard navigable and screen
            reader friendly
          </li>
        </ul>
      </StyleguideExplanation>
// Input group
<InputGroup>
  <Select>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Filter" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="name">Name</SelectItem>
      <SelectItem value="email">Email</SelectItem>
    </SelectContent>
  </Select>
  <Input clearable placeholder="Search..." />
</InputGroup>

// Form with label
<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="your@email.com" />
</div>

// Textarea
<Textarea placeholder="Enter description..." />

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Radio group
<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### Badge Component

Badges for displaying status or counts:

```tsx
<Badge>New</Badge>
<Badge variant="outline">Status</Badge>
<Badge variant="secondary">Count: 5</Badge>
```

### BadgeSelect Component

BadgeSelect combines the visual appearance of a badge with select dropdown functionality:

```tsx
// Define options
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

// Basic usage
<BadgeSelect
  label="Status"
  options={statusOptions}
  defaultValue="active"
/>

// With different variants
<BadgeSelect
  label="Priority"
  options={priorityOptions}
  variant="primary"
/>

<BadgeSelect
  label="Status"
  options={statusOptions}
  variant="destructive"
/>

// Controlled component
const [status, setStatus] = useState('active')

<BadgeSelect
  label="Status"
  options={statusOptions}
  value={status}
  onValueChange={setStatus}
/>

// Disabled state
<BadgeSelect
  label="Status"
  options={statusOptions}
  disabled
/>

// Custom class for dropdown content
<BadgeSelect
  label="Status"
  options={statusOptions}
  contentClassName="w-40"
/>
```

Key features:

- Compact design while maintaining functionality
- Smooth width animations when changing values
- Supports all badge color variants
- Can be used in both controlled and uncontrolled modes
- Fully accessible (keyboard navigable and screen reader friendly)

### Tooltip Component

Tooltips for providing additional information:

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button size="icon">
        <Info className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Additional information here</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Slider Component

Slider for selecting values from a range:

```tsx
<Slider defaultValue={[50]} min={0} max={100} step={1} className="w-64" />
```

### RangeSlider Component

RangeSlider for selecting a range of values:

```tsx
// Basic range slider
<RangeSlider
  min={0}
  max={100}
  step={1}
  defaultValue={[25, 75]}
/>

// With handle constraints
<RangeSlider
  min={0}
  max={100}
  defaultValue={[25, 75]}
  leftHandleMax={50}  // Left handle can't go beyond 50
  rightHandleMin={50} // Right handle can't go below 50
/>

// Controlled component
const [range, setRange] = useState<[number, number]>([25, 75])

<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
/>

// With ticks
<RangeSlider
  min={0}
  max={100}
  defaultValue={[25, 75]}
  showTicks
  tickCount={5}
  showTickLabels
/>

// Custom tick labels
<RangeSlider
  min={0}
  max={100}
  defaultValue={[25, 75]}
  showTicks
  tickCount={5}
  showTickLabels
  getTickLabel={(value) => `$${value}`}
/>
```

The SliderTicks component can also be used independently:

```tsx
<SliderTicks min={0} max={100} step={10} tickCount={5} showTickLabels getTickLabel={(value) => `${value}%`} />
```

### Switch Component

Switch for toggling between two states:

```tsx
// Basic switch
<Switch />

// With label
<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Controlled switch
const [enabled, setEnabled] = useState(false)

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>

// Disabled state
<Switch disabled />
<Switch checked disabled />
```

## Layout Patterns

### Row System

The UI system uses a consistent row system for vertical rhythm:

```tsx
// Compact row for Button-Groups and/or Form-Groups
// Or other UI-Components that need just a minimal spacing around

// simple example without background and ButtonGroup
<div className="h-13 flex items-center">
  <ButtonGroup variant="outline" size="icon">
    <Button><Minus className="size-4" /></Button>
    <Button><Plus className="size-4" /></Button>
    <Button><Pen className="size-4" /></Button>
  </ButtonGroup>
</div>

// more complex example without background and Input-Group
<div className="h-13 px-2 lex rounded-xl bg-background justify-between items-center">
<div className="flex items-center gap-2">
    <InputGroup>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Input className="w-60" placeholder="Search by name..." icon={<Search className="size-4" />} clearable />
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
    </InputGroup>
    <Badge variant="primary">
      <Check />
      Saved
    </Badge>
    <Badge variant="destructive">
      <AlertTriangle />
      Problem
    </Badge>
  </div>

  <ButtonGroup variant="outline">
    <Button variant="outline">
      <Minus className="size-4" />
    </Button>
    <Button variant="outline">
      <Plus className="size-4" />
    </Button>
  </ButtonGroup>
</div>

// Standard row
<div className="h-20 px-5 flex items-center">
  {/* Content */}
</div>

// Double-height row
<div className="h-40 p-10 flex flex-col justify-center">
  <h2 className="font-semibold">Heading</h2>
  <p className="text-muted-foreground">Content</p>
</div>
```

### Card Patterns

Cards for grouping related content:

```tsx
// Basic card
<div className="bg-card text-card-foreground p-5 rounded-lg border border-border">
  <h3 className="font-semibold mb-2.5">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

## Responsive Design

The UI system uses a mobile-first approach:

```tsx
// Responsive layout
<div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
  {/* Content */}
</div>

// Responsive text
<p className="text-base md:text-sm">
  This text adjusts size on different screens.
</p>
```

## Accessibility Considerations

All components follow accessibility best practices:

```tsx
// Accessible form element
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>

// Accessible icon button
<Button
  size="icon"
  aria-label="Add item"
>
  <Plus />
</Button>
```

## Best Practices

1. **Use composition over configuration** - Build complex UIs by composing simple components
2. **Keep components focused** - Each component should have a single responsibility
3. **Implement consistent props patterns** - Use consistent prop names and defaults
4. **Provide sensible defaults** - Components should work well with minimal configuration
5. **Follow the Row System** - Use the predefined height classes for consistent vertical rhythm
6. **Use consistent spacing** - Apply the spacing system consistently
7. **Implement responsive patterns** - Design for mobile first, then enhance for larger screens
8. **Maintain content width constraints** - Use `max-w-2xl` for readable text content
9. **Ensure accessibility** - All interactive elements should be keyboard accessible and properly labeled

---

This guide is a living document and will be updated as the UI system evolves.
