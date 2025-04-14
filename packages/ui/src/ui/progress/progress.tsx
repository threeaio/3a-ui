'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@3a.solutions/ui/lib/utils'

function Progress({ className, classNameIndicator, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & { classNameIndicator?: string }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('bg-default/20 relative h-1 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn('bg-default h-full w-full flex-1 transition-all', classNameIndicator)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
