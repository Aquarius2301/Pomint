import { AppSettings } from "@/stores";
import {
  DEFAULT_WORK_TIME_SECONDS,
  DEFAULT_LONG_BREAK_TIME_SECONDS,
  DEFAULT_SESSIONS_BEFORE_LONG_BREAK,
  DEFAULT_SHORT_BREAK_TIME_SECONDS,
} from "./pomodoro";

export const DEFAULT_SETTINGS: AppSettings = {
  workTime: DEFAULT_WORK_TIME_SECONDS,
  shortBreakTime: DEFAULT_SHORT_BREAK_TIME_SECONDS,
  longBreakTime: DEFAULT_LONG_BREAK_TIME_SECONDS,
  sessionsBeforeLongBreak: DEFAULT_SESSIONS_BEFORE_LONG_BREAK,
  autoStartWork: false,
  autoStartBreak: false,
  enableNotifications: true,
  enableSound: true,
  soundVolume: 1,
  timerStyle: "default",
  enabledTray: true,
};
