'use client'

import { Task } from '@/features/data-dashboard/types/domain'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@3a.solutions/ui/accordion'
import { TaskCard } from './task-card'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { ArrowUpIcon, ExternalLinkIcon } from 'lucide-react'
import { getTaskStatusIcon, getTaskTypeIcon, getPriorityArrows } from '@/features/data-dashboard/utils'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { Button } from '@3a.solutions/ui/button'

function TaskAssignees({ assignedEmployeeIds }: { assignedEmployeeIds: string[] }) {
  if (!assignedEmployeeIds || !assignedEmployeeIds.length) return null

  const { getEmployeesByIds } = useEmployeeContext()
  const assignees = getEmployeesByIds(assignedEmployeeIds)

  if (!assignees.length) return null

  return (
    <div className="flex -space-x-2">
      {assignees.map((employee) => (
        <Tooltip key={employee.id}>
          <TooltipTrigger>
            <div className="size-6 rounded-full overflow-hidden border-2 border-background">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="size-full object-cover" />
              ) : (
                <div className="size-full bg-muted flex items-center justify-center text-xs">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>{employee.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function TaskItem({ task }: { task: Task }) {
  const StatusIcon = getTaskStatusIcon(task.status)
  const TypeIcon = task.type && getTaskTypeIcon(task.type)
  const PriorityArrows = task.priority && getPriorityArrows(task.priority)

  return (
    <AccordionItem value={task.id}>
      <div className="flex grow items-center gap-2 justify-between py-3 group/task-header">
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
            className="opacity-0 no-underline  group-hover/task-header:opacity-100 transition-opacity duration-200"
          >
            <ExternalLinkIcon className="size-4" /> Open in Jira
          </Button>
        </div>
        <div className={cn('flex-1')}>
          <div className={cn('grid grid-cols-5 grow')}>
            <div className="flex items-center justify-end col-span-2">
              <TaskAssignees assignedEmployeeIds={task.assignedEmployeeIds} />
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
