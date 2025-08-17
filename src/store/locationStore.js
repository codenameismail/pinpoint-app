import { create } from "zustand";

export const useLocationStore = create((set) => ({
  // Temporary location state storage
  pickedLocation: null,
  setPickedLocation: (location) => set({ pickedLocation: location }),
  clearPickedLocation: () => set({ pickedLocation: null }),
}));
