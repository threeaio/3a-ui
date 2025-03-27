'use client'

import Image from 'next/image'

export function ScreenshotSection() {
  return (
    <section className="relative overflow-hidden pb-40">
      <div className="container mx-auto">
        <div className="pb-40 flex flex-col px-10 justify-start items-center">
          <h2 className="text-2xl font-mono font-extralight mb-5">Digital Solutions Made Simple</h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Experience our elegant and intuitive digital solutions that streamline your business processes. Built with a
            focus on human-centered design and seamless user experience.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Browser Frame */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-gray-700 rounded-t-sm flex items-center px-2 border-b border-border">
            <div className="flex gap-1">
              <div className="size-1.5 rounded-full bg-destructive opacity-90" />
              <div className="size-1.5 rounded-full bg-yellow-500 opacity-90" />
              <div className="size-1.5 rounded-full bg-green-500 opacity-90" />
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative pt-5">
            <div className="relative  border-x border-border overflow-hidden">
              <Image
                src="/screenshot.png"
                alt="Project management dashboard"
                width={1920}
                height={1080}
                className="w-full mix-blend-lighten"
                priority
              />
            </div>
            <div className="absolute left-0 right-0 h-100 bottom-0 bg-gradient-to-b from-transparent to-background pointer-events-none " />
          </div>
        </div>
      </div>
    </section>
  )
}
