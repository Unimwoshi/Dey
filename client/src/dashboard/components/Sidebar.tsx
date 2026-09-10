import { Link, useLocation } from "react-router-dom";
import { Button } from "../../ui/UI";
import {
  PiHouse,
  PiBriefcase,
  PiWallet,
  PiUsersThree,
  PiSquaresFour,
  PiGear,
  PiUser,
} from "react-icons/pi";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <PiHouse className="w-4 h-4" />,
    matchExact: true,
  },
  {
    label: "Workspace",
    path: "/dashboard/workspace",
    icon: <PiBriefcase className="w-4 h-4" />,
  },
  {
    label: "Finances",
    path: "/dashboard/finances",
    icon: <PiWallet className="w-4 h-4" />,
  },
  {
    label: "Team",
    path: "/dashboard/team",
    icon: <PiUsersThree className="w-4 h-4" />,
  },
  {
    label: "Modules",
    path: "/dashboard/modules",
    icon: <PiSquaresFour className="w-4 h-4" />,
  },
];

interface SidebarProps {
  userName: string;
  userAvatarUrl?: string;
}

const Sidebar = ({ userName, userAvatarUrl }: SidebarProps) => {
  const location = useLocation();

  const isItemActive = (item: NavItem) =>
    item.matchExact
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);

  return (
    <>
      <div className="flex flex-col gap-8">
        <Link
          to="/dashboard"
          className="text-white-80 font-bold text-[20px] px-2"
        >
          Dey
        </Link>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              link={item.path}
              variant={isItemActive(item) ? "primary" : "secondary"}
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
        <Button
          link="/dashboard/settings"
          variant={
            location.pathname.startsWith("/dashboard/settings")
              ? "primary"
              : "secondary"
          }
          text="Settings"
          customClassName="justify-start w-full"
          size="small"
          icon={<PiGear className="w-4 h-4" />}
          iconPosition="leading"
        />

        <Link
          to="/dashboard/profile"
          className={`flex items-center gap-2 rounded-[4px] px-2 py-2 transition-colors ${
            location.pathname.startsWith("/dashboard/profile")
              ? "bg-white-8 border border-accent"
              : "hover:bg-white-8"
          }`}
        >
          <span className="w-8 h-8 rounded-full bg-white-8 flex items-center justify-center overflow-hidden shrink-0">
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <PiUser className="w-4 h-4 text-white-64" />
            )}
          </span>
          <span className="text-[14px] text-white-80 truncate">{userName}</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
