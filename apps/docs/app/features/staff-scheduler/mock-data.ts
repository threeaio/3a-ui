// Staff Scheduler Mock Data Types

export interface Project {
  id: string
  name: string
  workload: Record<string, number | null> // key is month or week, value is 0-100 or null for N/A
}

export interface StaffMember {
  id: string
  name: string
  projects: Project[]
  // Aggregated workload computed from projects
  workload: Record<string, number | null>
  // Fields for filtering
  companyId: string
  managingDirectorId: string
  tribeId: string
  tags: string[] // Array of tag IDs
}

// Mock data for the staff scheduler
export const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    companyId: 'c1',
    managingDirectorId: 'md1',
    tribeId: 't1',
    tags: ['tag1', 'tag2'],
    projects: [
      {
        id: 'p1',
        name: 'Website Redesign',
        workload: {
          '2025-01': 80,
          '2025-02': 65,
          '2025-03': 40,
          '2025-04': 20,
          '2025-05': null,
          '2025-06': null,
        },
      },
      {
        id: 'p2',
        name: 'Mobile App',
        workload: {
          '2025-01': 20,
          '2025-02': 30,
          '2025-03': 50,
          '2025-04': null,
          '2025-05': 85,
          '2025-06': null,
        },
      },
    ],
    workload: {
      '2025-01': 100,
      '2025-02': 95,
      '2025-03': 90,
      '2025-04': 20,
      '2025-05': 85,
      '2025-06': null,
    },
  },
  {
    id: '2',
    name: 'Bob Smith',
    companyId: 'c1',
    managingDirectorId: 'md2',
    tribeId: 't2',
    tags: ['tag2', 'tag3'],
    projects: [
      {
        id: 'p3',
        name: 'Data Migration',
        workload: {
          '2025-01': 50,
          '2025-02': 75,
          '2025-03': null,
          '2025-04': 40,
          '2025-05': null,
          '2025-06': null,
        },
      },
    ],
    workload: {
      '2025-01': 50,
      '2025-02': 75,
      '2025-03': null,
      '2025-04': 40,
      '2025-05': null,
      '2025-06': null,
    },
  },
  {
    id: '3',
    name: 'Charlie Davis',
    companyId: 'c2',
    managingDirectorId: 'md1',
    tribeId: 't1',
    tags: ['tag1', 'tag4'],
    projects: [
      {
        id: 'p1',
        name: 'Website Redesign',
        workload: {
          '2025-01': null,
          '2025-02': 0,
          '2025-03': 30,
          '2025-04': null,
          '2025-05': 90,
          '2025-06': null,
        },
      },
      {
        id: 'p4',
        name: 'API Integration',
        workload: {
          '2025-01': 75,
          '2025-02': 60,
          '2025-03': null,
          '2025-04': 20,
          '2025-05': null,
          '2025-06': null,
        },
      },
    ],
    workload: {
      '2025-01': 75,
      '2025-02': 60,
      '2025-03': 30,
      '2025-04': 20,
      '2025-05': 90,
      '2025-06': null,
    },
  },
]

// Get time periods (months or weeks)
export const getTimePeriods = (view: 'month' | 'week'): string[] => {
  if (view === 'month') {
    return ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06']
  } else {
    const weeks: string[] = []
    for (let month = 1; month <= 6; month++) {
      for (let week = 1; week <= 4; week++) {
        weeks.push(`2025-${month.toString().padStart(2, '0')}-W${week}`)
      }
    }
    return weeks
  }
}

// Generate weekly data based on monthly data
export const getWeeklyData = (): StaffMember[] => {
  return staffMembers.map((staff) => {
    const weeklyStaff = {
      ...staff,
      projects: staff.projects.map((project) => {
        const weeklyProject = {
          ...project,
          workload: {} as Record<string, number | null>,
        }

        // Convert monthly data to weekly (simplified mock)
        Object.entries(project.workload).forEach(([month, value]) => {
          // Create 4 weeks for each month
          const [year, monthNum] = month.split('-')
          for (let week = 1; week <= 4; week++) {
            const weekKey = `${year}-${monthNum}-W${week}`

            // Add more "wholes" (null values) as we go further into the future
            // and randomly create some gaps
            const monthIndex = parseInt(monthNum || '1')
            const randomFactor = Math.random()

            // Increase chance of null values for future months
            const nullProbability = 0.1 + monthIndex / 10

            if (value === null || randomFactor < nullProbability) {
              weeklyProject.workload[weekKey] = null
            } else {
              const variation = Math.floor(Math.random() * 20) - 10 // -10 to +10
              weeklyProject.workload[weekKey] = Math.max(0, Math.min(100, value + variation))
            }
          }
        })

        return weeklyProject
      }),
      workload: {} as Record<string, number | null>,
    }

    // Compute aggregated weekly workload
    weeklyStaff.projects.forEach((project) => {
      Object.entries(project.workload).forEach(([week, value]) => {
        if (!weeklyStaff.workload[week]) {
          weeklyStaff.workload[week] = 0
        }

        // Skip null values in aggregation
        if (value !== null) {
          const currentValue = weeklyStaff.workload[week]
          if (currentValue !== null) {
            weeklyStaff.workload[week] = currentValue + value / weeklyStaff.projects.length
          }
        }
      })
    })

    // Ensure no value exceeds 100 and add some random nulls for future weeks
    Object.keys(weeklyStaff.workload).forEach((week) => {
      const value = weeklyStaff.workload[week]

      // Extract month from week key (e.g., "2025-03-W2" -> 3)
      const parts = week.split('-')
      const monthPart = parts.length > 1 ? parts[1] : '1'
      // Ensure we have a string before parsing
      const monthIndex = parseInt(monthPart || '1')

      // Increase chance of null values for future months
      const nullProbability = 0.05 + monthIndex / 12

      if (Math.random() < nullProbability) {
        weeklyStaff.workload[week] = null
      } else if (value !== null && value !== undefined) {
        weeklyStaff.workload[week] = Math.min(100, value)
      }
    })

    return weeklyStaff
  })
}

// Format time period for display
export const formatTimePeriod = (period: string): string => {
  if (period.includes('W')) {
    // Week format: 2025-01-W1
    const parts = period.split('-')
    if (parts.length < 3) return period

    const year = parts[0] || '2025'
    const month = parts[1] || '1'
    const weekPart = parts[2] || ''

    if (!weekPart) return period

    const week = weekPart.substring(1) || '1'
    const weekNum = parseInt(week)
    const date = new Date(parseInt(year), parseInt(month) - 1, (weekNum - 1) * 7 + 1)
    return `Week ${week} (${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`
  } else {
    // Month format: 2025-01
    const parts = period.split('-')
    if (parts.length < 2) return period

    const year = parts[0] || '2025'
    const month = parts[1] || '1'

    const date = new Date(parseInt(year), parseInt(month) - 1, 1)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
}
