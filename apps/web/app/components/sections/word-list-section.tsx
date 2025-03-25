'use client'

import { Badge } from '@3a.solutions/ui/badge'
import { cn } from '@3a.solutions/ui/lib/utils'

const words = [
  { text: 'cheap', rotation: -3 },
  { text: 'brutalist', rotation: 2 },
  { text: 'modernist', rotation: -2 },
  { text: 'no-bullshit', rotation: 3 },
  { text: 'monochrome', rotation: -1 },
  { text: 'simple', rotation: 2 },
]

export function WordListSection() {
  return (
    <section className="container mx-auto px-5 md:px-10 py-40">
      <div className="flex flex-wrap justify-center gap-4 md:gap-20">
        {words.map((word, index) => (
          <Badge
            variant="outline"
            key={index}
            className={cn(
              'font-light font-mono transition-all duration-300 hover:scale-110 hover:text-primary cursor-default text-xl px-6 py-2',
            )}
            style={{ transform: `rotate(${word.rotation}deg)` }}
          >
            {word.text}
          </Badge>
        ))}
      </div>
    </section>
  )
}
