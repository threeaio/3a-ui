'use client'

import React, { useState } from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { Check, ChevronDownIcon, Settings, Star } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@3a.solutions/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@3a.solutions/ui/popover'
import { useFilters } from './filter-context'
import { mockSavedFilters } from './filter-mock-data'

interface SavedFiltersPanelProps {
  className?: string
}

export const SavedFiltersPanel: React.FC<SavedFiltersPanelProps> = ({ className }) => {
  const [open, setOpen] = useState(false)
  const { isFavorite, handleToggleFavorite, handleApplySavedFilter } = useFilters()

  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      <ButtonGroup size="default" variant="outline">
        <Button onClick={handleToggleFavorite} title={isFavorite ? 'Remove from favorites' : 'Save as favorite'}>
          <Star className="size-4" />
        </Button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button
              asChild
              variant="outline"
              title="Saved filters"
              aria-expanded={open}
              className={cn(
                'rounded-r-md rounded-l-none',
                'border-l-0',
                'focus-visible:relative focus-visible:z-10',
                open && 'bg-accent',
              )}
            >
              <div>
                <Settings className="size-4  mr-0" />
                <ChevronDownIcon
                  className={cn('size-4 text-muted-foreground opacity-50 -mr-2', open && 'rotate-180')}
                />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-60" align="end">
            <Command>
              <div className="px-2 h-10 flex items-center text-sm font-semibold">Saved Filters</div>
              <CommandList className="max-h-60">
                <CommandEmpty>No saved filters found.</CommandEmpty>
                <CommandGroup>
                  {mockSavedFilters.map((filter) => (
                    <CommandItem
                      key={filter.id}
                      value={filter.id}
                      onSelect={(value) => {
                        handleApplySavedFilter(value)
                        setOpen(false)
                      }}
                    >
                      <div className="flex items-center w-full">
                        {filter.name}
                        {isFavorite && <Check className="ml-auto size-4 text-primary" />}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </div>
  )
}
