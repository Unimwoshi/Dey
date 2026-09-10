import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiBell, PiCaretDown, PiUser, PiGear, PiSignOut } from "react-icons/pi";

interface DashboardHeaderProps {
  firstName: string;
  businessName?: string;
  unreadNotifications?: number;
  avatarUrl?: string;
  isLoading?: boolean;
  onSignOut?: () => void;
}

const DashboardHeader = ({
  firstName,
  businessName,
  unreadNotifications = 0,
  avatarUrl,
  isLoading = false,
  onSignOut,
}: DashboardHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-6 h-[64px] border-b border-white-8 shrink-0">
      <div className="flex flex-col min-w-0 gap-1">
        {isLoading ? (
          <>
            <div className="h-3 w-20 bg-white-8 rounded animate-pulse" />
            <div className="h-2.5 w-28 bg-white-8 rounded animate-pulse" />
          </>
        ) : (
          <>
            <span className="text-[14px] md:text-[16px] text-white-80 truncate">
              {firstName}
            </span>
            {businessName && (
              <span className="text-[12px] text-white-64 truncate">
                {businessName}
              </span>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-[4px] bg-white-4 border border-primary hover:bg-white-8 transition-colors"
        >
          <PiBell className="w-4 h-4 text-white-80" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
          )}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-[4px] px-2 h-9 bg-white-4 border border-primary hover:bg-white-8 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-white-8 flex items-center justify-center overflow-hidden shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PiUser className="w-3.5 h-3.5 text-white-64" />
              )}
            </span>
            <PiCaretDown
              className={`w-3 h-3 text-white-64 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute right-0 mt-2 w-44 rounded-[4px] bg-bg-secondary border border-accent overflow-hidden origin-top-right transition-all duration-150 ${
              menuOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 text-[14px] text-white-64 hover:bg-white-8 hover:text-white-80"
            >
              <PiUser className="w-4 h-4" /> Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2 text-[14px] text-white-64 hover:bg-white-8 hover:text-white-80"
            >
              <PiGear className="w-4 h-4" /> Settings
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-white-64 hover:bg-white-8 hover:text-white-80"
            >
              <PiSignOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
