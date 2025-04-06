import { useMemo } from 'react'
import { Task, TaskWorkload, Employee } from '@/features/data-dashboard/types/domain'

interface EpicRuntimeMetricsProps {
  tasks: Task[]
  getWorkloadsByTask: (taskId: string) => Array<{ workload: TaskWorkload; employee: Employee }>
}

export function EpicRuntimeMetrics({ tasks, getWorkloadsByTask }: EpicRuntimeMetricsProps) {
  const { firstActivity, lastActivity, runtimeDays, totalHours } = useMemo(() => {
    const allWorkloads = tasks.flatMap((task) =>
      getWorkloadsByTask(task.id).map((w) => ({
        date: new Date(w.workload.date),
        workload: w.workload.workload,
      })),
    )

    if (allWorkloads.length === 0) {
      return { firstActivity: null, lastActivity: null, runtimeDays: 0, totalHours: 0 }
    }

    const first = new Date(Math.min(...allWorkloads.map((w) => w.date.getTime())))
    const last = new Date(Math.max(...allWorkloads.map((w) => w.date.getTime())))
    const days = Math.ceil((last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24))
    const hours = allWorkloads.reduce((sum, w) => sum + w.workload, 0)

    return {
      firstActivity: first,
      lastActivity: last,
      runtimeDays: days,
      totalHours: hours,
    }
  }, [tasks, getWorkloadsByTask])

  return (
    <div className="px-5 flex flex-col min-h-[200px]">
      <div className="flex-1 flex flex-col">
        <h4 className="text-sm font-semibold mb-2">Runtime</h4>
        <div className="flex-1 flex flex-col justify-between pt-1 pb-4">
          <div>
            <span className="text-3xl font-semibold text-default mb-2">{runtimeDays} </span>
            <span>days</span>
          </div>
          <div>
            <span className="text-3xl font-semibold text-default mb-2">{totalHours} h</span>
            <span>&nbsp;spend</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-auto">
        <p>
          First: {firstActivity ? firstActivity.toLocaleDateString() : '-'} | Last:{' '}
          {lastActivity ? lastActivity.toLocaleDateString() : '-'}
        </p>
      </div>
    </div>
  )
}
