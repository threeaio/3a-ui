'use client';
import React from 'react';
import { Input } from '@3a-ui/ui/forms';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms';
import { Label } from '@3a-ui/ui/forms';
import { Button, ButtonGroup } from '@3a-ui/ui/button';
import { Search } from 'lucide-react';
import { InputGroup } from '@3a-ui/ui/forms';
import { heightClasses, paddingClasses } from '../../../ui-config';
import { RowVisualizer } from '../../../ui/measure-visualizer/row-indicator';

export const ComplexFilterGroup: React.FC = () => {
  return (
    <RowVisualizer rows={2} className="w-full">
      <div
        className={`flex rounded-xl bg-background flex-col justify-center ${heightClasses[0]} ${paddingClasses.horizontal[1]}`}
      >
        <div className="flex items-center gap-2">
          <InputGroup className="flex-1">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-60" placeholder="Search by name..." icon={<Search className="size-4" />} clearable />
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </InputGroup>
          <ButtonGroup>
            <Button variant="outline">Reset</Button>
            <Button>Search</Button>
          </ButtonGroup>
        </div>
      </div>
    </RowVisualizer>
  );
};
