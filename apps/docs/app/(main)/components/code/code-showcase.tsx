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
        <Code code={TypeScriptExample} language="typescript" theme={theme} />
      </StyleguideRender>

      {/* With Title */}
      <StyleguideRender label="With Title">
        <Code code={TypeScriptExample} language="typescript" title="Counter.tsx" theme={theme} />
      </StyleguideRender>

      {/* Line Numbers */}
      <StyleguideRender label="Line Numbers">
        <Code code={TypeScriptExample} language="typescript" showLineNumbers theme={theme} />
      </StyleguideRender>

      {/* Different Languages */}
      <StyleguideRender label="Language Support">
        <h3 className="font-semibold mb-5">TypeScript</h3>
        <Code code={TypeScriptExample} language="typescript" title="counter.ts" showLineNumbers theme={theme} />

        <h3 className="font-semibold mb-5 mt-10">Bash</h3>
        <Code code={BashExample} language="bash" title="backup.sh" showLineNumbers theme={theme} />

        <h3 className="font-semibold mb-5 mt-10">JSON</h3>
        <Code code={JSONExample} language="json" title="package.json" showLineNumbers theme={theme} />
      </StyleguideRender>
    </StyleguideSection>
  )
}
