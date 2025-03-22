'use client'

import React, { useState } from 'react'
import { Check, Plus, X } from 'lucide-react'
import { cn } from '@3a.solutions/ui/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandHeading,
  CommandInput,
  CommandItem,
  CommandList,
} from '@3a-ui/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@3a.solutions/ui/popover'
import { useFilters } from './filter-context'
import { tags } from './filter-mock-data'
import { Badge } from '@3a.solutions/ui/badge'

interface TagFilterProps {
  className?: string
  badgeClassName?: string
}

export const TagFilter: React.FC<TagFilterProps> = ({ className }) => {
  const [open, setOpen] = useState(false)
  const { filters, handleTagSelect, handleTagRemove } = useFilters()

  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap gap-2 items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Badge variant="outline" className="hover:bg-muted cursor-pointer text-xs flex items-center gap-1">
              <Plus className="size-3" />
              Add Tags
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-60" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." className="h-10" />
              <CommandHeading>Select Tags</CommandHeading>
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
