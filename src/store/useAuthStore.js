import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      // State
      isAuthenticated: false,
      user: null,

      // Actions
      authenticate: (userData) => {
        set({ isAuthenticated: true, user: userData });
      },

      logOut: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
