'use client'

import { Task } from '@/features/data-dashboard/types/domain'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@3a.solutions/ui/accordion'
import { TaskCard } from './task-card'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import {
  CheckIcon,
  TimerIcon,
  BugIcon,
  LightbulbIcon,
  WrenchIcon,
  ArrowUpIcon,
  BookmarkCheck,
  ArrowUpRightIcon,
} from 'lucide-react'

const getTaskStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return { icon: CheckIcon, label: 'Completed', className: '' }
    case 'in-progress':
      return { icon: ArrowUpRightIcon, label: 'In Progress', className: '' }
    default:
      return { icon: TimerIcon, label: 'Pending' }
  }
}

const getTaskTypeIcon = (type: Task['type']) => {
  switch (type) {
    case 'bugfix':
      return { icon: BugIcon, label: 'Bug Fix', className: 'text-destructive' }
    case 'feature':
      return { icon: BookmarkCheck, label: 'Feature', className: '' }
    default:
      return { icon: WrenchIcon, label: 'Maintenance', className: '' }
  }
}

const getPriorityArrows = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return { count: 3, label: 'High Priority' }
    case 'medium':
      return { count: 2, label: 'Medium Priority' }
    default:
      return { count: 1, label: 'Low Priority' }
  }
}

export function TaskItem({ task }: { task: Task }) {
  const StatusIcon = getTaskStatusIcon(task.status)
  const TypeIcon = task.type && getTaskTypeIcon(task.type)
  const PriorityArrows = task.priority && getPriorityArrows(task.priority)

  return (
    <AccordionItem value={task.id}>
      <div className="flex grow items-center gap-2 justify-between py-3">
        <div className="w-2/3 flex">
          <AccordionTrigger>
            <h3 className="flex items-center gap-5">
              <span>{task.name}</span> <span className="text-muted-foreground">[SPT-{task.id}]</span>
            </h3>
          </AccordionTrigger>
        </div>
        <div className={cn('flex-1')}>
          <div className={cn('grid grid-cols-3 grow')}>
            <Tooltip>
              <TooltipTrigger>
                <div className={cn('flex items-center justify-center', StatusIcon.className)}>
                  <StatusIcon.icon strokeWidth={1} className="size-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>{StatusIcon.label}</TooltipContent>
            </Tooltip>

            {task.type && (
              <Tooltip>
                <TooltipTrigger>
                  <div className={cn('flex items-center justify-center', TypeIcon.className)}>
                    <TypeIcon.icon strokeWidth={1} className="size-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{TypeIcon.label}</TooltipContent>
              </Tooltip>
            )}

            {task.priority && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-3">
                      {Array.from({ length: PriorityArrows.count }).map((_, i) => (
                        <ArrowUpIcon key={i} strokeWidth={1.5} className="size-4" />
                      ))}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{PriorityArrows.label}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <AccordionTrigger />
      </div>

      <AccordionContent>
        <TaskCard task={task} />
      </AccordionContent>
    </AccordionItem>
  )
}
