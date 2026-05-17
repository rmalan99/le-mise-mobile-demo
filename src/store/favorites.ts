import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

const FAVORITES_KEY = "le-mise-favorites";
const FAVORITES_STORE_VERSION = 1;

interface FavoritesStore {
  /** Set of favorite recipe IDs */
  favoriteIds: Set<string>;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

function normalizeFavorites(raw: unknown): Set<string> {
  if (Array.isArray(raw)) {
    return new Set(raw.filter((id) => typeof id === "string"));
  }
  return new Set();
}

const favoritesStorage: StateStorage = {
  getItem: (name) => {
    try {
      const raw = localStorage.getItem(name);
      if (raw === null) return null;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.state?.favoriteIds)) {
        return JSON.stringify(parsed);
      }
      return JSON.stringify({
        state: { favoriteIds: normalizeFavorites(parsed) },
        version: FAVORITES_STORE_VERSION,
      });
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // storage unavailable - fail silently
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // storage unavailable - fail silently
    }
  },
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: new Set<string>(),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      toggleFavorite: (recipeId) => {
        set((state) => {
          const next = new Set(state.favoriteIds);
          if (next.has(recipeId)) {
            next.delete(recipeId);
          } else {
            next.add(recipeId);
          }
          return { favoriteIds: next };
        });
      },
      isFavorite: (recipeId) => get().favoriteIds.has(recipeId),
    }),
    {
      name: FAVORITES_KEY,
      version: FAVORITES_STORE_VERSION,
      storage: createJSONStorage(() => favoritesStorage),
      merge: (persistedState, currentState) => {
        const raw = (persistedState as { favoriteIds?: unknown })?.favoriteIds;
        return {
          ...currentState,
          favoriteIds: normalizeFavorites(raw),
        };
      },
      partialize: ({ favoriteIds }) => ({
        favoriteIds: Array.from(favoriteIds),
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);