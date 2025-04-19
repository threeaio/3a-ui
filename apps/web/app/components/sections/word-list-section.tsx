'use client'

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
    <section className="container mx-auto px-5 md:px-10 py-160">
      <div className="flex flex-col items-start gap-2">
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              'text-5xl font-extrabold uppercase tracking-tight transition-all duration-300 hover:text-primary cursor-default',
            )}
            style={{ transform: `rotate(${word.rotation}deg)` }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </section>
  )
}
