import { Home, User, Info, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../context/AuthContext";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BottomNav = () => {
  const { user } = useAuth();

  const menuItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Profile", icon: User, path: `/profile/${user?._id}` },
    { name: "About", icon: Info, path: "/about" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white lg:hidden">
      <nav className="flex items-center justify-around py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                )
              }
            >
              <Icon className="h-6 w-6" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;