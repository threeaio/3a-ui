'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@3a-ui/ui/button'
import Link from 'next/link'
import Logo from './logo'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      <div className="h-20 flex items-center justify-between px-5">
        <Logo />
        <button onClick={onClose} className="p-2">
          <X className="size-6" />
        </button>
      </div>

      <nav className="flex flex-col px-5 py-20 space-y-20 text-xl font-mono font-extralight">
        <Link href="#features" className="underline underline-offset-8 hover:text-primary" onClick={onClose}>
          Features
        </Link>
        <Link href="#benefits" className="underline underline-offset-8 hover:text-primary" onClick={onClose}>
          Benefits
        </Link>
        <Link href="#testimonials" className="underline underline-offset-8 hover:text-primary" onClick={onClose}>
          Testimonials
        </Link>
        <Link href="#pricing" className="underline underline-offset-8 hover:text-primary" onClick={onClose}>
          Pricing
        </Link>
        {/* <div className="pt-5 space-y-4">
          <Button variant="outline" className="w-full">
            Contact Us
          </Button>
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </div> */}
      </nav>
    </div>
  )
}
