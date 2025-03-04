'use client';
import React from 'react';
import { Input } from '@3a-ui/ui/forms';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms';
import { Label } from '@3a-ui/ui/forms';
import { InputGroup } from '@3a-ui/ui/forms';

export const ErrorInputGroup: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Input Group with Error</Label>
      <InputGroup error>
        <Input type="number" placeholder="Amount" className="w-40" clearable />
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
          </SelectContent>
        </Select>
      </InputGroup>
      <p className="text-sm text-destructive">Please enter a valid amount</p>
    </div>
  );
};
