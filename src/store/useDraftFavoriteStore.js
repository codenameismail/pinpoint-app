import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useDraftFavoriteStore = create(
  persist(
    (set) => ({
      // Temporary form state storage
      draftFavorite: {
        title: "",
        imageUri: null,
        description: "",
      },

      // Update draft favorite data
      updateDraftFavorite: (data) => {
        set((state) => ({
          draftFavorite: {
            ...state.draftFavorite,
            ...data,
          },
        }));
      },

      // Clear draft favorite data
      clearDraftFavorite: () => {
        set({
          draftFavorite: {
            title: "",
            imageUri: null,
            description: "",
          },
        });
      },
    }),
    {
      name: "draft-favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
