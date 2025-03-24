'use client'

import StyleguideRender from '@/ui/styleguide-render'
import StyleguideSection from '@/ui/styleguide-section'
import { Code } from '@3a.solutions/ui/code'

const TypeScriptExample = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`

const BashExample = `#!/bin/bash
# Simple script to backup a directory

SOURCE_DIR="$HOME/documents"
BACKUP_DIR="$HOME/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$TIMESTAMP.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create the backup
tar -czf "$BACKUP_DIR/$BACKUP_FILE" "$SOURCE_DIR"

echo "Backup completed: $BACKUP_DIR/$BACKUP_FILE"`

const JSONExample = `{
  "name": "code-component",
  "version": "1.0.0",
  "description": "A syntax highlighting code component",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": [
    "code",
    "syntax",
    "highlighting"
  ],
  "author": "3A Solutions",
  "license": "MIT"
}`

export function CodeShowcase() {
  const theme = 'poimandres'

  return (
    <StyleguideSection title="Code" subline="Component for displaying syntax-highlighted code blocks">
      {/* Basic Example */}
      <StyleguideRender label="Basic Example">
        <div className="space-y-6">
          <Code code={TypeScriptExample} language="typescript" theme={theme} />
        </div>
      </StyleguideRender>

      {/* With Title */}
      <StyleguideRender label="With Title">
        <div className="space-y-6">
          <Code code={TypeScriptExample} language="typescript" title="Counter.tsx" theme={theme} />
        </div>
      </StyleguideRender>

      {/* Line Numbers */}
      <StyleguideRender label="Line Numbers">
        <div className="space-y-6">
          <Code code={TypeScriptExample} language="typescript" showLineNumbers theme={theme} />
        </div>
      </StyleguideRender>

      {/* Different Languages */}
      <StyleguideRender label="Language Support">
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">TypeScript</h3>
          <Code code={TypeScriptExample} language="typescript" title="counter.ts" showLineNumbers theme={theme} />

          <h3 className="text-lg font-medium mb-4 mt-8">Bash</h3>
          <Code code={BashExample} language="bash" title="backup.sh" showLineNumbers theme={theme} />

          <h3 className="text-lg font-medium mb-4 mt-8">JSON</h3>
          <Code code={JSONExample} language="json" title="package.json" showLineNumbers theme={theme} />
        </div>
      </StyleguideRender>

      {/* API Reference */}
      <StyleguideRender label="API Reference">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">The Code component accepts the following props:</p>
          <Code
            code={`interface CodeProps {
  /**
   * The code string to be highlighted
   */
  code: string;
  
  /**
   * The programming language for syntax highlighting
   * @default "typescript"
   */
  language?: BundledLanguage;
  
  /**
   * The theme to use for syntax highlighting
   * @default "github-dark"
   */
  theme?: string;
  
  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;
  
  /**
   * Optional title for the code block
   */
  title?: string;
  
  /**
   * Visual variant of the code block
   * @default "default"
   */
  variant?: "default" | "primary";
}`}
            language="typescript"
            theme={theme}
          />
        </div>
      </StyleguideRender>
    </StyleguideSection>
  )
}
