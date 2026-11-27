/**
 * DisplayMode represents the two possible display modes for the application: dark mode and light mode.
 */
export type DisplayMode = "dark" | "light";

export interface ThemeStore {
  /**
   * Whether the application is in dark mode or light mode.
   */
  displayMode: DisplayMode;

  /**
   * Toggles the theme of the application between dark and light mode.
   * This function updates the `displayMode` state in the store.
   */
  changeMode: () => void;
}
