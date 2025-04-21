import '@3a-ui/ui/styles.css'
import type { Metadata } from 'next'
//import { Geist, Geist_Mono } from 'next/font/google'
import { Geist, JetBrains_Mono } from 'next/font/google'
import './styles.css'
import { ModeToggle, ThemeProvider } from '@3a.solutions/ui/lib/theme'
import { ThreeStripesProvider } from './components/animations/three-stripes/three-stripes-context'

// Initialize the fonts
const fontSans = Geist({
  subsets: ['latin'],

  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: '3A - Customized Business Applications',
  description: 'Customized, affordable and beautiful business applications built for your needs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>

      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThreeStripesProvider>{children}</ThreeStripesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
