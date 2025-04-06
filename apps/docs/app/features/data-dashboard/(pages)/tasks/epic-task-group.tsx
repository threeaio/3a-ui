'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion } from '@3a.solutions/ui/accordion'
import { TaskItem } from './task-details/task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useActiveEpic } from '@/features/data-dashboard/(pages)/tasks/data-context/active-epic-context'
import { useTasksData } from './data-context/tasks-data-provider'
import { cn } from '@3a.solutions/ui/lib/utils'
import { EpicDetails } from './epic-details/epic-details'
import { useState, useRef, useEffect } from 'react'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  const epicRef = useRef<HTMLDivElement>(null)
  const { activeEpicIds, setEpicActive } = useActiveEpic()
  const { getEpicCost } = useTasksData()
  const isActive = activeEpicIds.has(epic.id)
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    if (isActive && epicRef.current) {
      const headerHeight = 80 // h-20 = 80px
      const epicTop = epicRef.current.getBoundingClientRect().top + window.scrollY
      const taskHeaderHeight = 36 // h-24 = 36px ??? TODO: Check why (ehader is h-20 + p-4 top)
      window.scrollTo({
        top: Math.max(0, epicTop - headerHeight - taskHeaderHeight),
        behavior: 'smooth',
      })
    }
  }, [isActive])

  const currentCost = getEpicCost(epic.id)
  const percentage = epic.budget ? Math.round((currentCost / epic.budget) * 100) : 0

  const handleTaskAccordionChange = (value: string | undefined) => {
    const isOpen = !!value
    setIsTasksOpen(isOpen)
    const isAnythingOpen = isOpen || isDetailsOpen
    setEpicActive(epic.id, isAnythingOpen)
  }

  const handleDetailsChange = (isOpen: boolean) => {
    setIsDetailsOpen(isOpen)
    const isAnythingOpen = isTasksOpen || isOpen
    setEpicActive(epic.id, isAnythingOpen)
  }

  return (
    <Card
      ref={epicRef}
      className={cn(
        'border-2 gap-5 border-dashed border-transparent transition-all',
        isActive && 'border-input dark:border-transparent',
      )}
    >
      <CardHeader className="border-b sticky left-0 right-0 top-24 bg-card z-10">
        <div className="flex items-baseline justify-between pt-5 ">
          <div className="flex flex-col gap-1">
            <h2 className={cn('text-md transition-all duration-200', isActive && 'text-xl leading-loose')}>
              {epic.name}
            </h2>
            {epic.description && <p className="text-sm text-muted-foreground">{epic.description}</p>}
          </div>
          <div className="flex items-center gap-10">
            {epic.budget && (
              <div className={cn('flex items-center gap-2 transition-all duration-200', isActive && 'text-lg')}>
                <span
                  className={cn(
                    'flex items-center gap-3',
                    percentage > 100 && 'text-destructive',
                    percentage > 80 && percentage <= 100 && 'text-warning',
                  )}
                >
                  <Badge className=" font-mono tabular-nums font-light" variant="outline">
                    <span className="text-muted-foreground ">{currentCost.toLocaleString('de-DE')} € | </span>
                    {epic.budget.toLocaleString('de-DE')} €
                  </Badge>
                  <Badge className=" font-mono tabular-nums font-light" variant="secondary">
                    {percentage}%
                  </Badge>
                </span>
              </div>
            )}
            <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-5">
        <EpicDetails epic={epic} onExpandChange={handleDetailsChange} />
        <Accordion type="single" collapsible onValueChange={handleTaskAccordionChange}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
