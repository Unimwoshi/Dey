import {Link, useLocation} from 'react-router-dom'
import {Button} from '../../ui/UI'
import {navItems} from '../navConfig'
import {PiGear, PiUser} from 'react-icons/pi'

interface SidebarProps {
  userName: string
  userAvatarUrl?: string
}

const Sidebar = ({ userName, userAvatarUrl }: SidebarProps) => {
  const location = useLocation()

  const isItemActive = (item: (typeof navItems)[number]) =>
    item.matchExact ? location.pathname === item.path : location.pathname.startsWith(item.path)

  // Primary nav shows everything except Settings and Profile — those get
  // their own dedicated slot at the bottom, matching the original layout.
  const primaryItems = navItems.filter((item) => item.id !== 'settings' && item.id !== 'profile')
  const settingsItem = navItems.find((item) => item.id === 'settings')

  return (
    <>
      <div className="flex flex-col gap-8">
        <Link to="/dashboard" className="text-white-80 font-bold text-[20px] px-2">
          Dey
        </Link>

        <nav className="flex flex-col gap-2">
          {primaryItems.map((item) => (
            <Button
              key={item.id}
              link={item.path}
              variant={isItemActive(item) ? 'primary' : 'secondary'}
              text={item.label}
              customClassName="justify-start w-full"
              size="small"
              icon={item.icon}
              iconPosition="leading"
            />
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 px-2">
        {settingsItem && (
          <Button
            link={settingsItem.path}
            variant={isItemActive(settingsItem) ? 'primary' : 'secondary'}
            text={settingsItem.label}
            customClassName="justify-start w-full"
            size="small"
            icon={settingsItem.icon}
            iconPosition="leading"
          />
        )}

        <Link
          to="/dashboard/profile"
          className={`flex items-center gap-2 rounded-[4px] px-2 py-2 transition-colors ${
            location.pathname.startsWith('/dashboard/profile')
              ? 'bg-white-8 border border-accent'
              : 'hover:bg-white-8'
          }`}
        >
          <span className="w-8 h-8 rounded-full bg-white-8 flex items-center justify-center overflow-hidden shrink-0">
            {userAvatarUrl ? (
              <img src={userAvatarUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <PiUser className="w-4 h-4 text-white-64" />
            )}
          </span>
          <span className="text-[14px] text-white-80 truncate">{userName}</span>
        </Link>
      </div>
    </>
  )
}

export default Sidebar