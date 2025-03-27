import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Card } from './card'

interface ChartContainerProps {
  title: string
  className?: string
  children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, className, children }) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="p-5 pb-2">
        <h3 className="text-sm ">{title}</h3>
      </div>
      <div className="p-5 pt-0">{children}</div>
    </Card>
  )
}

export default ChartContainer
