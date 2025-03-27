import { ReactNode } from 'react'
import ThemeSwitcher from '../../ui/core-layout/theme-switcher'
import BackButton from '../../ui/core-layout/back-button'
import '@3a-ui/ui/styles.css'
import { SidebarInset, SidebarProvider } from '@3a.solutions/ui/sidebar'
import { AppSidebar } from '@/features/data-dashboard/sidebar'
import Header from './components/header'

export default function FeaturesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider defaultOpen={false} className="flex flex-col bg-sidebar">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex flex-1 bg-sidebar">
            <div className="relative overflow-clip rounded-xl mr-4 mb-4">
              <Header />
              {children}
            </div>
          </SidebarInset>
          <div className="fixed bottom-4 right-4 hidden md:block">
            <ThemeSwitcher />
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
