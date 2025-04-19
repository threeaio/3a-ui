import { Avatar, AvatarImage } from '@3a-ui/ui/avatar'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden">
      {/* <span className="absolute bg-border w-px h-[200%] left-1/2 top-0 rotate-30 origin-top"></span> */}
      <div className="container mx-auto px-5 md:px-10 py-20 relative z-10">
        <div className="mb-20">
          <h2 className="text-2xl font-extrabold uppercase leading-[1em] tracking-tight xl:text-2xl mb-10">
            Trusted by Leaders
            <br />
            who are willing to shape <br />
            tomorrow.
            {/* <span className="inline-block h-[1em] w-10 bg-default ml-[.5em]"></span> */}
          </h2>
          <p className="text-sm opacity-80 max-w-md">
            Don't take our word for it - hear from fictional businesses that have transformed their operations with our
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          {/* Testimonial 1 */}
          <div className="border-t-2 border-default pt-10 flex flex-col gap-5">
            <p className="italic  opacity-80 mb-5 max-w-lg text-sm font-extralight">
              "The custom application developed for our team has streamlined our workflow process.
              Information-management is a breeze. Now, we can focus on what really matters."
            </p>
            <div className="flex items-center gap-5">
              <Avatar className="size-40">
                <AvatarImage src="https://randomuser.me/api/portraits/women/6.jpg" alt="Sarah Johnson" />
              </Avatar>
              <div>
                <p className="font-extrabold uppercase tracking-tight">Sarah Johnson</p>
                <p className="text-sm opacity-80">Operations Director, TechCorp</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="border-t-2 border-default pt-10 flex flex-col gap-5">
            <p className="italic  opacity-80 mb-5 max-w-lg text-sm  font-extralight">
              "We needed a solution that could adapt to our unique business model, and that's exactly what we got. The
              application is beautiful, fast, and has helped us scale our operations efficiently."
            </p>
            <div className="flex items-center gap-5">
              <Avatar className="size-40">
                <AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" alt="Michael Chen" />
              </Avatar>
              <div>
                <p className="font-extrabold uppercase tracking-tight">Michael Chen</p>
                <p className="text-sm opacity-80">CEO, GrowthMetrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mt-20">
          <p className="text-sm opacity-80 mb-10">Trusted by innovative companies</p>
          <div className="flex flex-wrap gap-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-32 border border-border flex items-center justify-center">
                <span className="text-sm opacity-80">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
