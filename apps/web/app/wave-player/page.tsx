'use client'
import { ThreeStripes } from '../components/animations/three-stripes/three-stripes'
import { ThreeStripesProvider } from '../components/animations/three-stripes/three-stripes-context'
import { ThreeStripesControls } from '../components/animations/three-stripes/three-stripes-controls'
import { Navigation } from '../components/navigation'
import { ScrollToTop } from '../components/scroll-to-top'

export default function Page() {
  return (
    <main className="min-h-screen relative">
      
        <div className="absolute h-screen inset-0 z-0">
          <ThreeStripes />
        </div>

        <div className="relative">
          <Navigation />
          <ScrollToTop />
          <ThreeStripesControls />
        </div>
    </main>
  )
}
