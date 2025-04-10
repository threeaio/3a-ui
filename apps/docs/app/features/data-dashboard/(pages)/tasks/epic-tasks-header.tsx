import { BadgeSelect } from '@3a-ui/ui/badge-select'
import { BaseStatus, EpicStatus, TaskStatus } from '@/features/data-dashboard/types/domain'
import { useTasksData } from '../../data-context/tasks-data-provider'
import type { EpicSortBy } from '../../data-context/tasks-data-provider'
import { getStatusBadgeColor } from '../../utils/domain-to-ui'

const statusOptions: BaseStatus[] = ['planned', 'in-progress', 'completed', 'cancelled']

export function EpicsTasksHeader() {
  const {
    epicStatusFilter,
    setEpicStatusFilter,
    taskStatusFilter,
    setTaskStatusFilter,
    epicSortBy,
    setEpicSortBy,
    sortDirection,
    setSortDirection,
  } = useTasksData()

  const epicStatusOptions = [
    { value: 'all', label: 'All Epics' },
    ...statusOptions.map((status) => ({
      value: status,
      label: `${status.charAt(0).toUpperCase() + status.slice(1)} Epics`,
      className: getStatusBadgeColor(status),
    })),
  ]

  const taskStatusOptions = [
    { value: 'all', label: 'All Tasks' },
    ...statusOptions.map((status) => ({
      value: status,
      label: `${status.charAt(0).toUpperCase() + status.slice(1)} Tasks`,
      className: getStatusBadgeColor(status),
    })),
  ]

  const sortOptions = [
    { value: 'status:asc', label: 'Status (Planned → Completed)' },
    { value: 'status:desc', label: 'Status (Completed → Planned)' },
    { value: 'budget:asc', label: 'Budget (Low to High)' },
    { value: 'budget:desc', label: 'Budget (High to Low)' },
  ]

  const handleSortChange = (value: string) => {
    const [sort, direction] = value.split(':') as [EpicSortBy, 'asc' | 'desc']
    setEpicSortBy(sort)
    setSortDirection(direction)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
      <BadgeSelect
        variant="outline"
        label="Epic Status"
        options={epicStatusOptions}
        value={epicStatusFilter}
        onValueChange={(value) => setEpicStatusFilter(value as EpicStatus)}
        className={epicStatusFilter !== 'all' ? getStatusBadgeColor(epicStatusFilter as BaseStatus) : undefined}
      />
      <BadgeSelect
        variant="outline"
        label="Task Status"
        options={taskStatusOptions}
        value={taskStatusFilter}
        onValueChange={(value) => setTaskStatusFilter(value as TaskStatus)}
        className={taskStatusFilter !== 'all' ? getStatusBadgeColor(taskStatusFilter as BaseStatus) : undefined}
      />
      <BadgeSelect
        variant="outline"
        label="Sort Epics"
        options={sortOptions}
        value={`${epicSortBy}:${sortDirection}`}
        onValueChange={handleSortChange}
      />
    </form>
  )
}
