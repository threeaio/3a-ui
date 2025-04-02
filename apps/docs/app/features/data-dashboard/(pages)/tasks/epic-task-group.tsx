'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardHeader } from '@3a.solutions/ui/card'
import { Accordion } from '@3a.solutions/ui/accordion'
import { TaskItem } from './task'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-baseline justify-between py-5">
          <div className="flex flex-col gap-1">
            <h2 className="">{epic.name}</h2>
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
        <Accordion type="single" collapsible>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
