import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Settings from "../pages/Settings";
import CreatePost from "../pages/CreatePost";

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />

      {/* Protected Routes wrapped in MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
      
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;

