'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { badgeVariants } from '@3a.solutions/ui/badge'
import { cn } from '@3a.solutions/ui/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Select, SelectContent, SelectItem, SelectValue } from '@3a.solutions/ui/forms'

export interface BadgeSelectOption {
  value: string
  label: string
}

export interface BadgeSelectProps {
  label: string
  options: BadgeSelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline'
  className?: string
  contentClassName?: string
  disabled?: boolean
}

export function BadgeSelect({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = '-',
  variant = 'default',
  className,
  contentClassName,
  disabled = false,
}: BadgeSelectProps) {
  const [selectedLabel, setSelectedLabel] = React.useState<string>(placeholder)
  const measureRef = React.useRef<HTMLButtonElement>(null)
  const newSelectedLabelRef = React.useRef<HTMLSpanElement>(null)
  const [currentWidth, setCurrentWidth] = React.useState<string>('auto')

  // Initial width calculation using useLayoutEffect to ensure it happens before paint
  React.useLayoutEffect(() => {
    if (measureRef.current && newSelectedLabelRef.current) {
      newSelectedLabelRef.current.textContent = selectedLabel
      const width = `${measureRef.current.getBoundingClientRect().width}px`
      setCurrentWidth(width)
    }
  }, [selectedLabel])

  // Update selected label when value changes
  React.useEffect(() => {
    const newLabel = value
      ? options.find((option) => option.value === value)?.label || placeholder
      : defaultValue
        ? options.find((option) => option.value === defaultValue)?.label || placeholder
        : placeholder
    setSelectedLabel(newLabel)
  }, [value, defaultValue, options, placeholder])

  // Handle value change with animation
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      const newOption = options.find((option) => option.value === newValue)
      const newLabel = newOption?.label || placeholder

      // Calculate new width
      if (measureRef.current && newSelectedLabelRef.current) {
        newSelectedLabelRef.current.textContent = newLabel
        const width = `${measureRef.current.getBoundingClientRect().width}px`
        setCurrentWidth(width)
      }

      // Trigger callback
      onValueChange?.(newValue)
    },
    [options, placeholder, onValueChange],
  )

  // Hidden span for measuring text width
  const measureSpan = (
    <button
      ref={measureRef}
      aria-hidden="true"
      tabIndex={-1}
      className={cn(
        'border-none shadow-none',
        badgeVariants({ variant }),
        'select-none cursor-pointer pr-1.5 pl-3',
        'absolute opacity-0 bg-white pointer-events-none',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 w-full">
        <div className="flex-1 min-w-0">
          <span className="mr-1 overflow-hidden">{label}:</span>
          <span ref={newSelectedLabelRef}>{selectedLabel}</span>
        </div>
        <ChevronDownIcon className="size-3 shrink-0" />
      </div>
    </button>
  )

  return (
    <div className="relative">
      {measureSpan}
      <Select value={value} defaultValue={defaultValue} onValueChange={handleValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            'flex items-center gap-1.5 w-full text-xs text-left justify-start',
            badgeVariants({ variant }),
            'select-none cursor-pointer pr-1.5 pl-3 min-h-0 py-1.5',
            disabled && 'opacity-50 cursor-not-allowed',
            
            className,
          )}
          style={{
            width: currentWidth,
            transition: 'width 150ms ease-out',
          }}
        >
          <div className="flex items-center gap-1.5 w-full text-xs text-left">
            <div className="flex-1 min-w-0">
              <span className="text-inherit opacity-50 mr-1 overflow-hidden">{label}:</span>
              <SelectValue placeholder={placeholder} className="inline" />
            </div>
            <ChevronDownIcon className="size-3 shrink-0 ml-auto" />
          </div>
        </SelectPrimitive.Trigger>
        <SelectContent className={contentClassName} align="start">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
