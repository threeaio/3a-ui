'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion } from '@3a.solutions/ui/accordion'
import { TaskItem } from './task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useActiveEpic } from '@/features/data-dashboard/(pages)/tasks/data-context/active-epic-context'
import { useTasksData } from './data-context/tasks-data-provider'
import { cn } from '@3a.solutions/ui/lib/utils'
import { EpicDetails } from './epic-details'
import { useState } from 'react'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  const { activeEpicIds, setEpicActive } = useActiveEpic()
  const { getEpicCost } = useTasksData()
  const isActive = activeEpicIds.has(epic.id)
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

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
      className={cn(
        'border-4 gap-0 border-dashed border-transparent transition-all',
        isActive && 'border-4 border-dashed border-input dark:border-primary',
      )}
    >
      <CardHeader className="border-b">
        <div className="flex items-baseline justify-between py-5">
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
                  <Badge className=" font-mono tabular-nums text-base font-light" variant="outline">
                    <span className="text-muted-foreground ">{currentCost.toLocaleString('de-DE')} € | </span>
                    {epic.budget.toLocaleString('de-DE')} €
                  </Badge>
                  <Badge className="text-base font-mono tabular-nums font-light" variant="secondary">
                    {percentage}%
                  </Badge>
                </span>
              </div>
            )}
            <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
