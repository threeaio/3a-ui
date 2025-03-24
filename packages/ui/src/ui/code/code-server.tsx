import { highlight } from './shared'
import { Code } from './code'
import type { CodeProps } from './types'

export async function CodeServer(props: CodeProps) {
  const { code, language = 'typescript', theme = 'github-dark' } = props

  // Pre-render the code on the server
  const initial = await highlight(code, language as any, theme)

  // Pass the pre-rendered code to the client component
  return <Code {...props} initial={initial} />
}
