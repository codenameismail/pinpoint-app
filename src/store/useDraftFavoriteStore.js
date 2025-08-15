import { create } from "zustand";

export const useDraftFavoriteStore = create((set) => ({
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
}));
