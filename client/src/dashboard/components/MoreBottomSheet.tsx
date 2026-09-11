import {Link} from 'react-router-dom'
import {useNavPreferences} from '../context/NavPreferences'
import {PiX, PiCheck} from 'react-icons/pi'

const MoreBottomSheet = () => {
  const { availableTabs, selectedTabIds, toggleSelectedTab, isMoreDrawerOpen, closeMoreDrawer } = useNavPreferences()

  const remainingItems = availableTabs.filter((item) => !selectedTabIds.includes(item.id))

  return (
    <>
      <div
        onClick={closeMoreDrawer}
        className={`md:hidden fixed inset-0 bg-black-10 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          isMoreDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <div
        className={`md:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-[16px] bg-bg-secondary border-t border-primary max-h-[75vh] overflow-y-auto custom-scrollbar transition-transform duration-200 ${
          isMoreDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="More navigation options"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[14px] text-white-80 font-semibold">More</span>
          <button type="button" onClick={closeMoreDrawer} aria-label="Close" className="text-white-64 p-1">
            <PiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-3 pb-4">
          <span className="text-[11px] text-white-40 px-2 pt-2 pb-1">Navigate</span>
          {remainingItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={closeMoreDrawer}
              className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors text-white-80"
            >
              <span className="text-white-64">{item.icon}</span>
              <span className="text-[14px]">{item.label}</span>
            </Link>
          ))}
        </div>

        {/*
          TEMPORARY / MOCK: "Customize your tabs" lets the user choose which
          nav items are pinned to the mobile bottom tab bar. Right now
          `availableTabs` is a hardcoded full list of every nav destination
          (see navConfig.tsx), so every business currently sees the same
          customization options.

          In production, `availableTabs` should instead be supplied by the
          backend, scoped to whichever modules the business has actually
          enabled — e.g. a business without team members wouldn't see
          "Team" as an option here at all. Once that exists, this section
          needs no structural change: it just needs to receive a smaller,
          business-specific `availableTabs` list from context instead of
          the static one currently in navConfig.tsx.

          Tab selection itself is also session-only for now (plain
          useState in NavPreferencesContext) and resets on refresh — an
          intentional simplification for this demo stage. Swap that for
          persisted/backend-synced storage later without touching this UI.
        */}
        <div className="flex flex-col gap-1 px-3 pb-6 border-t border-white-8 pt-3">
          <span className="text-[11px] text-white-40 px-2 pb-1">Customize your tabs (up to 3)</span>
          {availableTabs.map((item) => {
            const selected = selectedTabIds.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleSelectedTab(item.id)}
                className="flex items-center gap-3 px-2 py-2 rounded-[4px] hover:bg-white-8 transition-colors text-left"
              >
                <span className={selected ? 'text-accent' : 'text-white-64'}>{item.icon}</span>
                <span className={`text-[14px] flex-1 ${selected ? 'text-white-80' : 'text-white-64'}`}>
                  {item.label}
                </span>
                {selected && <PiCheck className="w-4 h-4 text-accent shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MoreBottomSheet