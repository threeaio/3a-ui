import { useMemo } from 'react'
import { Task, TaskWorkload, Employee, ExpertiseDomain } from '@/features/data-dashboard/types/domain'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface EpicDomainMetricsProps {
  tasks: Task[]
  getWorkloadsByTask: (taskId: string) => Array<{ workload: TaskWorkload; employee: Employee }>
  employees: Employee[]
}

export function EpicDomainMetrics({ tasks, getWorkloadsByTask, employees }: EpicDomainMetricsProps) {
  const domainMetrics = useMemo(() => {
    // First collect all unique domains from tasks
    const uniqueDomains = new Set<ExpertiseDomain>()
    tasks.forEach((task) => {
      task.relatedExpertiseDomains.forEach((domain) => uniqueDomains.add(domain))
    })

    // For each domain, calculate total workload and employee distribution
    const metrics = Array.from(uniqueDomains).map((domain) => {
      const domainTasks = tasks.filter((task) => task.relatedExpertiseDomains.includes(domain))
      const workloads = domainTasks.flatMap((task) => getWorkloadsByTask(task.id))

      const totalWorkload = workloads.reduce((sum, w) => sum + w.workload.workload, 0)

      // Get unique employees who worked on this domain
      const uniqueEmployees = new Set(workloads.map((w) => w.employee.id))
      const domainEmployees = employees.filter(
        (emp) =>
          uniqueEmployees.has(emp.id) && emp.skills.some((skill) => skill.relatedExpertiseDomains.includes(domain)),
      )

      return {
        domain,
        totalWorkload,
        employeeCount: domainEmployees.length,
      }
    })

    // Calculate percentages
    const totalOverallWorkload = metrics.reduce((sum, m) => sum + m.totalWorkload, 0)
    return metrics
      .map((m) => ({
        ...m,
        workloadPercentage: totalOverallWorkload > 0 ? (m.totalWorkload / totalOverallWorkload) * 100 : 0,
      }))
      .sort((a, b) => b.workloadPercentage - a.workloadPercentage)
  }, [tasks, getWorkloadsByTask, employees])

  const chartData = useMemo(() => {
    return domainMetrics.map((metric) => ({
      domain: metric.domain,
      value: metric.workloadPercentage,
    }))
  }, [domainMetrics])

  return (
    <div className="relative min-h-[200px]">
      <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="linear"
              dataKey="value"
              stroke="var(--default)"
              strokeWidth={1}
              dot={true}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        className="divide-x relative z-10"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${domainMetrics.length}, 1fr)` }}
      >
        {domainMetrics.map((metric) => (
          <div key={metric.domain} className="px-5 flex flex-col min-h-[200px]">
            <div className="flex-1">
              <h4 className="text-sm font-semibold mb-3 capitalize">{metric.domain}</h4>
              <div>
                <p className="text-3xl font-semibold text-default">{metric.workloadPercentage.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">of workload</p>
              </div>
            </div>
            <div className="text-sm mt-auto">
              <p className="text-xs text-muted-foreground">
                <span className="text-base font-medium text-default">{metric.employeeCount}</span>&nbsp; contributors
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
