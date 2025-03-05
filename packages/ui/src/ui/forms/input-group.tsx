'use client'

import * as React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'

interface InputGroupContextValue {
  isGroup: boolean
  isFirst: boolean
  isLast: boolean
  error?: boolean
  behavior?: 'default' | 'distribute'
  isBypassed?: boolean
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  isGroup: false,
  isFirst: false,
  isLast: false,
})

export const useInputGroup = () => React.useContext(InputGroupContext)

interface InputGroupProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  error?: boolean
  behavior?: 'default' | 'distribute'
  breakpoint?: number
}

function InputGroup({ className, children, error, behavior = 'default', breakpoint, ...props }: InputGroupProps) {
  const [isBypassed, setIsBypassed] = React.useState(false)

  React.useEffect(() => {
    if (!breakpoint) return

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handleChange = (e: MediaQueryListEvent) => setIsBypassed(e.matches)

    // Initial check
    setIsBypassed(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  const childrenArray = React.Children.toArray(children).filter(React.isValidElement)

  const processedChildren = childrenArray.map((child, index) => {
    if (!React.isValidElement(child)) return child

    return (
      <InputGroupContext.Provider
        key={index}
        value={{
          isGroup: !isBypassed,
          isFirst: index === 0,
          isLast: index === childrenArray.length - 1,
          error,
          behavior,
          isBypassed,
        }}
      >
        {child}
      </InputGroupContext.Provider>
    )
  })

  return (
    <div
      className={cn(isBypassed ? 'flex flex-col gap-5' : behavior === 'default' ? 'inline-flex' : 'flex', className)}
      role="group"
      data-error={error ? '' : undefined}
      {...props}
    >
      {processedChildren}
    </div>
  )
}

export { InputGroup }
