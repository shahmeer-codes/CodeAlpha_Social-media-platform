import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          SocialApp
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to={`/profile/${user?._id}`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow transition-all duration-300 hover:scale-105 hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
