import { ReactNode } from 'react'
import ThemeSwitcher from '../../ui/core-layout/theme-switcher'
import '@3a-ui/ui/styles.css'
import { SidebarInset, SidebarProvider } from '@3a.solutions/ui/sidebar'
import { AppSidebar } from '@/features/data-dashboard/sidebar'
import { Header } from './header'
import { BaseDataProvider } from './data-context/base-data-provider'
import { EmployeeProvider } from './data-context/employee-provider'
import { ProjectDataProvider } from './data-context/project-data-provider'
import {
  mockProject,
  mockEpics,
  mockTasks,
  mockProjectMilestones,
  mockEmployeesInProject,
  mockEmployees,
  mockTaskWorkloads,
  mockEmployeeSkills,
  mockExpertiseDomains,
} from './_MOCK-DATA'
import { TasksDataProvider } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { AnalyticsProvider } from './data-context/analytics-provider'

export default function FeaturesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BaseDataProvider expertiseDomains={mockExpertiseDomains}>
        <EmployeeProvider employees={mockEmployees} employeeSkills={mockEmployeeSkills}>
          <ProjectDataProvider
            project={mockProject}
            epics={mockEpics}
            tasks={mockTasks}
            milestones={mockProjectMilestones}
            employeesInProject={mockEmployeesInProject}
            taskWorkloads={mockTaskWorkloads}
          >
            <TasksDataProvider>
              <AnalyticsProvider>
                <SidebarProvider defaultOpen={false} className="flex flex-col bg-sidebar">
                  <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset className="flex flex-1 bg-sidebar">
                      <div className="relative overflow-clip rounded-xl mr-4 mb-4">
                        <Header />
                        {children}
                      </div>
                    </SidebarInset>
                    <div className="fixed bottom-4 right-4 hidden md:block z-100">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </SidebarProvider>
              </AnalyticsProvider>
            </TasksDataProvider>
          </ProjectDataProvider>
        </EmployeeProvider>
      </BaseDataProvider>
    </>
  )
}
