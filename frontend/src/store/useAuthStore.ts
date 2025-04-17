import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface User {
  _id: string;
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
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signUp: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; email: string; profilePic: string }) => Promise<boolean>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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

      get().connectSocket();
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
      get().disconnectSocket();
      return true;
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error("Something went wrong while updating profile");
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(import.meta.env.VITE_BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
    }
  },
}));
