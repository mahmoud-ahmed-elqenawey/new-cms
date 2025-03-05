import { isAuthenticated as checkAuth } from "@/services/auth";
import { create } from "zustand";

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
  user: {};
  setUser: (user: {}) => void;
};

const useAuth = create<Store>()((set) => ({
  isAuthenticated: checkAuth(),
  user: {},
  setIsAuthenticated: () =>
    set((state) => ({ isAuthenticated: !state.isAuthenticated })),
  setUser: (user) => set(() => ({ user })),
}));

export default useAuth;
