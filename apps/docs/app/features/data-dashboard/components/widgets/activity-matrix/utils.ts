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
  employees: Employee[]
): WeekWorkload[] {
  // Group workloads by date first
  const workloadsByDate = new Map<string, DayWorkload>()
  
  workloads.forEach((workload) => {
    if (!workload.date) return
    
    const date = new Date(workload.date)
    // We know dateStr will be a string since we've validated workload.date
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

  // Group by weeks
  const workloadsByWeek = new Map<string, WeekWorkload>()
  
  Array.from(workloadsByDate.values()).forEach((dayWorkload) => {
    const weekStart = getWeekStart(dayWorkload.date)
    const weekKey = weekStart.toISOString()

    if (!workloadsByWeek.has(weekKey)) {
      workloadsByWeek.set(weekKey, {
        weekStart,
        days: Array(7).fill(null).map((_, i) => {
          const date = new Date(weekStart)
          date.setDate(date.getDate() + i)
          return {
            date,
            totalHours: 0,
            details: []
          }
        })
      })
    }

    const weekWorkload = workloadsByWeek.get(weekKey)!
    const dayIndex = Math.floor((dayWorkload.date.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
    weekWorkload.days[dayIndex] = dayWorkload
  })

  return Array.from(workloadsByWeek.values()).sort((a, b) => 
    a.weekStart.getTime() - b.weekStart.getTime()
  )
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