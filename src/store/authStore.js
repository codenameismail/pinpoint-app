import { useEffect } from "react";
import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  isLoading: true,
  initialize: async () => {
    // This is set up once, to get the initial session and set up the listener.
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, isLoading: false });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });

    // We can return a cleanup function from the initializer
    return () => {
      subscription.unsubscribe();
    };
  },
}));

// A custom hook to initialize the auth state on app startup.
export const useInitializeAuth = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();

    // cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [initialize]);
};
