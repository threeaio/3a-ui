'use client'

import React, { useState } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Check, Plus, X } from 'lucide-react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@3a-ui/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@3a-ui/ui/popover'
import { useFilters } from './filter-context'
import { tags } from './filter-mock-data'
import { Badge } from '@3a.solutions/ui/badge'

interface TagFilterProps {
  className?: string
  badgeClassName?: string
}

export const TagFilter: React.FC<TagFilterProps> = ({ className, badgeClassName }) => {
  const [open, setOpen] = useState(false)
  const { filters, handleTagSelect, handleTagRemove } = useFilters()

  return (
    <div className={cn(className, 'flex flex-row gap-2 items-center')}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2" aria-expanded={open}>
            <Plus className="size-4" />
            Add Tags
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-60" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-10" />
            <div className="px-2 h-10 flex items-center text-sm font-semibold border-b">Select Tags</div>
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => {
                  const isSelected = filters.selectedTags.some((t) => t.id === tag.id)
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.id}
                      onSelect={(value) => {
                        if (isSelected) {
                          handleTagRemove(value)
                        } else {
                          handleTagSelect(value)
                        }
                      }}
                      className="px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm">{tag.name}</span>
                        {isSelected && <Check className="size-4" />}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className={cn('flex flex-wrap gap-2', badgeClassName)}>
        {filters.selectedTags.length > 0 ? (
          filters.selectedTags.map((tag) => (
            <Badge key={tag.id} className="text-xs flex items-center gap-1">
              {tag.name}
              <button className="hover:default-foreground/80" onClick={() => handleTagRemove(tag.id)}>
                <X className="size-3" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground/70">No tags selected</span>
        )}
      </div>
    </div>
  )
}
