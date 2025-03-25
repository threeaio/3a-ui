import { Check } from 'lucide-react'
import { Badge } from '@3a-ui/ui/badge'

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
          <div className="flex-1">
            <Badge variant="outline" className="mb-5">
              Why It Matters
            </Badge>
            <h2 className="text-2xl xl:text-4xl mb-5">Transform Your Business Operations</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Our business applications don't just solve problems - they create opportunities for growth, efficiency,
              and competitive advantage.
            </p>

            <div className="space-y-5">
              {[
                'Streamlined workflows that save time and reduce errors',
                'Improved data management and insights',
                'Enhanced team collaboration and productivity',
                'Reduced operational costs and manual work',
                'Adaptable solutions that grow with your business',
              ].map((benefit, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                    <Check className="text-primary size-3" />
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            {/* Placeholder for a benefit illustration/image */}
            <div className="w-full h-[400px] bg-muted rounded-lg border border-border flex items-center justify-center text-muted-foreground">
              Benefit Illustration
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
