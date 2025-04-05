import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import { useAuthStore } from "../store/useAuthStore";

const AppRoutes = () => {
  const { authUser } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
