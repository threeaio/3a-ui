import type { JSX } from 'react'
import type { BundledLanguage, BundledTheme } from 'shiki/bundle/web' assert { 'resolution-mode': 'require' }
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

export async function highlight(code: string, lang: BundledLanguage, theme: BundledTheme = 'github-dark') {

  const {toJsxRuntime} = await import('hast-util-to-jsx-runtime')
  const {codeToHast} = await import('shiki')

  const out = await codeToHast(code, {
    lang,
    theme
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
} 
