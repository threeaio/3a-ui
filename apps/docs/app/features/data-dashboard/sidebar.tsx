'use client'

import Logo from '@/ui/core-layout/logo'
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
  SidebarMenuBadge,
  SidebarGroupLabel,
  useSidebar,
} from '@3a.solutions/ui/sidebar'
import {
  SettingsIcon,
  UsersIcon,
  LayoutDashboardIcon,
  CheckSquareIcon,
  BarChart2Icon,
  Clock,
  FileTextIcon,
  HistoryIcon,
} from 'lucide-react'
import { Progress } from '@3a.solutions/ui/progress'
import { useProjectDataContext } from './data-context/project-data-provider'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const { state } = useSidebar()
  const { project, tasks, employeesInProject } = useProjectDataContext()
  const team = employeesInProject
  const todoTasks = tasks.filter((task) => task.status === 'planned').length
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length

  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center px-2 pt-9">
        <div className="w-2/3 h-10 flex justify-center">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-3">
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="truncate">Project: {project?.name || ''}</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Overview" asChild isActive={pathname === '/features/data-dashboard'}>
                <Link href="/features/data-dashboard">
                  <LayoutDashboardIcon />
                  <span>Overview</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Tasks" isActive={pathname === '/features/data-dashboard/epics'}>
                <Link href="/features/data-dashboard/epics">
                  <CheckSquareIcon />
                  <span>Tasks</span>
                  <SidebarMenuBadge className="ml-2">{todoTasks + inProgressTasks}</SidebarMenuBadge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Team" isActive={pathname === '/features/data-dashboard/team'}>
                <Link href="/features/data-dashboard/team">
                  <UsersIcon />
                  <span>Team</span>
                  <SidebarMenuBadge className="ml-2">{team.length}</SidebarMenuBadge>
                </Link>
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
          <p className="text-xs text-muted-foreground mb-3">{10}% Complete</p>
          <Progress value={10} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
