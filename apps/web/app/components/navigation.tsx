'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@3a-ui/ui/button'
import { Menu } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
import { Logo } from './logo'
import { cn } from '@3a-ui/ui/lib/utils'
import * as motion from 'motion/react-client'
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOnTop, setIsOnTop] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsOnTop(entries[0].isIntersecting)
        }
      },
      { threshold: 1.0 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.log(isHovered)
  }, [isHovered])

  return (
    <>
      <div ref={observerRef} className="h-[1px] w-full absolute top-200" />
      <header
        // bg-background/60 backdrop-blur-sm !h-20 border-b
        className={`fixed top-0 left-0 right-0 z-50 duration-400 transition-all h-40 ${!isOnTop && '!h-26 bg-background/80 backdrop-blur-sm border-b'}`}
      >
        <div className="mx-auto container px-5 h-full flex justify-between items-center">
          <Link href="/" className="h-1/2 text-xl">
            <Logo className={cn('h-9 transition-all duration-300', !isOnTop && 'h-8')} />
            <span className="sr-only">3A Solutions</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex flex-1 justify-end items-center gap-10 font-semibold font-sans px-10">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#benefits" className="text-sm hover:text-primary">
              Benefits
            </Link>
            {/* 
            <Link href="#testimonials" className="text-sm hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Pricing
            </Link> */}
            {/* 0px 1px 4px 0px rgba(0, 0, 0, 0.1), 0px 2px 1px -5px rgba(0, 0, 0, 0.2), 0px 0px 0px 10px rgba(0,0,0,.1)*/}
            {/* <Link href="contact">
              <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`block rounded-[2rem] px-10 py-0 bg-gradient-to-b from-white to-[#dddfe0]  text-black shadow-md h-full overflow-hidden`}
                style={{
                  boxShadow: `
                    inset 0px -5px 18px -5px rgba(0,20,40,.05), 
                    inset 0px 0px 1px 0px rgba(0,20,40,0.5), 
                    inset 0px -2px 4px 0px rgba(245,255,255,.4), 
                    0px 1px 4px 0px rgba(0, 0, 0, 0), 
                    0px 0px 3px 0px rgba(255,255,255, 1), 
                    0px 0px 42px 10px var(--background), 
                    0px 25px 15px -25px rgba(0,30,0, 0.0), 
                    0px 3px 14px -10px rgba(0,50,70, 0), 
                    0px 5px 6px 0px rgba(0,0,0,0)`,
                }}
              >
                <span className="flex items-center gap-0 opacity-50 font-base font-sans text-xs text-shadow-xs text-shadow-white uppercase tracking-[.25em]">
                  <span className="border-r py-7 inline-block border-[rgba(0,0,0,0.2)] pr-10">Content</span>{' '}
                  <span className="border-l py-7  inline-block  border-[rgba(255,255,255,1)] pl-10">
                    <Menu className="size-4 " strokeWidth={1} />
                  </span>
                </span>
              </motion.div>
            </Link> */}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)} aria-label="Toggle mobile menu">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
