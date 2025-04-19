'use client'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@3a.solutions/ui/button'
import { cn } from '@3a-ui/ui/lib/utils'
import { ModeToggle } from '@3a.solutions/ui/lib/theme'

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

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'fixed bottom-5 right-5 rounded-full transition-all z-40 shadow-md bg-background',
          !isVisible && 'opacity-0 right-0',
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-4" />
      </Button>
      <div className={cn('fixed bottom-5 right-16 z-30 transition-all', !isVisible && 'right-5')}>
        <ModeToggle />
      </div>
    </>
  )
}
