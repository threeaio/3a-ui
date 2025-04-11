'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion } from '@3a.solutions/ui/accordion'
import { Button } from '@3a.solutions/ui/button'
import { TaskItem } from './task-details/task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useTasksData } from '../../data-context/tasks-data-provider'
import { cn } from '@3a.solutions/ui/lib/utils'
import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, ChevronUp, ExternalLinkIcon } from 'lucide-react'
import { EpicAnalyticsIcons } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-analytics-icons'
import { EpicDetails } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-details'
import { EpicAssignees } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-assignees'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  const epicRef = useRef<HTMLDivElement>(null)
  //const { activeEpicIds, setEpicActive } = useActiveEpic()
  const { getEpicCost } = useTasksData()
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const isActive = useMemo(() => {
    return isTasksOpen || isDetailsOpen
  }, [isTasksOpen, isDetailsOpen])

  useEffect(() => {
    if (isActive && epicRef.current) {
      const headerHeight = 96 // h-20 = 80px + p-4 = 96px
      const filterHeight = 66.5 // it is what it is
      const epicTop = epicRef!.current!.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.max(0, epicTop - headerHeight - filterHeight),
        behavior: 'smooth',
      })
    }
  }, [isActive])

  const currentCost = getEpicCost(epic.id)
  const percentage = epic.budget ? Math.round((currentCost / epic.budget) * 100) : 0

  const handleTaskAccordionChange = (value: string | undefined) => {
    const isOpen = !!value
    setIsTasksOpen(isOpen)
  }

  const handleDetailsChange = () => {
    const newIsOpen = !isDetailsOpen
    setIsDetailsOpen(newIsOpen)
  }

  // const EpicDetails = epic.status === 'planned' ? EpicDetailsPlanned : EpicDetailsInProgress

  return (
    <Card
      ref={epicRef}
      className={cn(
        'border-2 gap-0 border-dashed border-transparent transition-all pt-0',
        isActive && 'border-transparent',
      )}
    >
      <CardHeader className="group/epic-header rounded-t-lg  border-b sticky left-0 right-0 top-40 bg-card/90 backdrop-blur-sm z-10 !pb-0 h-20">
        <div className="flex flex-1 items-center justify-start pt-5 gap-0 ">
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex items-center gap-2 justify-start">
              <h2
                className={cn('text-md transition-all duration-200 border-r pr-5', isActive && 'text-xl leading-loose')}
              >
                {epic.name}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2" onClick={handleDetailsChange}>
                  Metrics {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="no-underline group-hover/epic-header:opacity-100 opacity100 transition-opacity  duration-200"
                >
                  <ExternalLinkIcon className="size-4" />
                  <span className="sr-only">Open in Jira</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <EpicAnalyticsIcons epic={epic} colorBySeverity={false} className="justify-end" />
          </div>
          <div className="flex flex-1 items-center gap-4 justify-end">
            <EpicAssignees epicId={epic.id} />
            {epic.budget && (
              <div className={cn('flex items-center gap-2 transition-all duration-200', isActive && 'text-lg')}>
                <span
                  className={cn(
                    'flex items-center gap-3',
                    percentage > 100 && 'text-destructive',
                    percentage > 80 && percentage <= 100 && 'text-warning',
                  )}
                >
                  <Badge
                    className={cn(
                      'font-mono tabular-nums  border-default py-0',
                      percentage > 100 && 'border-destructive',
                      percentage > 80 && percentage <= 100 && 'border-warning',
                    )}
                    variant="outline"
                    ///variant={percentage > 100 ? 'destructive' : 'outline'}
                  >
                    <span className={cn('opacity-70 border-r pr-2 border-default py-1')}>
                      {currentCost.toLocaleString('de-DE')} €
                    </span>
                    <span className={cn('opacity border-r pr-2 border-default/70 py-1')}>
                      {epic.budget.toLocaleString('de-DE')} €
                    </span>
                    <span className="opacity-70 py-1">{percentage}%</span>
                  </Badge>
                </span>
              </div>
            )}
            <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-5">
        <EpicDetails epic={epic} isOpen={isDetailsOpen} onOpenChange={handleDetailsChange} />
        <Accordion
          className={isDetailsOpen ? 'mt-2' : ''}
          type="single"
          collapsible
          onValueChange={handleTaskAccordionChange}
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
