import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@3a.solutions/ui/tooltip'

interface TooltipWrapperProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ content, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper
