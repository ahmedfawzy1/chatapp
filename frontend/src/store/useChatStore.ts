import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

interface Message {
  _id: string;
  text: string;
  senderId: string;
  receiverId: string;
  image?: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (message: { text: string; image?: string | null }) => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message: { text: string; image?: string | null }) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, message);
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: Message) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
