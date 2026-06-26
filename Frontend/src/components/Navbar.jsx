
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
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SocialApp
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to={`/profile/${user?._id}`}
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
