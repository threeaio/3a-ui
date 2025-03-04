'use client'
import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { useInputGroup } from './input-group'

export interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  icon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, clearable, onClear, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [hasValue, setHasValue] = React.useState(!!props.value || !!props.defaultValue)
    const { isGroup, isFirst, isLast, error } = useInputGroup()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      onChange?.(e)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (inputRef.current) {
        inputRef.current.value = ''
        setHasValue(false)
        // Trigger native events
        const event = new Event('input', { bubbles: true })
        inputRef.current.dispatchEvent(event)

        const changeEvent = new Event('change', { bubbles: true })
        inputRef.current.dispatchEvent(changeEvent)

        onClear?.()
      }
    }

    return (
      <div
        className={cn(
          'relative flex items-center',
          isGroup && ['first:ml-0 -ml-[1px]', '[&_input]:border-r-0 last:[&_input]:border-r'],
        )}
      >
        <input
          type={type}
          ref={(node) => {
            // Handle both refs
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
            inputRef.current = node
          }}
          data-slot="input"
          className={cn(
            'border-input bg-background file:bg-background file:text-foreground placeholder:text-muted-foreground selection:bg-default selection:text-default-foreground flex h-9 w-full min-w-0 rounded-md border  px-3 py-1 text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0  file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            isGroup && [
              'rounded-none',
              isFirst && '!rounded-l-md',
              isLast && '!rounded-r-md',
              'focus-visible:relative focus-visible:z-10',
            ],
            (icon || clearable) && 'pr-9',
            className,
          )}
          onChange={handleChange}
          aria-invalid={error || props['aria-invalid']}
          {...props}
        />
        {(icon || clearable) && (
          <div className="absolute z-10 right-3 flex items-center justify-center size-4 overflow-hidden">
            {icon && (
              <div
                className={cn(
                  'absolute size-4 transition-all duration-200 ease-in-out',
                  clearable && hasValue ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0',
                )}
              >
                <div className="text-muted-foreground/70">{icon}</div>
              </div>
            )}
            {clearable && (
              <X
                className={cn(
                  'absolute size-4 cursor-pointer text-muted-foreground/70 hover:text-muted-foreground transition-all duration-200 ease-in-out',
                  hasValue ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
                )}
                onClick={handleClear}
              />
            )}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
