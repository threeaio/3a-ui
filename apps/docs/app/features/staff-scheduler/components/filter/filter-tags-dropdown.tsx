'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Button } from '@3a-ui/ui/button';
import { Badge } from '@3a-ui/ui/badge';
import { Filter, X, Check, Plus } from 'lucide-react';
import { Tag } from './filter-mock-data';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@3a-ui/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@3a-ui/ui/popover';

interface FilterTagsDropdownProps {
  selectedTags: Tag[];
  availableTags: Tag[];
  onTagSelect: (tagId: string) => void;
  onTagRemove: (tagId: string) => void;
  className?: string;
}

export const FilterTagsDropdown: React.FC<FilterTagsDropdownProps> = ({
  selectedTags,
  availableTags,
  onTagSelect,
  onTagRemove,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1" aria-expanded={open}>
            <Plus className="size-4" />
            Add Tags
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-64" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-9" />
            <div className="p-2 text-sm font-medium border-b">Select Tags</div>
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {availableTags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.id}
                    onSelect={(value) => {
                      if (selectedTags.some((t) => t.id === value)) {
                        onTagRemove(value);
                      } else {
                        onTagSelect(value);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="checkbox"
                        id={`tag-${tag.id}`}
                        checked={selectedTags.some((t) => t.id === tag.id)}
                        onChange={() => {}}
                        className="h-4 w-4"
                      />
                      <span>{tag.name}</span>
                      {selectedTags.some((t) => t.id === tag.id) && <Check className="ml-auto size-4 opacity-70" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
