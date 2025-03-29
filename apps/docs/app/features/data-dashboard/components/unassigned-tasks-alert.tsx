'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import { AlertTriangle } from 'lucide-react'
import { Task } from '../types'

interface UnassignedTasksAlertProps {
  tasks: Task[]
}

export const UnassignedTasksAlert: React.FC<UnassignedTasksAlertProps> = ({ tasks }) => {
  const unassignedInProgressTasks = tasks.filter((task) => task.status === 'in-progress' && !task.assignee)

  if (unassignedInProgressTasks.length === 0) {
    return null
  }

  return (
    <Card className="mb-5 p-5 border-warning bg-warning/10">
      <div className="flex items-center gap-2 text-warning">
        <AlertTriangle className="size-4" />
        <h3 className="">Unassigned Tasks In Progress</h3>
      </div>
      <div className="mt-2">
        <p className="text-xs">
          There {unassignedInProgressTasks.length === 1 ? 'is' : 'are'}{' '}
          <strong>{unassignedInProgressTasks.length}</strong>{' '}
          {unassignedInProgressTasks.length === 1 ? 'task' : 'tasks'} in progress without an assignee:
        </p>
        <ul className="mt-2 list-disc list-inside text-sm">
          {unassignedInProgressTasks.map((task) => (
            <li key={task.id} className="text-muted-foreground">
              {task.title} (Due: {new Date(task.dueDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default UnassignedTasksAlert
