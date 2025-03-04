'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Button } from '@3a-ui/ui/button';
import { Check, Plus } from 'lucide-react';
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
          <Button variant="outline" size="sm" className="flex items-center gap-2" aria-expanded={open}>
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
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.some((t) => t.id === tag.id);
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.id}
                      onSelect={(value) => {
                        if (isSelected) {
                          onTagRemove(value);
                        } else {
                          onTagSelect(value);
                        }
                      }}
                      className="px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between  w-full">
                        <span className="text-sm">{tag.name}</span>
                        {isSelected && <Check className="size-4" />}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
