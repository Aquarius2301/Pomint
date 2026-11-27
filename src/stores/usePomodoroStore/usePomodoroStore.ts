import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PomodoroStore } from "./types";
import { DEFAULT_SETTINGS } from "@/constants";

const POMODORO_STORE_KEY = "pomint-pomodoro-store";

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set) => {
      return {
        pomodoro: {
          mode: "work",
          sessionsCycle: 0,
          seconds: DEFAULT_SETTINGS.workTime,
        },
        setPomodoro: (pomodoro) =>
          set((state) => ({ pomodoro: { ...state.pomodoro, ...pomodoro } })),
      };
    },
    {
      name: POMODORO_STORE_KEY,
    },
  ),
);
