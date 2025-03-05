'use client'

import React from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Filter } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from '@3a.solutions/ui/drawer'
import { useFilters } from './filter-context'
import {
  Input,
  InputGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@3a.solutions/ui/forms'
import { User, File } from 'lucide-react'
import { companies, managingDirectors, tribes } from './filter-mock-data'
import { Badge } from '@3a.solutions/ui/badge'
import { TagFilter } from './tag-filter'

export const TableFilterBarMobile: React.FC = () => {
  const { filters, handleFilterChange, handleCompanySelect, handleDirectorSelect, handleTribeSelect } = useFilters()

  return (
    <div className="xl:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="size-4" />
            {filters.selectedTags.length > 0 && (
              <Badge className="absolute -top-2 -right-2 size-4 px-1 rounded-full">{filters.selectedTags.length}</Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="flex p-5 gap-5 flex-col w-full">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Search inputs */}
              <InputGroup className="w-full" behavior="distribute">
                <Input
                  placeholder="Search by person..."
                  value={filters.personName}
                  onChange={(e) => handleFilterChange({ personName: e.target.value })}
                  icon={<User className="size-4" />}
                  clearable
                  onClear={() => handleFilterChange({ personName: '' })}
                />
                <Input
                  placeholder="Search by project..."
                  value={filters.project}
                  onChange={(e) => handleFilterChange({ project: e.target.value })}
                  icon={<File className="size-4" />}
                  clearable
                  onClear={() => handleFilterChange({ project: '' })}
                />
              </InputGroup>

              {/* Selects */}
              <InputGroup className="w-full" behavior="distribute" breakpoint={480}>
                <Select value={filters.company?.id || 'all'} onValueChange={handleCompanySelect}>
                  <SelectTrigger>
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

                <Select value={filters.managingDirector?.id || 'all'} onValueChange={handleDirectorSelect}>
                  <SelectTrigger>
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

                <Select value={filters.tribe?.id || 'all'} onValueChange={handleTribeSelect}>
                  <SelectTrigger>
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
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="font-medium text-sm">Tags</div>
              <TagFilter />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
