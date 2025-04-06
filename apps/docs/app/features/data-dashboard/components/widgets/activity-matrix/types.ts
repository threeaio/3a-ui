import { Employee, Task, TaskWorkload } from '@/features/data-dashboard/types/domain'

export type DayWorkload = {
  date: Date
  totalHours: number
  details: Array<{
    employee: Employee
    hours: number
  }>
}

export type WeekWorkload = {
  weekStart: Date
  days: DayWorkload[]
}

export type ActivityMatrixProps = {
  workloads: TaskWorkload[]
  employees: Employee[]
  startDate: Date
  onDayClick?: (dayWorkload: DayWorkload) => void
} 