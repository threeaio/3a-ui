import '@3a-ui/ui/styles.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles.css'
import { ModeToggle, ThemeProvider } from '@3a.solutions/ui/lib/theme'

// Initialize the fonts
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
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

      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <div className="fixed bottom-4 right-4 z-30">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
