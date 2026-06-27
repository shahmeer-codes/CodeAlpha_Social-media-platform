import {
  Home,
  User,
  Info,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Profile",
      icon: User,
      path: `/profile/${user?._id}`,
    },
    {
      name: "About",
      icon: Info,
      path: "/about",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-white px-4 py-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-text-primary hover:bg-background"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-transform duration-200 group-hover:scale-105",
                      isActive ? "text-primary" : "text-text-primary"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border pt-5">
        <button
          onClick={logout}
          className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base font-medium text-text-primary transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            className="h-6 w-6 transition-transform duration-200 group-hover:scale-105 group-hover:text-red-600"
            strokeWidth={2}
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;