import { cn } from '@3a-ui/ui/lib/utils'
import React from 'react'

interface StyleguideExplanationProps {
  /**
   * The content of the explanation
   */
  children: React.ReactNode

  /**
   * Optional additional CSS classesds
   */
  className?: string
}

/**
 * A component for adding detailed explanations to styleguide sections.
 * This can be used to provide context, usage guidelines, or additional information
 * about the components being showcased.
 */
export const StyleguideExplanation: React.FC<StyleguideExplanationProps> = ({ children, className }) => {
  return (
    <div className={cn('pb-5', className)}>
      <div className="">{children}</div>
    </div>
  )
}

export default StyleguideExplanation
