import Sidebar from '../nav'
import Header from '../ui/core-layout/header'

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-5.5rem)] pt-16 md:pt-0 bg-background">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
