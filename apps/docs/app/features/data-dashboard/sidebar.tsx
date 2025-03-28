'use client'

import Logo from '@/ui/core-layout/logo'
import { Badge } from '@3a.solutions/ui/badge'
import { Button } from '@3a.solutions/ui/button'
import { cn } from '@3a.solutions/ui/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuBadge,
  SidebarGroupLabel,
} from '@3a.solutions/ui/sidebar'
import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  LayoutDashboardIcon,
  CheckSquareIcon,
  BarChart2Icon,
  CalendarIcon,
  Clock,
  FileTextIcon,
  AlertTriangleIcon,
  FlagIcon,
  HistoryIcon,
} from 'lucide-react'
import { useProjectData, useTasksData, useRisksData, useMilestonesData } from './data-context'

export function AppSidebar() {
  const { state } = useSidebar()
  const { project } = useProjectData()
  const { tasks } = useTasksData()
  const { risks } = useRisksData()
  const { milestones } = useMilestonesData()

  // Count tasks by status
  const todoTasks = tasks.filter((task) => task.status === 'todo').length
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length
  const reviewTasks = tasks.filter((task) => task.status === 'review').length

  // Count active risks
  const activeRisks = risks.filter((risk) => risk.status !== 'resolved').length

  // Count upcoming milestones
  const upcomingMilestones = milestones.filter(
    (milestone) => milestone.status === 'upcoming' || milestone.status === 'in-progress',
  ).length

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center px-2">
        <div className="w-2/3 h-10 flex justify-center">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project: {project.name}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Overview" isActive>
                <LayoutDashboardIcon />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Tasks">
                <CheckSquareIcon />
                <span>Tasks</span>
                <SidebarMenuBadge className="ml-2">{todoTasks + inProgressTasks + reviewTasks}</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Team">
                <UsersIcon />
                <span>Team</span>
                <SidebarMenuBadge className="ml-2">{project.teamSize}</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Risks">
                <AlertTriangleIcon />
                <span>Risks</span>
                <SidebarMenuBadge className="ml-2">{activeRisks}</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Milestones">
                <FlagIcon />
                <span>Milestones</span>
                <SidebarMenuBadge className="ml-2">{upcomingMilestones}</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Timeline">
                <HistoryIcon />
                <span>Timeline</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Documents">
                <FileTextIcon />
                <span>Documents</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Reports">
                <BarChart2Icon />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            'bg-muted rounded-lg p-3 m-2 justify-center transition-all',
            state === 'collapsed' && 'opacity-0',
            state === 'expanded' && ' opacity-100',
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-sm">Project Progress</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{project.progress}% Complete</p>
          <div className="w-full bg-background rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
