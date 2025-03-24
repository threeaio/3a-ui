'use client'

import { JSX, useLayoutEffect, useState } from 'react'
import { highlight } from './shared'
import { cn } from '@3a.solutions/ui/lib/utils'
import './code.css'
import type { BundledLanguage, BundledTheme } from 'shiki/bundle/web' assert { 'resolution-mode': 'require' }

export interface CodeProps {
  /**
   * The code string to be highlighted
   */
  code: string

  /**
   * The programming language for syntax highlighting
   * @default "typescript"
   */
  language?: BundledLanguage

  /**
   * The theme to use for syntax highlighting
   * @default "poimandres"
   */
  theme?: BundledTheme

  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean

  /**
   * Optional title for the code block
   */
  title?: string

  /**
   * Visual variant of the code block
   * @default "default"
   */
  variant?: 'default' | 'primary'

  /**
   * Optional initial pre-rendered JSX
   */
  initial?: JSX.Element

  /**
   * Additional CSS class names
   */
  className?: string
}

export function Code({
  code,
  language = 'typescript',
  theme = 'monokai',
  showLineNumbers = false,
  title,
  initial,
  className,
}: CodeProps) {
  const [nodes, setNodes] = useState<JSX.Element | undefined>(initial)

  useLayoutEffect(() => {
    void highlight(code, language as BundledLanguage, theme).then(setNodes)
  }, [code, language, theme])

  const containerClasses = cn(
    'relative rounded-md overflow-hidden border bg-muted mb-6 [&_pre]:!bg-gray-dark',
    showLineNumbers && 'line-numbers',
    className,
  )

  return (
    <div className={containerClasses}>
      {title && (
        <div className="px-5 py-3 font-mono text-sm border-b bg-muted">
          <span>{title}</span>
        </div>
      )}
      <div className="m-0 overflow-x-auto">
        {nodes ?? <div className="p-5 font-mono text-sm text-muted-foreground">Loading...</div>}
      </div>
    </div>
  )
}
