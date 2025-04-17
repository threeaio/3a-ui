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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3a.solutions/ui/tabs'
import { EpicAssignees } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-assignees'

export function EpicDetailsContent({ epicId }: { epicId: string }) {
  const { epics, getTasksByEpic } = useTasksData()
  const epic = epics.find((e) => e.id === epicId)
  const tasks = getTasksByEpic(epicId)

  if (!epic) {
    return <div>Epic not found</div>
  }

  return (
    <div className="">
      <div className="h-40 flex items-center justify-between">
        <div className="grid grid-cols-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-20">
              <Link href="/features/data-dashboard/epics">
                <Button variant="ghost" size="icon" className="p-3 size-12">
                  <ArrowLeft className="size-9" strokeWidth={1} />
                  <span className="sr-only">Back to List</span>
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-1 0">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">{epic.name}</h1>
                <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
              </div>
              <div className="text-muted-foreground">{epic.description}</div>
            </div>
          </div>
          <div className="flex items-center justify-end pr-5">
            <EpicAssignees epicId={epicId} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Tabs defaultValue="key-metrics">
          <TabsList className="flex items-center justify-center mb-2">
            <TabsTrigger value="key-metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="key-metrics">
            <EpicDetails epic={epic} />
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-2 gap-5">
            
                  <EpicAnalyticsInsights epic={epic} />
              <EpicTags epic={epic} />
            </div>
          </TabsContent>
        </Tabs>

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
    </div>
  )
}
