import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use mock data for initial storage temporarily
import { favorites as initialFavorites } from "../data/favorites";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: initialFavorites,

      //   add a new favorite
      addFavorite: (favoriteObject) => {
        set((state) => ({
          favorites: [...state.favorites, favoriteObject],
        }));
      },

      //   remove a favorite by id
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite.id !== id),
        }));
      },

      //   get a favorite by id
      getFavoriteById: (id) => {
        return get().favorites.find((favorite) => favorite.id === id);
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
