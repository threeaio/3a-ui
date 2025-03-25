'use client'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@3a-ui/ui/button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if we need to show the button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-5 right-5 rounded-full z-40 shadow-md"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" />
    </Button>
  )
}
