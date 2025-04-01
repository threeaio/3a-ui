'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { TaskCard } from './task-card'

export function EpicTaskGroup({ epic, tasks }: { epic: Epic; tasks: Task[] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <div className="space-y-1 py-10">
          <h2 className="font-semibold ">{epic.name}</h2>
          {epic.description && <p className="text-sm text-muted-foreground">{epic.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {epic.budget && (
            <div className="text-sm">
              Budget: <span className="font-medium">${epic.budget.toLocaleString('de-DE')}</span>
            </div>
          )}
          <Badge variant={epic.status === 'in-progress' ? 'primary' : 'default'}>{epic.status}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
