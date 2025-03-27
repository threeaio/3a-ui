import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('bg-card text-card-foreground rounded-lg', className)} {...props}>
      {children}
    </div>
  )
}

export default Card
