'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Button } from '@3a-ui/ui/button';
import { Input, InputGroup, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@3a-ui/ui/forms';
import { RotateCcw, User, File, ChevronDown, ChevronUp, Tag as TagIcon, X } from 'lucide-react';
import { Badge } from '@3a-ui/ui/badge';

import {
  tags,
  companies,
  managingDirectors,
  tribes,
  FilterState,
  defaultFilterState,
  savedFilters,
} from './filter-mock-data';
import { FilterTagsDropdown } from './filter-tags-dropdown';
import { SavedFiltersPanel } from './saved-filters-panel';

interface TableFilterBarProps {
  /**
   * Optional additional CSS classes
   */
  className?: string;

  /**
   * Callback when filters change
   */
  onFilterChange?: (filters: FilterState) => void;
}

/**
 * Filter bar component for the staff scheduler table
 * Following the compact row pattern from UI_GUIDE.md
 */
export const TableFilterBar: React.FC<TableFilterBarProps> = ({ className = '', onFilterChange }) => {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilterState });
  const [isFavorite, setIsFavorite] = useState(false);
  // State to track if the filter bar is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  // Handle tag selection
  const handleTagSelect = (tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    if (tag && !filters.selectedTags.some((t) => t.id === tagId)) {
      handleFilterChange({
        selectedTags: [...filters.selectedTags, tag],
      });
    }
  };

  // Handle tag removal
  const handleTagRemove = (tagId: string) => {
    handleFilterChange({
      selectedTags: filters.selectedTags.filter((tag) => tag.id !== tagId),
    });
  };

  // Handle company selection
  const handleCompanySelect = (companyId: string) => {
    const company = companyId === 'all' ? null : companies.find((c) => c.id === companyId) || null;
    handleFilterChange({ company });
  };

  // Handle managing director selection
  const handleDirectorSelect = (directorId: string) => {
    const director = directorId === 'all' ? null : managingDirectors.find((d) => d.id === directorId) || null;
    handleFilterChange({ managingDirector: director });
  };

  // Handle tribe selection
  const handleTribeSelect = (tribeId: string) => {
    const tribe = tribeId === 'all' ? null : tribes.find((t) => t.id === tribeId) || null;
    handleFilterChange({ tribe });
  };

  // Reset all filters
  const handleReset = () => {
    setFilters({ ...defaultFilterState });
    setIsFavorite(false);
    onFilterChange?.({ ...defaultFilterState });
  };

  // Toggle favorite status
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Apply saved filter
  const handleApplySavedFilter = (filterId: string) => {
    const savedFilter = savedFilters.find((f) => f.id === filterId);
    if (savedFilter) {
      const { id, name, ...filterState } = savedFilter;
      setFilters(filterState);
      onFilterChange?.(filterState);
    }
  };

  // Toggle expanded state
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        'px-2 flex flex-col justify-start rounded-xl bg-muted transition-all duration-300 ease-in-out overflow-hidden',
        isExpanded ? 'h-24' : 'h-13 delay-100',
        className,
      )}
    >
      {/* First row with searches, selects, and actions */}
      <div className="h-13 py-2 flex justify-between items-center">
        {/* Left side with input groups and filters */}
        <div className="flex items-center gap-2">
          <InputGroup>
            {/* Person search */}
            <Input
              className="w-60"
              placeholder="Search by person..."
              value={filters.personName}
              onChange={(e) => handleFilterChange({ personName: e.target.value })}
              icon={<User className="size-4" />}
              clearable
              onClear={() => handleFilterChange({ personName: '' })}
            />

            {/* Project search */}
            <Input
              className="w-60"
              placeholder="Search by project..."
              value={filters.project}
              onChange={(e) => handleFilterChange({ project: e.target.value })}
              icon={<File className="size-4" />}
              clearable
              onClear={() => handleFilterChange({ project: '' })}
            />

            {/* Company select */}
            <Select value={filters.company?.id || 'all'} onValueChange={handleCompanySelect}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Managing Director select */}
            <Select value={filters.managingDirector?.id || 'all'} onValueChange={handleDirectorSelect}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Director" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All directors</SelectItem>
                {managingDirectors.map((director) => (
                  <SelectItem key={director.id} value={director.id}>
                    {director.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tribe select */}
            <Select value={filters.tribe?.id || 'all'} onValueChange={handleTribeSelect}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tribe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tribes</SelectItem>
                {tribes.map((tribe) => (
                  <SelectItem key={tribe.id} value={tribe.id}>
                    {tribe.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroup>

          {/* Tags button with count */}
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleToggleExpand}>
            <TagIcon className="size-4" />
            Tags
            {filters.selectedTags.length > 0 && <Badge className="ml-1">{filters.selectedTags.length}</Badge>}
            {isExpanded ? <ChevronUp className="size-4 ml-1" /> : <ChevronDown className="size-4 ml-1" />}
          </Button>
        </div>

        {/* Right side with actions */}
        <div className="flex items-center gap-2 ml-2 shrink-0">
          {/* Reset button */}
          <Button variant="ghost" size="icon" onClick={handleReset} title="Reset filters">
            <RotateCcw className="size-4" />
          </Button>

          {/* Saved filters panel */}
          <SavedFiltersPanel
            savedFilters={savedFilters}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onApplySavedFilter={handleApplySavedFilter}
          />
        </div>
      </div>

      {/* Second row with tag-related components */}
      <div
        className={cn(
          'h-13 pb-2 flex items-center px-2',
          'transition-opacity duration-300  ease-in-out',
          isExpanded ? 'opacity-100 delay-200' : 'opacity-0 ',
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Selected Tags:</span>

          {/* Display selected tags */}
          <div className="flex flex-wrap gap-1">
            {filters.selectedTags.length > 0 ? (
              filters.selectedTags.map((tag) => (
                <Badge key={tag.id} className="text-xs flex items-center gap-1">
                  {tag.name}
                  <button className="hover:text-foreground/80" onClick={() => handleTagRemove(tag.id)}>
                    <X className="size-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground/70">No tags selected</span>
            )}
          </div>

          {/* Tag selector dropdown */}
          <FilterTagsDropdown
            selectedTags={filters.selectedTags}
            availableTags={tags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            className="ml-2"
          />
        </div>
      </div>
    </div>
  );
};
