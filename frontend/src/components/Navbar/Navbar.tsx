import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessagesSquare, Settings, User, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="w-full bg-base-100 border-b border-base-200 fixed top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="w-9 h-9 rounded-full bg-base-300 flex items-center justify-center">
              <MessagesSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Chat App</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {!authUser && (
            <>
              <Link to="/login" className={`btn btn-sm gap-2 transition-all`}>
                <LogIn className="w-4 h-4" />
                <span className="hidden md:block">Login</span>
              </Link>
              <Link to={"/signup"} className={`btn btn-sm gap-2 transition-all`}>
                <UserPlus className="w-4 h-4" />
                <span className="hidden md:block">Register</span>
              </Link>
            </>
          )}
          <Link to="/settings" className={`btn btn-sm gap-2 transition-all`}>
            <Settings className="w-4 h-4" />
            <span className="hidden md:block">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link to="/profile" className={`btn btn-sm gap-2 transition-all`}>
                <User className="w-4 h-4" />
                <span className="hidden md:block">Profile</span>
              </Link>
              <button onClick={logout} className="flex gap-2 items-center cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
