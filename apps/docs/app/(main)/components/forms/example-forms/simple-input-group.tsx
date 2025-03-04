'use client'
import React from 'react'
import { Input } from '@3a-ui/ui/forms'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@3a-ui/ui/forms'
import { Label } from '@3a-ui/ui/forms'
import { InputGroup } from '@3a-ui/ui/forms'

export const SimpleInputGroup: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Simple Input Group</Label>
      <InputGroup>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="id">ID</SelectItem>
          </SelectContent>
        </Select>
        <Input clearable placeholder="Search..." className="min-w-60" />
      </InputGroup>
    </div>
  )
}
