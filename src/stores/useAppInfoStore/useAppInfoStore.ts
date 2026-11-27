import { AppInfoStore } from "./types";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { DEFAULT_APP_INFO } from "@/constants";

const APPINFO_STORE_KEY = "pomint-appinfo-store";

export const useAppInfoStore = create<AppInfoStore>()(
  persist(
    (set) => ({
      info: DEFAULT_APP_INFO,
      setAppInfo: (state) =>
        set({ info: { appName: state.appName, version: "v" + state.version } }),
    }),
    {
      name: APPINFO_STORE_KEY,
    },
  ),
);
