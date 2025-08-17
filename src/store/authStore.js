import { useEffect } from "react";
import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  isLoading: true,
  initialize: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, isLoading: false });
    });

    // Set up listener for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.email);
      set({ session, user: session?.user ?? null, isLoading: false });
    });

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  },
}));

// Custom hook to initialize auth state
export const useInitializeAuth = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const cleanup = initialize();
    return cleanup;
  }, [initialize]);
};
