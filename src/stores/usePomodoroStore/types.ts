/**
 * PomodoroMode represents the different modes of a Pomodoro timer.
 * - "work": The focus session where the user works on a task.
 * - "shortBreak": A short break session after a work session.
 * - "longBreak": A longer break session after several work sessions.
 */
export type PomodoroMode = "work" | "shortBreak" | "longBreak";

export interface PomodoroTimer {
  /**
   * The current mode of the Pomodoro timer.
   */
  mode: PomodoroMode;

  /**
   * The remaining time in seconds for the current Pomodoro session.
   */
  seconds: number;

  /**
   * The number of completed Pomodoro cycles (work sessions).
   * A cycle is considered complete after a work session followed by a break session.
   */
  sessionsCycle: number;
}

export interface PomodoroStore {
  pomodoro: PomodoroTimer;
  setPomodoro: (pomodoro: Partial<PomodoroTimer>) => void;
}
