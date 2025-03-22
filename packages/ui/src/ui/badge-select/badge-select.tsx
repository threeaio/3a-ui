'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@3a.solutions/ui/popover'
import { Badge, badgeVariants } from '@3a.solutions/ui/badge'
import { cn } from '@3a.solutions/ui/lib/utils'

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
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = '-',
  variant = 'default',
  className,
  contentClassName,
  disabled = false,
}: BadgeSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const [selectedLabel, setSelectedLabel] = React.useState<string>(placeholder)
  const measureRef = React.useRef<HTMLButtonElement>(null)
  const newSelectedLabelRef = React.useRef<HTMLSpanElement>(null)
  const [currentWidth, setCurrentWidth] = React.useState<string>('auto')
  const value = controlledValue !== undefined ? controlledValue : internalValue

  // Initial width calculation using useLayoutEffect to ensure it happens before paint
  React.useLayoutEffect(() => {
    if (measureRef.current && newSelectedLabelRef.current) {
      newSelectedLabelRef.current.textContent = selectedLabel
      const width = `${measureRef.current.getBoundingClientRect().width}px`
      setCurrentWidth(width)
    }
  }, [selectedLabel])

  // We can now remove the duplicate calculation in the first useEffect
  React.useEffect(() => {
    const newLabel = value ? options.find((option) => option.value === value)?.label || placeholder : placeholder
    setSelectedLabel(newLabel)

    // Width calculation is now handled by useLayoutEffect when selectedLabel changes
  }, [value, options, placeholder])

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

      setInternalValue(newValue)

      // Trigger callback
      onValueChange?.(newValue)

      // Close popover
      setOpen(false)
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
      <Popover open={open} onOpenChange={!disabled ? setOpen : undefined}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              badgeVariants({ variant }),
              'select-none cursor-pointer pr-1.5 pl-3 text-left',
              disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            style={{
              width: currentWidth,
              transition: 'width 150ms ease-out',
            }}
          >
            <div className="flex items-center gap-1.5 w-full text-xs">
              <div className="flex-1 min-w-0">
                <span className="text-inherit opacity-50 mr-1 overflow-hidden">{label}:</span>
                <span>{selectedLabel}</span>
              </div>
              <ChevronDownIcon className="size-3 shrink-0" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto min-w-[180px] p-0', contentClassName)} align="start">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  'flex items-center px-3 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground',
                  value === option.value && 'bg-accent/50',
                )}
                onClick={() => handleValueChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
