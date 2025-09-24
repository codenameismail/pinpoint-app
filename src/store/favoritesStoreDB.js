import { create } from "zustand";
import { supabase } from "../utils/supabase";
import { deleteImage } from "../utils/supabaseImageStorage";

import { favorites as initialFavorites } from "../data/favorites";

export const useFavoritesStoreDB = create((set, get) => ({
  favorites: initialFavorites,
  isLoading: false,
  error: null,

  // Fetch all favorites for the logged-in user
  fetchFavoritesFromDB: async () => {
    set({ isLoading: true, error: null });

    try {
      let { data: savedFavorites, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      // Replace favorites with fresh data: saved favorites + initial favorites
      set(() => ({
        favorites: [...savedFavorites, ...initialFavorites],
        error: null,
      }));
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
      const { data, error } = await supabase
        .from("favorites")
        .insert([
          {
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

      console.log("Favorite added successfully:", data);

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
      // First get the favorite so that we can use the image URL
      const favoriteToDelete = get().favorites.find((fav) => fav.id === id);

      if (!favoriteToDelete) {
        throw new Error("Favorite not found");
      }

      // Delete from database first
      const { error } = await supabase.from("favorites").delete().eq("id", id);

      if (error) throw error;

      // Update local state immediately (optimistic update)
      set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== id),
      }));

      // Try to delete the image from storage (non-blocking)
      if (favoriteToDelete.image_uri) {
        const deleteSuccess = await deleteImage(favoriteToDelete.image_uri);
        if (!deleteSuccess) {
          console.warn(
            "Image deletion failed, but favorite was removed from DB.",
          );
        }
      }
    } catch (error) {
      const errorMessage = "Failed to add favorite.";
      console.error(errorMessage, error);
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
}));
