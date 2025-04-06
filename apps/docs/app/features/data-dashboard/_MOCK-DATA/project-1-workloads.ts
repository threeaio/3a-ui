import { TaskWorkload } from '../types/domain'

/**
 * Project Timeline:
 * Start: January 1, 2025
 * End: July 15, 2025
 * 
 * Employee Roles and Task Assignments:
 * - emp-1: UI Designer (tasks: 1, 6, 7, 9, 11)
 * - emp-4: Frontend Developer (tasks: 2, 3, 4, 5, 8, 13, 14, 15)
 * - emp-5: UX Designer (tasks: 1, 7, 11)
 * - emp-6: Backend Developer (tasks: 2, 4, 5, 8, 10, 12, 14, 15)
 * - emp-7: Product Owner (task: 16)
 * - emp-8: QA Engineer (involved in all tasks)
 * 
 * Task Status Overview:
 * - Completed: 3, 10
 * - In Progress: 1, 5, 9, 11, 16
 * - Planned: 2, 4, 6, 7, 8, 12, 13, 14, 15
 * 
 * Workload Patterns:
 * - Regular workday: 3-5 hours
 * - Intensive day: 6-8 hours
 * - Light day: 1-2 hours
 * - QA typically spends 25-35% of dev time
 * - Multiple entries per day possible (morning/afternoon split)
 */

// Helper function to generate dates between start and end
const generateDatesBetween = (start: Date, end: Date): Date[] => {
  const dates: Date[] = []
  let currentDate = new Date(start)
  while (currentDate <= end) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
      dates.push(new Date(currentDate))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

// Helper to generate random workload with morning/afternoon split
const generateDailyWorkload = (baseMin: number, baseMax: number): [number, number] => {
  const total = Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin
  const morning = Math.ceil(total * (0.4 + Math.random() * 0.2)) // 40-60% in morning
  const afternoon = total - morning
  return [morning, afternoon]
}

// Helper to generate morning and afternoon dates
const generateDayParts = (date: Date): [Date, Date] => {
  const morning = new Date(date)
  morning.setHours(9, 0, 0, 0)
  const afternoon = new Date(date)
  afternoon.setHours(14, 0, 0, 0)
  return [morning, afternoon]
}

// Generate workload data for completed tasks (3, 10)
const generateCompletedTaskWorkloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []
  
  // Task 3 (Fix Checkout Button Bug) - Short, intensive fix
  const task3Dates = generateDatesBetween(new Date('2025-03-25'), new Date('2025-03-26'))
  task3Dates.forEach(date => {
    const devWorkload = generateDailyWorkload(4, 6)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)
    
    workloads.push(
      { taskId: 'task-3', workload: devWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-3', workload: devWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-3', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-3', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 10 (Implement Cart Persistence) - Longer implementation
  const task10Dates = generateDatesBetween(new Date('2025-03-20'), new Date('2025-03-27'))
  task10Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-10', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-10', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-10', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-10', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-10', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-10', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

// Generate workload data for in-progress tasks (1, 5, 9, 11, 16)
const generateInProgressTaskWorkloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 1 (Design Product Cards)
  const task1Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-04-05'))
  task1Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(3, 5)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-1', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-1', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-1', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-1', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-1', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-1', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 5 (Implement Product Filtering)
  const task5Dates = generateDatesBetween(new Date('2025-03-27'), new Date('2025-04-03'))
  task5Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 6)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-5', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-5', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-5', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-5', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-5', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-5', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 9 (Fix Mobile Navigation Menu)
  const task9Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-04-02'))
  task9Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-9', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-9', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-9', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-9', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-9', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-9', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 11 (Create Checkout Summary Component)
  const task11Dates = generateDatesBetween(new Date('2025-03-29'), new Date('2025-04-05'))
  task11Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(3, 5)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-11', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-11', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-11', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-11', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-11', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-11', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 16 (Project Management Activities)
  const task16Dates = generateDatesBetween(new Date('2025-03-29'), new Date('2025-04-12'))
  task16Dates.forEach(date => {
    const pmWorkload = generateDailyWorkload(2, 4)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-16', workload: pmWorkload[0], userId: 'emp-7', date: morning },
      { taskId: 'task-16', workload: pmWorkload[1], userId: 'emp-7', date: afternoon }
    )
  })

  return workloads
}

// Generate workload data for planned tasks (2, 4, 6, 7, 8, 12, 13, 14, 15)
const generatePlannedTaskWorkloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 2 (Implement Authentication)
  const task2Dates = generateDatesBetween(new Date('2025-04-10'), new Date('2025-04-17'))
  task2Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-2', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-2', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-2', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-2', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-2', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-2', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 4 (Add Payment Gateway Integration)
  const task4Dates = generateDatesBetween(new Date('2025-04-15'), new Date('2025-04-22'))
  task4Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-4', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-4', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-4', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-4', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-4', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-4', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 6 (Optimize Image Loading)
  const task6Dates = generateDatesBetween(new Date('2025-04-20'), new Date('2025-04-26'))
  task6Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-6', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-6', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-6', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-6', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-6', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-6', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 7 (Create User Profile Page)
  const task7Dates = generateDatesBetween(new Date('2025-04-25'), new Date('2025-05-02'))
  task7Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-7', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-7', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-7', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-7', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-7', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-7', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 8 (Implement Order Tracking)
  const task8Dates = generateDatesBetween(new Date('2025-05-02'), new Date('2025-05-09'))
  task8Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-8', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-8', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-8', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-8', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-8', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-8', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 12 (Add Address Validation)
  const task12Dates = generateDatesBetween(new Date('2025-05-10'), new Date('2025-05-16'))
  task12Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-12', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-12', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-12', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-12', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-12', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-12', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 13 (Fix CSS in IE11)
  const task13Dates = generateDatesBetween(new Date('2025-05-15'), new Date('2025-05-17'))
  task13Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(1, 3)
    const qaWorkload = generateDailyWorkload(1, 1)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-13', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-13', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-13', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-13', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 14 (Performance Audit)
  const task14Dates = generateDatesBetween(new Date('2025-05-20'), new Date('2025-05-24'))
  task14Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-14', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-14', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-14', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-14', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-14', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-14', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 15 (Update Dependencies)
  const task15Dates = generateDatesBetween(new Date('2025-06-01'), new Date('2025-06-05'))
  task15Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(1, 2)
    const beWorkload = generateDailyWorkload(1, 2)
    const qaWorkload = generateDailyWorkload(1, 1)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-15', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-15', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-15', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-15', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-15', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-15', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

// Combine all workloads
export const mockTaskWorkloads: TaskWorkload[] = [
  ...generateCompletedTaskWorkloads(),
  ...generateInProgressTaskWorkloads(),
  ...generatePlannedTaskWorkloads()
] 