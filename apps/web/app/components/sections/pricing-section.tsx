import { Check } from 'lucide-react'
import { Button } from '@3a-ui/ui/button'
import { Badge } from '@3a-ui/ui/badge'

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <span className="absolute bg-border w-px h-[200%] left-1/2 -top-1/3 rotate-30"></span>
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-5 mx-auto">
            Pricing Plans
          </Badge>
          <h2 className="text-2xl xl:text-4xl mb-5">
            <span className="inline-block bg-primary text-primary-foreground px-2 py-0 mb-1 rounded-md">
              Transparent
            </span>
            ,
            <span className="inline-block bg-primary text-primary-foreground px-2 py-0 mb-1 rounded-md ml-2">
              Flexible
            </span>{' '}
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the option that works best for your business needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Basic Plan */}
          <div className="bg-card border border-border rounded-lg p-10 flex flex-col">
            <h3 className="  text-xl mb-2">Starter</h3>
            <p className="text-muted-foreground mb-5">For small businesses getting started</p>
            <div className="mb-5">
              <span className="text-4xl  ">$3,999</span>
              <span className="text-muted-foreground"> / project</span>
            </div>

            <div className="space-y-3 mb-10 flex-grow">
              {[
                'Custom application development',
                'Basic features and workflows',
                'Clean, intuitive interface',
                '30 days of support',
                'Training documentation',
              ].map((feature, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Check className="text-primary size-4 flex-shrink-0" />
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" size="lg" className="w-full">
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-card border-2 border-primary rounded-lg p-10 flex flex-col relative">
            <div className="absolute -top-px -right-px bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
              Most Popular
            </div>
            <h3 className="  text-xl mb-2">Professional</h3>
            <p className="text-muted-foreground mb-5">For growing businesses with complex needs</p>
            <div className="mb-5">
              <span className="text-4xl  ">$8,999</span>
              <span className="text-muted-foreground"> / project</span>
            </div>

            <div className="space-y-3 mb-10 flex-grow">
              {[
                'Advanced custom application',
                'Complex workflows and integrations',
                'Responsive design for all devices',
                'Data migration included',
                '90 days of priority support',
                'Comprehensive training',
              ].map((feature, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Check className="text-primary size-4 flex-shrink-0" />
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" size="lg" className="w-full">
              Get Started
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-card border border-border rounded-lg p-10 flex flex-col">
            <h3 className="  text-xl mb-2">Enterprise</h3>
            <p className="text-muted-foreground mb-5">For large organizations with specialized requirements</p>
            <div className="mb-5">
              <span className="text-4xl  ">Custom</span>
              <span className="text-muted-foreground"> pricing</span>
            </div>

            <div className="space-y-3 mb-10 flex-grow">
              {[
                'Fully customized enterprise solution',
                'Advanced security features',
                'Multiple integrations',
                'Dedicated project manager',
                'Ongoing maintenance and support',
                'Regular updates and enhancements',
                'On-site training and workshops',
              ].map((feature, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Check className="text-primary size-4 flex-shrink-0" />
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" size="lg" className="w-full">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
