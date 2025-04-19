import {
  ArrowRight,
  ArrowBigRight,
  ArrowBigRightDash,
  ArrowRightCircleIcon,
  ArrowRightFromLine,
  ArrowRightIcon,
  Check,
} from 'lucide-react'

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold uppercase leading-[1em] tracking-tight xl:text-2xl mb-10">
              Transform Your
              <br />
              Business Operations
            </h2>
            <p className="text-sm opacity-80 mb-10 max-w-2xl">
              Our business applications don't just solve problems - they create opportunities for growth, efficiency,
              and competitive advantage.
            </p>

            <div className="space-y-5 border-t border-border pt-10">
              {[
                'Streamlined workflows that save time and reduce errors',
                'Improved data management and insights',
                'Enhanced team collaboration and productivity',
                'Reduced operational costs and manual work',
                'Adaptable solutions that grow with your business',
              ].map((benefit, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <span className="inline-block">
                    <ArrowRight className="size-10" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm opacity-80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {/* Placeholder for a benefit illustration/image */}
            <div className="w-full h-[400px] border border-border flex items-center justify-center">
              <span className="text-sm opacity-80">Benefit Illustration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
