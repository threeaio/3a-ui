import { Cpu, Layers, Users } from 'lucide-react'
import { Badge } from '@3a-ui/ui/badge'

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden ">
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="text-center pb-20">
          <Badge variant="outline" className="mb-5 mx-auto">
            Why Choose Us
          </Badge>
          <h2 className="text-2xl xl:text-4xl mb-5">Solutions that make a difference</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with design excellence to create applications that not only solve your
            business challenges but are a pleasure to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-10 flex flex-col items-center text-center rounded-lg bg-card">
            <div className="size-20 flex items-center justify-center mb-5">
              <Cpu className="text-primary size-10" />
            </div>
            <h3 className="   mb-3">Customized Solutions</h3>
            <p className="text-muted-foreground">
              Applications built specifically for your unique business requirements and workflows.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-10 flex flex-col items-center text-center rounded-lg bg-card">
            <div className="h-20 w-20 flex items-center justify-center mb-5">
              <Layers className="text-primary size-10" />
            </div>
            <h3 className="   mb-3">Beautiful Interfaces</h3>
            <p className="text-muted-foreground">
              Elegant, intuitive designs that make your applications a pleasure to use.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-10 flex flex-col items-center text-center rounded-lg bg-card">
            <div className="size-20  flex items-center justify-center mb-5">
              <Users className="text-primary size-10" />
            </div>
            <h3 className="   mb-3">User-Focused</h3>
            <p className="text-muted-foreground">
              Applications that prioritize the needs and experience of your team and customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
