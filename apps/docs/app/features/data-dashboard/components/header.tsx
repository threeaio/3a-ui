'use client'

import React from 'react'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { Input } from '@3a.solutions/ui/forms'
import { Badge } from '@3a.solutions/ui/badge'
import { Search, Bell, Settings, UserCircle2, HelpCircle, Plus, Download, Share2, Calendar } from 'lucide-react'
import { SidebarTrigger, useSidebar } from '@3a.solutions/ui/sidebar'
import { cn } from '@3a.solutions/ui/lib/utils'
import { useProjectData } from '../data-context'
import { format } from 'date-fns'
import { getStatusBadgeColor, getPriorityBadgeColor } from '../utils'

interface HeaderProps {
  onSearchChange?: (value: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { state } = useSidebar()
  const { project } = useProjectData()

  const formattedEndDate = format(new Date(project.endDate), 'MMM d, yyyy')

  return (
    <div className="sticky top-0 bg-sidebar pt-4 z-10">
      <div className="flex z-50 w-full h-20 pr-5 pl-2 border-b border-border items-center justify-between bg-background rounded-t-xl">
        <div className={cn('flex items-center gap-10 justify-center transition-all')}>
          <SidebarTrigger />
          <div className="flex items-center gap-5">
            <div className="flex flex-row gap-10 items-center">
              <div className="flex flex-col gap-0.5">
                <h1 className="">{project.name}</h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    Due {formattedEndDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getStatusBadgeColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </Badge>
                <Badge className={getPriorityBadgeColor(project.priority)}>
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-64">
            <Input
              placeholder="Search tasks, milestones..."
              icon={<Search className="size-4" />}
              clearable
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          <ButtonGroup variant="outline">
            <Button>
              <Plus className="size-4 mr-2" />
              Add Task
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
    </div>
  )
}

export default Header
