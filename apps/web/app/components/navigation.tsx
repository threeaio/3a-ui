'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@3a-ui/ui/button'
import { Menu } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
import { Logo } from './logo'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsScrolled(true)
  //     } else {
  //       setIsScrolled(false)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   handleScroll()
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <>
      <header
        className={`sticky mt-40 top-0 left-0 right-0 z-50 duration-500 transition-all ${isScrolled ? 'h-40 bg-gradient-to-b from-background via-background to-transparent' : 'h-20 bg-background'}`}
      >
        <div className="mx-auto container h-full flex justify-between items-center px-5 md:px-10">
          <Link href="/" className="h-1/2 max-h-16 text-xl">
            <Logo />
            <span className="sr-only">3A Solutions</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-sm hover:text-primary">
              Features
            </Link>
            <Link href="#benefits" className="text-sm hover:text-primary">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-sm hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              Pricing
            </Link>
            <Link href="#contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
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
