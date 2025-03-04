import { ReactNode } from 'react'
import ThemeSwitcher from '../ui/core-layout/theme-switcher'
import BackButton from '../ui/core-layout/back-button'
import '@3a-ui/ui/styles.css'

export default function FeaturesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-8">{children}</div>
        <BackButton />
        <div className="fixed bottom-4 right-4">
          <ThemeSwitcher />
        </div>
      </div>
    </>
  )
}
