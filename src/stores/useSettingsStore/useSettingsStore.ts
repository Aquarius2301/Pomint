import { create } from "zustand";
import { SettingsStore } from "./types";
import { persist } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "@/constants";

const SETTING_STORE_KEY = "pomint-setting-store";

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      resetSettings: () => {
        set({ settings: DEFAULT_SETTINGS });
      },
    }),
    {
      name: SETTING_STORE_KEY,
    },
  ),
);
