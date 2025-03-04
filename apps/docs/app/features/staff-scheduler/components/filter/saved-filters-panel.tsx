'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Button, ButtonGroup } from '@3a-ui/ui/button';
import { Check, Plus, Star, Search } from 'lucide-react';
import { SavedFilter } from './filter-mock-data';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@3a-ui/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@3a-ui/ui/popover';

interface SavedFiltersPanelProps {
  savedFilters: SavedFilter[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onApplySavedFilter: (filterId: string) => void;
  className?: string;
}

export const SavedFiltersPanel: React.FC<SavedFiltersPanelProps> = ({
  savedFilters,
  isFavorite,
  onToggleFavorite,
  onApplySavedFilter,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <ButtonGroup size="icon">
        <Button
          variant={isFavorite ? 'primary' : 'outline'}
          onClick={onToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Save as favorite'}
        >
          <Star className={cn('size-4', isFavorite ? 'fill-current' : '')} />
        </Button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" title="Saved filters" aria-expanded={open}>
              <Plus className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-64" align="end">
            <Command>
              <CommandInput placeholder="Search saved filters..." className="h-9" />
              <div className="p-2 text-sm font-medium border-b">Saved Filters</div>
              <CommandList className="max-h-48">
                <CommandEmpty>No saved filters found.</CommandEmpty>
                <CommandGroup>
                  {savedFilters.map((filter) => (
                    <CommandItem
                      key={filter.id}
                      value={filter.id}
                      onSelect={(value) => {
                        onApplySavedFilter(value);
                        setOpen(false);
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
  );
};
