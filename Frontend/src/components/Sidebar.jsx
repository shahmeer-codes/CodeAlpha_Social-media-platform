import {
  Home,
  User,
  Info,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "Profile", icon: User, path: `/profile/${user?._id}` },
    { name: "About", icon: Info, path: "/about" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="flex h-screen w-full flex-col justify-between bg-white px-4 py-6">
      {/* Logo */}
      <div>
        

        {/* Home Button */}
        <nav className="space-y-2">
          <Link
            to="/"
            className={cn(
              "group flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
              location.pathname === "/"
                ? "bg-primary-light text-primary font-semibold"
                : "text-text-primary hover:bg-background"
            )}
          >
            <Home
              className={cn(
                "h-6 w-6 transition-transform duration-200 group-hover:scale-105",
                location.pathname === "/"
                  ? "text-primary"
                  : "text-text-primary"
              )}
              strokeWidth={location.pathname === "/" ? 2.5 : 2}
            />
            <span>Home</span>
          </Link>

          {/* Remaining Menu */}
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-text-primary hover:bg-background"
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 transition-transform duration-200 group-hover:scale-105",
                    isActive ? "text-primary" : "text-text-primary"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border pt-5">
        {user && (
          <Link
            to={`/profile/${user._id}`}
            className="mb-4 flex items-center gap-3 rounded-xl p-3 transition hover:bg-background"
          >
            <img
              src={
                user.profilePicture ||
                `https://ui-avatars.com/api/?name=${user.name}&background=random`
              }
              alt={user.name}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-text-primary">
                {user.name}
              </p>
              <p className="truncate text-sm text-text-secondary">
                @{user.username || user.email?.split("@")[0]}
              </p>
            </div>
          </Link>
        )}

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