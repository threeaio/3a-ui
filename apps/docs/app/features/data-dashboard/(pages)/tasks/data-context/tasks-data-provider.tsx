import { ReactNode, createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { Epic, Task, EpicStatus, TaskStatus, TaskWorkload, Employee } from '@/features/data-dashboard/types/domain'

export type EpicSortBy = 'status' | 'budget'
export type SortDirection = 'asc' | 'desc'

// Define the logical order of statuses
const STATUS_ORDER: Record<EpicStatus, number> = {
  planned: 0,
  'in-progress': 1,
  completed: 2,
  cancelled: 3,
}

interface TasksDataContextValue {
  epics: Epic[]
  tasks: Task[]
  getTasksByEpic: (epicId: string) => Task[]
  orphanedTasks: Task[]

  // Workload and cost selectors
  getWorkloadsByTask: (taskId: string) => Array<{ workload: TaskWorkload; employee: Employee }>
  getTotalWorkloadForTask: (taskId: string) => number
  getTaskCost: (taskId: string) => number
  getEpicCost: (epicId: string) => number

  // Filtering
  epicStatusFilter: EpicStatus | 'all'
  setEpicStatusFilter: (status: EpicStatus | 'all') => void
  taskStatusFilter: TaskStatus | 'all'
  setTaskStatusFilter: (status: TaskStatus | 'all') => void

  // Sorting
  epicSortBy: EpicSortBy
  setEpicSortBy: (sortBy: EpicSortBy) => void
  sortDirection: SortDirection
  setSortDirection: (direction: SortDirection) => void
}

const TasksDataContext = createContext<TasksDataContextValue | undefined>(undefined)

export function TasksDataProvider({ children }: { children: ReactNode }) {
  const {
    epics: allEpics,
    tasks: allTasks,
    getTasksByEpic: getOriginalTasksByEpic,
    getWorkloadsByTask: originalGetWorkloadsByTask,
    getTotalWorkloadForTask: originalGetTotalWorkloadForTask,
    getTaskCost: originalGetTaskCost,
  } = useProjectDataContext()

  // Filter states
  const [epicStatusFilter, setEpicStatusFilter] = useState<EpicStatus | 'all'>('all')
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [epicSortBy, setEpicSortBy] = useState<EpicSortBy>('status')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Get epic cost by summing up all task costs
  const getEpicCost = useCallback(
    (epicId: string) => {
      const epicTasks = getOriginalTasksByEpic(epicId)
      return epicTasks.reduce((total, task) => total + originalGetTaskCost(task.id), 0)
    },
    [getOriginalTasksByEpic, originalGetTaskCost],
  )

  // Apply filters and sorting
  const epics = useMemo(() => {
    let filteredEpics = [...allEpics]

    // Apply epic status filter
    if (epicStatusFilter !== 'all') {
      filteredEpics = filteredEpics.filter((epic) => epic.status === epicStatusFilter)
    }

    // Apply sorting
    filteredEpics.sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1
      if (epicSortBy === 'status') {
        return multiplier * (STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
      } else {
        return multiplier * (b.budget - a.budget)
      }
    })

    return filteredEpics
  }, [allEpics, epicStatusFilter, epicSortBy, sortDirection])

  // Filter tasks
  const tasks = useMemo(() => {
    if (taskStatusFilter === 'all') {
      return allTasks
    }
    return allTasks.filter((task) => task.status === taskStatusFilter)
  }, [allTasks, taskStatusFilter])

  // Get tasks by epic with filters applied
  const getTasksByEpic = (epicId: string) => {
    const epicTasks = getOriginalTasksByEpic(epicId)
    if (taskStatusFilter === 'all') {
      return epicTasks
    }
    return epicTasks.filter((task) => task.status === taskStatusFilter)
  }

  // Get orphaned tasks with filters applied
  const orphanedTasks = useMemo(() => {
    const orphaned = tasks.filter((task) => !task.epicId)
    if (taskStatusFilter === 'all') {
      return orphaned
    }
    return orphaned.filter((task) => task.status === taskStatusFilter)
  }, [tasks, taskStatusFilter])

  const value: TasksDataContextValue = {
    epics,
    tasks,
    getTasksByEpic,
    orphanedTasks,
    getWorkloadsByTask: originalGetWorkloadsByTask,
    getTotalWorkloadForTask: originalGetTotalWorkloadForTask,
    getTaskCost: originalGetTaskCost,
    getEpicCost,
    epicStatusFilter,
    setEpicStatusFilter,
    taskStatusFilter,
    setTaskStatusFilter,
    epicSortBy,
    setEpicSortBy,
    sortDirection,
    setSortDirection,
  }

  return <TasksDataContext.Provider value={value}>{children}</TasksDataContext.Provider>
}

export function useTasksData() {
  const context = useContext(TasksDataContext)
  if (!context) {
    throw new Error('useTasksData must be used within a TasksDataProvider')
  }
  return context
}
