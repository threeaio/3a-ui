// Helper function to generate dates between start and end
export const generateDatesBetween = (start: Date, end: Date): Date[] => {
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
export const generateDailyWorkload = (baseMin: number, baseMax: number): [number, number] => {
  const total = Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin
  const morning = Math.ceil(total * (0.4 + Math.random() * 0.2)) // 40-60% in morning
  const afternoon = total - morning
  return [morning, afternoon]
}

// Helper to generate morning and afternoon dates
export const generateDayParts = (date: Date): [Date, Date] => {
  const morning = new Date(date)
  morning.setHours(9, 0, 0, 0)
  const afternoon = new Date(date)
  afternoon.setHours(14, 0, 0, 0)
  return [morning, afternoon]
} 