import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useFavoritesStoreDB = create((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,

  // Fetch all favorites for the logged-in user
  fetchFavoritesFromDB: async () => {
    set({ isLoading: true, error: null });

    try {
      let { data: favorites, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      favorites = favorites.map((fav) => {
        return {
          ...fav,
          imageUri: fav.image_uri,
        };
      });

      set({ favorites: favorites || [], error: null });
    } catch (error) {
      const errorMessage = "Failed to fetch favorites.";
      console.error(errorMessage, error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  //   Fetch a favorite by ID
  getFavoriteFromDbById: (id) => {
    return get().favorites.find((favorite) => favorite.id === id);
  },

  // Add a new favorite
  addFavoriteToDB: async (newFavoriteData) => {
    set({ isLoading: true, error: null });

    try {
      // Ensure the user is logged in and get their ID
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }
      const userId = user.id;

      console.log("Adding favorite for user:", userId, newFavoriteData);

      const { data, error } = await supabase
        .from("favorites")
        .insert([
          {
            user_id: userId, // Use the authenticated user's ID
            // Ensure the keys match database schema
            title: newFavoriteData.title,
            image_uri: newFavoriteData.image_uri,
            location: newFavoriteData.location, // location is an object with latitude, longitude, and address
            description: newFavoriteData.description,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      set((state) => ({
        favorites: [data, ...state.favorites],
        error: null,
      }));
    } catch (error) {
      const errorMessage = "Failed to add favorite.";
      console.error(errorMessage, error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove a favorite
  removeFavoriteFromDB: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const { error } = await supabase.from("favorites").delete().eq("id", id);

      if (error) throw error;

      set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== id),
      }));
    } catch (error) {
      const errorMessage = "Failed to add favorite.";
      console.error(errorMessage, error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
