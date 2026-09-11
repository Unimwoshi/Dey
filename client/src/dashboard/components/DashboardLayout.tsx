import Sidebar from './Sidebar'
import MobileTabBar from './MobileTabBar'
import MoreBottomSheet from './MoreBottomSheet'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <aside className="onboarding-left-sidebar">
        <Sidebar userName="Woshi" />
      </aside>

      <main className="flex-1 md:ml-68 min-h-screen flex flex-col overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>

      <MobileTabBar />
      <MoreBottomSheet />
    </div>
  )
}

export default DashboardLayout