import '@3a-ui/ui/styles.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles.css'

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let isDark = window.localStorage.getItem('theme')
                if (isDark === 'system' || !isDark) {
                  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                } else {
                  isDark = isDark === 'dark'
                }
                if (isDark) {
                  document.documentElement.classList.add('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>{children}</body>
    </html>
  )
}
