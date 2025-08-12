import { create } from "zustand";

export const useMealStore = create((set) => ({
  ids: [],
  recentlyViewedIds: [],

  addFavorite: (mealId) => {
    set((state) => ({
      ids: [...state.ids, mealId],
    }));
  },

  removeFavorite: (mealId) => {
    set((state) => ({
      ids: state.ids.filter((id) => id !== mealId),
    }));
  },

  addRecentlyViewed: (mealId) => {
    set((state) => {
      const filteredIds = state.recentlyViewedIds.filter(id => id !== mealId)
      const newIds = [mealId, ...filteredIds]
      return {recentlyViewedIds: newIds.slice(0, 5)}
    });
  },
}));
