import { ReactNode } from 'react'
import { ModeToggle } from '@3a.solutions/ui/lib/theme'
import BackButton from '../../ui/core-layout/back-button'
import '@3a-ui/ui/styles.css'

export default function FeaturesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen">
        {children}
        <BackButton />
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </>
  )
}
