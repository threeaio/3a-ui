'use client'

import * as React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'

interface InputGroupContextValue {
  isGroup: boolean
  isFirst: boolean
  isLast: boolean
  error?: boolean
  behavior?: 'default' | 'distribute'
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
}

function InputGroup({ className, children, error, behavior = 'default', ...props }: InputGroupProps) {
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement)

  const processedChildren = childrenArray.map((child, index) => {
    if (!React.isValidElement(child)) return child

    return (
      <InputGroupContext.Provider
        key={index}
        value={{
          isGroup: true,
          isFirst: index === 0,
          isLast: index === childrenArray.length - 1,
          error,
          behavior,
        }}
      >
        {child}
      </InputGroupContext.Provider>
    )
  })

  return (
    <div
      className={cn(behavior === 'default' ? 'inline-flex' : 'flex', className)}
      role="group"
      data-error={error ? '' : undefined}
      {...props}
    >
      {processedChildren}
    </div>
  )
}

export { InputGroup }
