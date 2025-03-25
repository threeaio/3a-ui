import { Navigation } from './components/navigation'
import { ScrollToTop } from './components/scroll-to-top'
import { HeroSection } from './components/sections/hero-section'
import { FeaturesSection } from './components/sections/features-section'
import { BenefitsSection } from './components/sections/benefits-section'
import { TestimonialsSection } from './components/sections/testimonials-section'
import { PricingSection } from './components/sections/pricing-section'
import { ContactSection } from './components/sections/contact-section'
import { FooterSection } from './components/sections/footer-section'
import { NodeGardenCanvas } from './components/animations/node-garden'

export default function Page() {
  return (
    <main className="min-h-screen relative">
      {/* <div className="fixed h-screen inset-0">
        <NodeGardenCanvas />
      </div> */}

      <Navigation />
      <ScrollToTop />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
