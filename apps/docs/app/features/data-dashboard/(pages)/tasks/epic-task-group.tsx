'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion, AccordionContent } from '@3a.solutions/ui/accordion'
import { TaskItem } from './task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useActiveTask } from '@/features/data-dashboard/data-context/active-task-context'
import { cn } from '@3a.solutions/ui/lib/utils'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  const { activeEpicIds, setEpicActive } = useActiveTask()
  const isActive = activeEpicIds.has(epic.id)

  const handleAccordionChange = (value: string | undefined) => {
    setEpicActive(epic.id, !!value)
  }

  return (
    <Card className={cn(isActive && 'border-4 border-dashed border-input')}>
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
      <CardContent>
        <Accordion type="single" collapsible onValueChange={handleAccordionChange}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
