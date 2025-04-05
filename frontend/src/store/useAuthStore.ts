import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; email: string; profilePic: string }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Error checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: { name: string; email: string; password: string }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error signUp", error.response.data.message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: { email: string; password: string }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error login", error.response.data.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error("Something went wrong");
    }
  },

  updateProfile: async (data: { profilePic: string }) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error("Something went wrong while updating profile");
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
