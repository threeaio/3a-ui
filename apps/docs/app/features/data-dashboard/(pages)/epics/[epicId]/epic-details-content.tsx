'use client'

import { EpicDetails } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-details'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { EpicAnalyticsInsights } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-analytics-insights'
import { Badge } from '@3a.solutions/ui/badge'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { Accordion } from '@3a.solutions/ui/accordion'
import { TaskItem } from '@/features/data-dashboard/(pages)/epics/task-details/task'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { EpicTags } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-tags'
import { Button } from '@3a.solutions/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { TaskStatusWidget } from '@/features/data-dashboard/components/widgets/task-status-bar/task-status-widget'

export function EpicDetailsContent({ epicId }: { epicId: string }) {
  const { epics, getTasksByEpic } = useTasksData()
  const epic = epics.find((e) => e.id === epicId)
  const tasks = getTasksByEpic(epicId)

  if (!epic) {
    return <div>Epic not found</div>
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center h-40 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{epic.name}</h1>
            <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
          </div>
          <div className="text-muted-foreground">{epic.description}</div>
        </div>
        <div>
          <Link href="/features/data-dashboard/epics">
            <Button variant="ghost">
              <ArrowLeft className="size-4" />
              Back to List
            </Button>
          </Link>
        </div>
      </div>

      <EpicDetails epic={epic} />

      <div className="grid grid-cols-2 gap-5">
        <Card className="">
          <CardHeader>
            <CardTitle>Epic Analytics Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <EpicAnalyticsInsights epic={epic} />
          </CardContent>
        </Card>
        <EpicTags epic={epic} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" className={cn('px-0')} collapsible>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
