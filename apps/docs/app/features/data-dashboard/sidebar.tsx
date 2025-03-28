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
  SidebarTrigger,
  useSidebar,
  SidebarMenuBadge,
  SidebarGroupLabel,
  SidebarRail,
} from '@3a.solutions/ui/sidebar'
import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  CheckSquareIcon,
  BarChart2Icon,
  CalendarIcon,
  Clock,
  FileTextIcon,
} from 'lucide-react'

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center px-2">
        <div className="w-2/3 h-10 flex justify-center">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nav</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard" isActive>
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Projects">
                <BriefcaseIcon />
                <span>Projects</span>
                <SidebarMenuBadge className="ml-2">5</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Tasks">
                <CheckSquareIcon />
                <span>Tasks</span>
                <SidebarMenuBadge className="ml-2">10</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Team">
                <UsersIcon />
                <span>Team</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Reports">
                <BarChart2Icon />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Calendar">
                <CalendarIcon />
                <span>Calendar</span>
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
            <span className="text-sm">Time Tracking</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Track time spent on tasks and projects</p>
          <Button variant="outline" size="sm" className="w-full">
            Start Timer
          </Button>
        </div>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
