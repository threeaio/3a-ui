'use client'

import React, { useState } from 'react'
import { Card } from '@3a.solutions/ui/card'
import { AlertTriangle, Clock, X, XCircle } from 'lucide-react'
import { Task } from '../../../types'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Button } from '@3a.solutions/ui/button'

interface UnassignedTasksAlertProps {
  tasks: Task[]
  className?: string
}

export const UnassignedTasksAlert: React.FC<UnassignedTasksAlertProps> = ({ tasks, className }) => {
  const [mutedTaskIds, setMutedTaskIds] = useState<string[]>([])
  const unassignedInProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress' && !task.assignee && !mutedTaskIds.includes(task.id),
  )

  if (unassignedInProgressTasks.length === 0) {
    return null
  }

  const handleMuteTask = (taskId: string) => {
    setMutedTaskIds((prev) => [...prev, taskId])
  }

  return (
    <Card className={cn('p-5 bg-warning/10 dark:bg-warning/20', className)}>
      <div className="flex items-center gap-2 text-warning">
        <AlertTriangle className="size-5" />
        <h3 className="">Unassigned Tasks In Progress</h3>
      </div>
      <div className="mt-3 space-y-3">
        <p className="text-xs">
          There {unassignedInProgressTasks.length === 1 ? 'is' : 'are'}{' '}
          <strong>{unassignedInProgressTasks.length}</strong>{' '}
          {unassignedInProgressTasks.length === 1 ? 'task' : 'tasks'} in progress without an assignee:
        </p>
        <ul className="grid gap-2">
          {unassignedInProgressTasks.map((task) => (
            <li key={task.id} className="flex items-center gap-2 text-sm group">
              <Clock className="size-4 text-warning" />
              <span>
                <strong>{task.title}</strong> - Due {new Date(task.dueDate).toLocaleDateString('de-DE')}
              </span>
              {/* <Button
                variant="link"
                size="sm"
                onClick={() => handleMuteTask(task.id)}
                className="ml-2"
                title="Mute this alert"
              >
                <X className="size-4" />
              </Button> */}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default UnassignedTasksAlert
