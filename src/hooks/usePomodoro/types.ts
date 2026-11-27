import { PomodoroMode, TimerStyle } from "@/stores";

/**
 * The return type of the `usePomodoro` hook, providing the current Pomodoro state and control functions.
 */
export interface PomodoroReturn {
  /**
   * Indicates the current mode of the Pomodoro timer, which can be "work", "shortBreak", or "longBreak".
   */
  mode: PomodoroMode;

  /**
   * Indicates whether the Pomodoro timer is currently running.
   */
  running: boolean;

  /**
   * The remaining time in seconds for the current Pomodoro session.
   * This value will decrease as the timer counts down.
   */
  remaining: number;

  /**
   * The number of completed Pomodoro cycles.
   * A cycle is considered complete when a work session is followed by a break session.
   * The cycle count will reset after reaching the cycle target.
   */
  cycleCount: number;

  /**
   * The target number of Pomodoro cycles to complete before a long break.
   */
  cycleTarget: number;

  /**
   * The style of the Pomodoro timer, which can be "default", "digital", or "split".
   */
  timerStyle: TimerStyle;

  /**
   * Starts the Pomodoro timer.
   */
  start: () => void;

  /**
   * Pauses the Pomodoro timer.
   */
  pause: () => void;

  /**
   * Skips the current Pomodoro session and moves to the next one.
   * The notification and alarm will not be triggered when skipping a session.
   */
  skip: () => void;

  /**
   * Reset the Pomodoro timer to its initial state.
   * The notification and alarm will not be triggered when resetting the timer.
   */
  reset: () => void;
}

export type PomodoroProps = PomodoroReturn;
