import { create } from "zustand";

export const useDraftFavoriteStore = create((set, get) => ({
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

  // Check if draft is empty (no unsaved changes)
  hasDraftContent: () => {
    const { draftFavorite } = get();
    return (
      draftFavorite.title.trim() !== "" ||
      draftFavorite.imageUri !== null ||
      draftFavorite.description.trim() !== ""
    );
  },
}));
