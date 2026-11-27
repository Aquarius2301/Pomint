import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ThemeStore } from "./types";

const THEME_STORE_KEY = "pomint-theme-store";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      displayMode: "light",
      changeMode: () => {
        set((state) => ({
          displayMode: state.displayMode === "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: THEME_STORE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
