import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Bell, MessageCircle, Home, Users } from "lucide-react";
import { cn } from "./Sidebar"; // reuse utility

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <span className="font-bold text-xl leading-none">S</span>
            </div>
            <span className="hidden text-xl font-extrabold tracking-tight text-text-primary lg:block">
              SocialApp
            </span>
          </Link>
        </div>

        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="hidden rounded-full p-2 text-text-secondary transition hover:bg-background hover:text-text-primary sm:block">
            <Home className="h-6 w-6" />
          </Link>
          <Link to="/About" className="hidden rounded-full p-2 text-text-secondary transition hover:bg-background hover:text-text-primary sm:block">
            <Users className="h-6 w-6" />
          </Link>
          
          
          {user && (
            <Link
              to={`/profile/${user?._id}`}
              className="ml-2 block h-9 w-9 overflow-hidden rounded-full ring-2 ring-transparent transition hover:ring-primary"
            >
              <img
                src={
                  user?.profilePicture ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=random`
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

