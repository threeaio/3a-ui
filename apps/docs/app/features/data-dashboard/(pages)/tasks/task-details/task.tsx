'use client'

import { Task } from '@/features/data-dashboard/types/domain'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@3a.solutions/ui/accordion'
import { TaskCard } from './task-card'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { ArrowUpIcon, ExternalLinkIcon } from 'lucide-react'
import { getTaskStatusIcon, getTaskTypeIcon, getPriorityArrows } from '@/features/data-dashboard/utils'
import { Button } from '@3a.solutions/ui/button'
import { TaskAnalyticsIcons } from '@/features/data-dashboard/(pages)/tasks/task-details/task-analytics-icons'

export function TaskItem({ task }: { task: Task }) {
  const StatusIcon = getTaskStatusIcon(task.status)
  const TypeIcon = task.type && getTaskTypeIcon(task.type)
  const PriorityArrows = task.priority && getPriorityArrows(task.priority)

  return (
    <AccordionItem value={task.id}>
      <div className="flex grow items-center gap-0 justify-start py-3 group/task-header">
        <div className="w-1/2 flex items-center gap-2">
          <AccordionTrigger>
            <h3 className="flex items-center gap-5 ">
              <span className={'transition-all duration-200 [.group[data-state=open]_&]:font-bold'}>{task.name}</span>{' '}
              <span className="text-muted-foreground">[SPT-{task.id}]</span>
            </h3>
          </AccordionTrigger>
          <Button
            variant="link"
            size="sm"
            className="opacity-100 no-underline  group-hover/task-header:opacity-100 transition-opacity duration-200"
          >
            <ExternalLinkIcon className="size-4" />
            <span className="sr-only">Open in Jira</span>
          </Button>
        </div>
        <div className="w-1/4">
          <TaskAnalyticsIcons task={task} colorBySeverity={true} className="justify-end" />
        </div>
        <div className={cn('flex-1')}>
          <div className={cn('grid grid-cols-4 grow')}>
            <div className="flex items-center justify-end col-span-1 gap-2">
              {/* <TaskAssignees assignedEmployeeIds={task.assignedEmployeeIds} /> */}
            </div>
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
