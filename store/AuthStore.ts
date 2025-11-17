import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useAuthStore;
