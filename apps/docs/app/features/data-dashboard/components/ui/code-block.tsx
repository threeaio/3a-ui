import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'plaintext', className }) => {
  return (
    <div className={cn('rounded-md overflow-hidden', className)}>
      <div className="bg-muted-foreground/10 px-4 py-2 text-xs flex items-center justify-between">
        <span className="">{language}</span>
      </div>
      <pre className="p-4 text-xs bg-muted overflow-auto max-h-52 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
