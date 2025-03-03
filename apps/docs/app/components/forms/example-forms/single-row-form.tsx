'use client';
import React from 'react';
import { Input } from '@3a-ui/ui/forms';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms';
import { Label } from '@3a-ui/ui/forms';
import { Button, ButtonGroup } from '@3a-ui/ui/button';
import { Search, Plus } from 'lucide-react';
import { RowVisualizer } from '../../../ui/measure-visualizer/row-indicator';
import { InputGroup } from '@3a-ui/ui/forms';
import { heightClasses, paddingClasses } from '../../../ui-config';

export const SingleRowForm: React.FC = () => {
  return (
    <RowVisualizer rows={1} className="w-full">
      <form
        className={`flex items-center gap-2 border rounded-xl ${heightClasses[0]} ${paddingClasses.horizontal[1]} bg-background`}
      >
        <div className="flex items-center gap-2">
          <Label htmlFor="rowNumber" className="text-sm whitespace-nowrap pl-2">
            Row:
          </Label>
        </div>
        <InputGroup>
          <Input id="rowNumber" type="number" className="w-20" min="1" defaultValue="1" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="users">Users</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search..." icon={<Search className="h-4 w-4" />} clearable />
        </InputGroup>
        <ButtonGroup variant="outline">
          <Button type="submit">Search</Button>
          <Button size="icon">
            <Plus className="size-4" />
          </Button>
        </ButtonGroup>
      </form>
    </RowVisualizer>
  );
};
