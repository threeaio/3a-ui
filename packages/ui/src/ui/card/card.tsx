import * as React from 'react'

import { cn } from '@3a.solutions/ui/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  //
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card  text-card-foreground  flex flex-col gap-5 rounded-2xl py-10',
        'bg-gradient-to-b  shadow-lg border  from-card to-[color-mix(in_srgb,var(--background)_100%,var(--card))]',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-10 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-7.5',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn('leading-none text-sm font-semibold', className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-10', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center -mb-10 pb-7.5 rounded-b-lg bg-card/50 px-10 [.border-t]:pt-7.5', className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
