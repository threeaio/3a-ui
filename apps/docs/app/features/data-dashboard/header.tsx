'use client'

import React from 'react'
import { Button, ButtonGroup } from '@3a.solutions/ui/button'
import { SidebarTrigger } from '@3a.solutions/ui/sidebar'
import { cn } from '@3a.solutions/ui/lib/utils'
import { format } from 'date-fns'
import { useProjectDataContext } from './data-context/project-data-provider'
import { Calendar, Plus, Share2, Download, Bell, HelpCircle, Settings, UserCircle2 } from 'lucide-react'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { project } = useProjectDataContext()
  const dataContext = useProjectDataContext()

  // Get project end date from data provider
  const projectEndDate = dataContext.getProjectEndDate()

  // Format the date if available
  const formattedEndDate = projectEndDate ? format(projectEndDate, 'MMM d, yyyy') : 'No end date'

  // Derive a priority from project budget (just for demo purposes)
  const priority = project.budget > 100000 ? 'high' : 'medium'

  return (
    <div className="sticky top-0 bg-sidebar pt-4 z-20">
      <div className="flex z-50 w-full h-20 pr-5 pl-2 border-b border-border items-center justify-between bg-background rounded-t-xl">
        <div className={cn('flex items-center gap-10 justify-center transition-all')}>
          <SidebarTrigger />
          <div className="flex items-center gap-5">
            <div className="flex flex-row gap-10 items-center">
              <div className="flex flex-col gap-0.5">
                <h1 className="font-semibold">{project.name}</h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {projectEndDate ? `Due ${formattedEndDate}` : 'Open-ended project'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <ButtonGroup variant="outline">
            <Button>
              <Plus strokeWidth={1} className="size-4" />
              Add Task
            </Button>
            <Button>
              <Download strokeWidth={1} className="size-4" />
              Export
            </Button>
            <Button>
              <Share2 strokeWidth={1} className="size-4" />
              Share
            </Button>
          </ButtonGroup>

          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell strokeWidth={1.5} className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle strokeWidth={1.5} className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings strokeWidth={1.5} className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle2 strokeWidth={1.5} className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
