import {useLocation, Link} from 'react-router-dom'
import {useNavPreferences} from '../context/NavPreferences'
import {PiDotsThreeOutline} from 'react-icons/pi'

const MobileTabBar = () => {
  const location = useLocation()
  const { availableTabs, selectedTabIds, isMoreDrawerOpen, openMoreDrawer, closeMoreDrawer } = useNavPreferences()

  const tabsToShow = availableTabs.filter((item) => selectedTabIds.includes(item.id))

  const isItemActive = (item: (typeof availableTabs)[number]) =>
    item.matchExact ? location.pathname === item.path : location.pathname.startsWith(item.path)

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-secondary border-t border-white-8 flex items-stretch z-40"
      aria-label="Primary"
    >
      {tabsToShow.map((item) => {
        const active = isItemActive(item)
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              active ? 'text-accent' : 'text-white-64'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        )
      })}

      <button
        type="button"
        onClick={() => (isMoreDrawerOpen ? closeMoreDrawer() : openMoreDrawer())}
        className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
          isMoreDrawerOpen ? 'text-accent' : 'text-white-64'
        }`}
        aria-expanded={isMoreDrawerOpen}
        aria-label="More options"
      >
        <PiDotsThreeOutline className="w-5 h-5" />
        <span className="text-[10px]">More</span>
      </button>
    </nav>
  )
}

export default MobileTabBar