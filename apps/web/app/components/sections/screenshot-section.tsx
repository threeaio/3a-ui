'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export function ScreenshotSection() {
  const { resolvedTheme } = useTheme()

  return (
    <section className="relative overflow-hidden pb-40">
      <div className="container mx-auto">
        <div className="pb-40 max-w-5xl mx-auto">
          <div className="flex flex-col max-w-2xl px-10 justify-start items-start">
            <h2 className="relative z-10 text-2xl mb-10 text-balanced font-extrabold uppercase leading-[1em] tracking-tight ">
              Digital solutions
              <br />
              that do not suck
            </h2>
            <p className="mb-10 relative  text-sm  opacity-80  mx-auto">
              Experience our elegant and intuitive digital solutions that streamline your business processes. Built with
              a focus on human-centered design and seamless user experience.
            </p>
          </div>
        </div>

        <div className="mask-b-from-90% mask-b-to-100%">
          <div className="shadow-2xl relative max-w-5xl mx-auto ">
            {/* Browser Frame */}

            <div className="absolute top-0 left-0 right-0 h-5 bg-gray-300 dark:bg-gray-700 rounded-t-sm flex items-center px-2 border-b border-border">
              <div className="flex gap-1">
                <div className="size-1.5 rounded-full bg-destructive opacity-90" />
                <div className="size-1.5 rounded-full bg-yellow-500 opacity-90" />
                <div className="size-1.5 rounded-full bg-green-500 opacity-90" />
              </div>
            </div>

            {/* Screenshot Container */}
            <div className="relative pt-5 ">
              <div className="relative  border-x border-border overflow-hidden  ">
                <Image
                  src={'/screenshot-light.png'}
                  alt="Project management dashboard"
                  width={1920}
                  height={1080}
                  className="w-full mix-blend-multiply  dark:hidden"
                  priority
                />
                <Image
                  src={'/screenshot-dark.png'}
                  alt="Project management dashboard"
                  width={1920}
                  height={1080}
                  className="w-full mix-blend-lighten hidden dark:block"
                  priority
                />
              </div>
              {/* <div className="absolute left-0 right-0 h-100 bottom-0 bg-gradient-to-b from-transparent to-background pointer-events-none " /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
