import { Badge } from '@3a-ui/ui/badge'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden ">
      <span className="absolute bg-border w-px h-[200%] left-1/2 top-0 rotate-30 origin-top"></span>
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-5 mx-auto">
            Success Stories
          </Badge>
          <h2 className="text-2xl xl:text-4xl mb-5">
            <span className="inline-block bg-primary text-primary-foreground px-2 py-0 mb-1 rounded-md">Trusted</span>{' '}
            by
            <span className="inline-block bg-primary text-primary-foreground px-2 py-0 mb-1 rounded-md ml-2">
              Leaders
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it - hear from businesses that have transformed their operations with our solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Testimonial 1 */}
          <div className="bg-card rounded-lg p-10">
            <p className="italic text-muted-foreground mb-5">
              "The custom application developed for our team has streamlined our workflow process, reducing time spent
              on manual tasks by 60%. The interface is intuitive and the support has been excellent."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10"></div>
              <div>
                <p className=" ">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Operations Director, TechCorp</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-card rounded-lg p-10">
            <p className="italic text-muted-foreground mb-5">
              "We needed a solution that could adapt to our unique business model, and that's exactly what we got. The
              application is beautiful, fast, and has helped us scale our operations efficiently."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10"></div>
              <div>
                <p className=" ">Michael Chen</p>
                <p className="text-sm text-muted-foreground">CEO, GrowthMetrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mt-20">
          <p className="text-center text-sm text-muted-foreground mb-10">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center gap-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-32 bg-card/50 rounded flex items-center justify-center">
                <span className="text-muted-foreground">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
