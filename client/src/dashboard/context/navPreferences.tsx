import {createContext, useContext, useState, useCallback, ReactNode }from 'react'
import {navItems} from '../navConfig'
import type {NavItem} from '../navConfig'

const MAX_SELECTED_TABS = 3

interface NavPreferencesContextValue {
  // TEMPORARY mock — in production this list will be constrained by the
  // backend based on which modules the business has enabled (e.g. a
  // business without team members wouldn't see "Team" here at all). For
  // now it's the full static nav list so the picker UI can be demoed
  // end-to-end.
  availableTabs: NavItem[]

  // Which tab ids the user has pinned to the mobile bottom bar.
  // Session-only for now (plain useState) — resets on refresh, per the
  // demo-stage decision. Swap for persisted/backend-synced storage later;
  // nothing else in this context needs to change to support that.
  selectedTabIds: string[]
  toggleSelectedTab: (id: string) => void

  isMoreDrawerOpen: boolean
  openMoreDrawer: () => void
  closeMoreDrawer: () => void
}

const NavPreferencesContext = createContext<NavPreferencesContextValue | undefined>(undefined)

interface NavPreferencesProviderProps {
  children: ReactNode
}

export function NavPreferencesProvider({ children }: NavPreferencesProviderProps) {
  const [selectedTabIds, setSelectedTabIds] = useState<string[]>(['overview', 'workspace', 'finance'])
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false)

  const toggleSelectedTab = useCallback((id: string) => {
    setSelectedTabIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existingId) => existingId !== id)
      }
      if (prev.length >= MAX_SELECTED_TABS) {
        // Cap reached — ignore until the user frees a slot. Could surface
        // a toast here later explaining the limit.
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const openMoreDrawer = useCallback(() => setIsMoreDrawerOpen(true), [])
  const closeMoreDrawer = useCallback(() => setIsMoreDrawerOpen(false), [])

  const value: NavPreferencesContextValue = {
    availableTabs: navItems,
    selectedTabIds,
    toggleSelectedTab,
    isMoreDrawerOpen,
    openMoreDrawer,
    closeMoreDrawer,
  }

  return <NavPreferencesContext.Provider value={value}>{children}</NavPreferencesContext.Provider>
}

export function useNavPreferences(): NavPreferencesContextValue {
  const ctx = useContext(NavPreferencesContext)
  if (!ctx) {
    throw new Error('useNavPreferences must be used within a NavPreferencesProvider')
  }
  return ctx
}