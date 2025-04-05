import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar.tsx";
import { useAuthStore } from "./store/useAuthStore.ts";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <AppRoutes />
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
