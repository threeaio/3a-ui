import { Employee, TaskWorkload } from '@/features/data-dashboard/types/domain'
import { DayWorkload, WeekWorkload } from './types'

export function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

export function transformWorkloads(
  workloads: TaskWorkload[],
  employees: Employee[],
  startDate: Date
): WeekWorkload[] {
  // Group workloads by date first
  const workloadsByDate = new Map<string, DayWorkload>()
  
  workloads.forEach((workload) => {
    if (!workload.date) return
    
    const date = new Date(workload.date)
    const dateStr = date.toISOString().split('T')[0] as string
    const employee = employees.find(e => e.id === workload.userId)
    if (!employee) return

    if (!workloadsByDate.has(dateStr)) {
      workloadsByDate.set(dateStr, {
        date,
        totalHours: 0,
        details: []
      })
    }

    const dayWorkload = workloadsByDate.get(dateStr)!
    dayWorkload.totalHours += workload.workload
    
    const existingDetail = dayWorkload.details.find(d => d.employee.id === employee.id)
    if (existingDetail) {
      existingDetail.hours += workload.workload
    } else {
      dayWorkload.details.push({
        employee,
        hours: workload.workload
      })
    }
  })

  // Generate all weeks from start date to now
  const now = new Date('2025-06-01')
  const weeks: WeekWorkload[] = []
  const currentWeekStart = getWeekStart(startDate)

  while (currentWeekStart <= now) {
    const week: WeekWorkload = {
      weekStart: new Date(currentWeekStart),
      days: Array(7).fill(null).map((_, i) => {
        const date = new Date(currentWeekStart)
        date.setDate(date.getDate() + i)
        const dateStr = date.toISOString().split('T')[0] as string
        return workloadsByDate.get(dateStr) || {
          date,
          totalHours: 0,
          details: []
        }
      })
    }
    weeks.push(week)

    // Move to next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7)
  }

  return weeks
}

export function getMaxWorkload(weeks: WeekWorkload[]): number {
  return Math.max(
    ...weeks.flatMap(week => 
      week.days.map(day => day.totalHours)
    )
  )
}

export function getWorkloadIntensity(hours: number, maxHours: number): number {
  if (maxHours === 0) return 0
  return Math.min(Math.max(hours / maxHours, 0), 1)
} 