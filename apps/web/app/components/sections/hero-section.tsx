import { Button } from '@3a.solutions/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className=" h-[calc(100vh-0rem)] min-h-[600px] container mx-auto  flex flex-col justify-end items-start container px-5 pb-20  xl:pb-30  relative z-10 text-left">
        {/* <Badge variant="outline" className="mb-5">
          Business Applications Made Simple
        </Badge> */}
        <div className="relative max-w-2xl">
          {/* <div className="bg-radial from-background via-transparent via-80% to-transparent absolute inset-0 z-10"></div>
          <div className="bg-radial from-background via-transparent via-40% to-transparent absolute inset-0 z-10"></div>
          <div className="bg-radial from-background via-transparent via-60% to-transparent absolute inset-0 z-10"></div> */}
          <h1 className="relative -ml-0 z-10 text-2xl md:text-3xl mb-10 text-balanced font-extrabold dark:font-bold uppercase leading-[1em] tracking-tight ">
            {/* <span className="pl-10 text-5xl text-primary underline underline-offset-[1.5rem] mb-10 inline-block"> */}
            <span className="text-primary inline-block ">Solutions.</span> <br />
            {/* </span> */}
            handcrafted and AI-accelerated.
            <br />
            Ready for the next waves of digitalization.
          </h1>
          <p className="mb-10 relative  text-sm  opacity-80  mx-auto">
            In uncertain times, you need a partner who knows how to play the claviature of time and moves forward with
            you both empathetically and efficiency-oriented.
          </p>
        </div>
        <PlayWithAnimationButton />
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

function PlayWithAnimationButton() {
  return (
    <Link
      href="/wave-player"
      className="absolute right-0 bottom-30 text-2xl mb-10 text-balanced font-extrabold dark:font-bold uppercase leading-[1em] tracking-tight flex items-center hover:text-primary"
    >
      <ArrowRight className="size-9 mr-5" strokeWidth={2.5} />
      Play with animation
    </Link>
  )
}
