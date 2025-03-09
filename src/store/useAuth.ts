import { isAuthenticated as checkAuth } from "@/services/auth";
import { create } from "zustand";

type User = {
  first_name: string;
  last_name: string;
};

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
  user: User | null;
  setUser: (user: User) => void;
};

const useAuth = create<Store>()((set) => ({
  isAuthenticated: checkAuth(),
  user: null,
  setIsAuthenticated: () =>
    set((state) => ({ isAuthenticated: !state.isAuthenticated })),
  setUser: (user: User) => set(() => ({ user })),
}));

export default useAuth;
