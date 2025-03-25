import { Badge } from '@3a-ui/ui/badge'
import { NodeGardenCanvas } from '../animations/node-garden'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* <span className="absolute bg-border w-px h-[200%] left-1/2 bottom-0 rotate-30 origin-bottom"></span> */}
      <div className="h-[calc(100vh-25rem)] min-h-[600px] flex flex-col justify-center items-start px-5 md:px-10 container mx-auto pt-20 relative z-10">
        <Badge variant="outline" className="mb-5">
          Business Applications Made Simple
        </Badge>
        <h1 className="text-2xl xl:text-2xl max-w-xl mb-5 font-mono font-extralight">
          Crafting solutions for the next wave of digitalization.
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Tailored solutions that perfectly fit your business needs, delivered on time and within budget, with a focus
          on elegant, intuitive user experiences.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-5">
          <Button size="lg" variant="primary">
            <ArrowRight className="size-4" />
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            View Showcase
          </Button>
        </div> */}
      </div>
    </section>
  )
}
