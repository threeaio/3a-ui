'use client'

import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Button } from '@3a.solutions/ui/button'
import {
  Input,
  InputGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@3a.solutions/ui/forms'
import { RotateCcw, User, File, ChevronDown, ChevronUp, Tag as TagIcon } from 'lucide-react'
import { Badge } from '@3a.solutions/ui/badge'

import { companies, managingDirectors, tribes } from './filter-mock-data'
import { SavedFiltersPanel } from './saved-filters-panel'
import { useFilters } from './filter-context'
import { TagFilter } from './tag-filter'

interface TableFilterBarProps {
  /**
   * Optional additional CSS classes
   */
  className?: string
}

/**
 * Filter bar component for the staff scheduler table
 * Following the compact row pattern from UI_GUIDE.md
 */
export const TableFilterBar: React.FC<TableFilterBarProps> = ({ className = '' }) => {
  const {
    filters,
    isExpanded,
    setIsExpanded,
    handleFilterChange,
    handleCompanySelect,
    handleDirectorSelect,
    handleTribeSelect,
    handleReset,
  } = useFilters()

  // Toggle expanded state
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={cn(
        'flex flex-col  pr-1 justify-start  border-b border-border transition-all duration-240 ease-in-expo overflow-hidden',
        isExpanded ? 'xl:h-24' : 'xl:h-13 delay-100',
        className,
      )}
    >
      {/* First row with searches, selects, and actions */}
      <div className="xl:h-13 py-2 flex justify-between gap-2 items-center flex-wrap">
        {/* Left side with input groups and filters */}
        <div className="flex items-center gap-2 flex-wrap shrink  ">
          <InputGroup className="shrink-1">
            {/* Person search */}
            <Input
              className="md:w-50"
              placeholder="Search by person..."
              value={filters.personName}
              onChange={(e) => handleFilterChange({ personName: e.target.value })}
              icon={<User className="size-4" />}
              clearable
              onClear={() => handleFilterChange({ personName: '' })}
            />

            {/* Project search */}
            <Input
              className="md:w-50"
              placeholder="Search by project..."
              value={filters.project}
              onChange={(e) => handleFilterChange({ project: e.target.value })}
              icon={<File className="size-4" />}
              clearable
              onClear={() => handleFilterChange({ project: '' })}
            />
          </InputGroup>
          <InputGroup>
            {/* Company select */}
            <Select value={filters.company?.id || 'all'} onValueChange={handleCompanySelect}>
              <SelectTrigger className="md:w-40">
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
              <SelectTrigger className="md:w-40">
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
              <SelectTrigger className="md:w-40">
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
          <Button variant="ghost" className="flex items-center gap-1" onClick={handleToggleExpand}>
            <TagIcon className="size-4" />
            Tags
            {filters.selectedTags.length > 0 && (
              <Badge className="ml-1 size-4 px-1 rounded-full">{filters.selectedTags.length}</Badge>
            )}
            {isExpanded ? (
              <ChevronUp className="size-4 ml-1 text-muted-foreground opacity-50  translate-x-1" />
            ) : (
              <ChevronDown className="size-4 ml-1 text-muted-foreground opacity-50  translate-x-1" />
            )}
          </Button>
        </div>

        {/* Right side with actions */}
        <div className="flex items-center gap-2 ml-2 shrink-0">
          {/* Reset button */}
          <Button variant="ghost" size="icon" onClick={handleReset} title="Reset filters">
            <RotateCcw className="size-4" />
          </Button>

          {/* Saved filters panel */}
          <SavedFiltersPanel />
        </div>
      </div>

      {/* Second row with tag-related components */}
      <div
        className={cn(
          'xl:h-13 pb-4 flex items-center gap-5',
          'transition-opacity duration-300  ease-in-out',
          isExpanded ? 'opacity-100 delay-200' : 'opacity-0 ',
        )}
      >
        <TagFilter />
      </div>
    </div>
  )
}
