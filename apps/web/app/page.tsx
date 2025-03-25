import { Navigation } from './components/navigation'
import { ScrollToTop } from './components/scroll-to-top'
import { HeroSection } from './components/sections/hero-section'
import { FeaturesSection } from './components/sections/features-section'
import { BenefitsSection } from './components/sections/benefits-section'
import { TestimonialsSection } from './components/sections/testimonials-section'
import { PricingSection } from './components/sections/pricing-section'
import { ContactSection } from './components/sections/contact-section'
import { FooterSection } from './components/sections/footer-section'
import { ThreeStripes } from './components/animations/three-stripes'
import { WordListSection } from './components/sections/word-list-section'

export default function Page() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute h-screen inset-0 z-0">
        <ThreeStripes />
      </div>
      <div className="relative">
        <Navigation />
        <ScrollToTop />
        <HeroSection />
        <WordListSection />
        <FeaturesSection />
        {/* <BenefitsSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <PricingSection /> */}
        {/* <ContactSection /> */}
        <FooterSection />
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-100 z-10 pointer-events-none"></div>
      </div>
    </main>
  )
}
