import { api } from "@/utils/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ReferredUser {
  referralCode: string;
  status: "converted" | "pending";
}

interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  referralCode: string;
  referredUsers: ReferredUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  signup: (params: {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
  }) => Promise<void>;
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  signup: async ({ name, email, password, referralCode }) => {
    try {
      const { data } = await api.post("/api/user/signup", {
        name,
        email,
        password,
        referralCode,
      });
      set({ authUser: data.user });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error || "Something went wrong");
      console.log(error);
    }
  },
  login: async ({ email, password }) => {
    try {
      const { data } = await api.post("/api/user/login", { email, password });
      set({ authUser: data.user });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  },
  logout: async () => {
    try {
      const { data } = await api.post("/api/user/logout");
      set({ authUser: null });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  },
  checkAuth: async () => {
    try {
      const { data } = await api.post("/api/user/check-auth");
      set({ authUser: data.user });
      set({ isCheckingAuth: false });
    } catch (error: any) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
