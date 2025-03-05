'use client'

import React from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Filter } from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from '@3a.solutions/ui/drawer'

export const TableFilterBarMobile: React.FC = () => {
  return (
    <div className="xl:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="h-[500px] p-4">{/* Content will be added later */}</div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
