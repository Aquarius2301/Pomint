/**
 * TimerStyle represents the different visual styles available for the Pomodoro timer.
 */
export type TimerStyle = "default" | "digital" | "split";

export interface AppSettings {
  /**
   * The duration of the work session in seconds.
   */
  workTime: number;
  /**
   * The duration of the short break session in seconds.
   */
  shortBreakTime: number;
  /**
   * The duration of the long break session in seconds.
   */
  longBreakTime: number;
  /**
   * The number of work sessions before a long break is triggered.
   */
  sessionsBeforeLongBreak: number;
  /**
   * Indicates whether the next work session should start automatically after a break.
   */
  autoStartWork: boolean;
  /**
   * Indicates whether the next break session should start automatically after a work session.
   */
  autoStartBreak: boolean;
  /**
   * Indicates whether desktop notifications are enabled for session transitions.
   */
  enableNotifications: boolean;
  /**
   * Indicates whether sound alerts are enabled for session transitions.
   */
  enableSound: boolean;
  /**
   * The volume level for sound alerts, represented as a percentage (0-100).
   */
  soundVolume: number;
  /**
   * The visual style of the Pomodoro timer
   */
  timerStyle: TimerStyle;
  /**
   * Indicates whether the application should minimize to the system tray when closed.
   */
  enabledTray: boolean;
}

export interface SettingsStore {
  /**
   * The current app settings.
   */
  settings: AppSettings;

  /**
   * Updates the app settings in the store.
   * @param settings A partial object containing the new settings to be updated.
   * This function merges the provided settings with the existing settings in the store.
   * @example
   * const newSettings = { workTime: 1800, autoStartWork: true };
   * useSettingStore.getState().updateSettings(newSettings);
   * This will update the `workTime` and `autoStartWork` properties in the store while keeping the other properties unchanged.
   */
  updateSettings: (settings: Partial<AppSettings>) => void;

  /**
   * Resets the app settings to their default values.
   * This function replaces the current settings in the store with the default settings defined in `DEFAULT_SETTINGS`.
   */
  resetSettings: () => void;
}
