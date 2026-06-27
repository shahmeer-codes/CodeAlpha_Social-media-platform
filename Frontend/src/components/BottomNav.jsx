import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "./Sidebar";

const BottomNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Explore", icon: Search, path: "/explore" },
    { name: "Create", icon: PlusSquare, path: "/create" },
    { name: "Activity", icon: Heart, path: "/notifications" },
    { name: "Profile", icon: User, path: `/profile/${user?._id}` },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-white/90 backdrop-blur-lg lg:hidden pb-safe">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-transform duration-200",
                  isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
