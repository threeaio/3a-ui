'use client'

import React from 'react'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { Input } from '@3a.solutions/ui/forms'
import { Badge } from '@3a.solutions/ui/badge'
import { Search, Bell, Settings, UserCircle2, HelpCircle, Plus, Download, Share2 } from 'lucide-react'

interface HeaderProps {
  onSearchChange: (value: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <div className="h-20 px-5 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center gap-5">
        <h1 className="">Project Dashboard</h1>
        <Badge variant="primary">Beta</Badge>
      </div>

      <div className="flex items-center gap-5">
        <div className="w-64">
          <Input
            placeholder="Search projects, tasks..."
            icon={<Search className="size-4" />}
            clearable
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <ButtonGroup variant="outline">
          <Button>
            <Plus className="size-4 mr-2" />
            New
          </Button>
          <Button>
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button>
            <Share2 className="size-4 mr-2" />
            Share
          </Button>
        </ButtonGroup>

        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircle2 className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
