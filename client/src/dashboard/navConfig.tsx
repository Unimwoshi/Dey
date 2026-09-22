import {PiHouse, PiBriefcase, PiWallet, PiUsersThree, PiSquaresFour, PiGear, PiUser} from 'react-icons/pi'

export interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
  matchExact?: boolean
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', path: '/dashboard/overview', icon: <PiHouse className="w-5 h-5" />, matchExact: true },
  { id: 'workspace', label: 'Workspace', path: '/dashboard/workspace', icon: <PiBriefcase className="w-5 h-5" /> },
  { id: 'finance', label: 'Finance', path: '/dashboard/finance', icon: <PiWallet className="w-5 h-5" /> },
  { id: 'team', label: 'Team', path: '/dashboard/team', icon: <PiUsersThree className="w-5 h-5" /> },
  { id: 'modules', label: 'Modules', path: '/dashboard/modules', icon: <PiSquaresFour className="w-5 h-5" /> },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: <PiGear className="w-5 h-5" /> },
  { id: 'profile', label: 'Profile', path: '/dashboard/profile', icon: <PiUser className="w-5 h-5" /> },
]