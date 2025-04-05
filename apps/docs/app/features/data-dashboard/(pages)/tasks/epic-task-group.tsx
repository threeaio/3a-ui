'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion } from '@3a.solutions/ui/accordion'
import { TaskItem } from './task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useActiveEpic } from '@/features/data-dashboard/(pages)/tasks/data-context/active-epic-context'
import { cn } from '@3a.solutions/ui/lib/utils'
import { EpicDetails } from './epic-details'
import { useState } from 'react'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  const { activeEpicIds, setEpicActive } = useActiveEpic()
  const isActive = activeEpicIds.has(epic.id)
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

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
    <Card className={cn(isActive && 'border-4 border-dashed border-input dark:border-primary')}>
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
              <div className="">
                Budget: <span className="">${epic.budget.toLocaleString('de-DE')}</span>
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
