export interface ReleaseNote {
  version: string;
  date: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
  deleted?: string[];
}

export const releases: ReleaseNote[] = [
  {
    version: "0.1.0",
    date: "2026-11-27",
    added: [
      "Work, short break and long break sessions with Start/Pause, Skip and Reset controls.",
      "Three timer styles: Default, Digital and Split.",
      "Configurable session durations, long break interval and auto-start options.",
      "Settings and session progress are saved and restored after a restart.",
      "Desktop notifications with a separate alarm switch and volume control.",
      "Minimize to the system tray with status and controls in the tray menu.",
      "Light and dark themes.",
    ],
  },
];
