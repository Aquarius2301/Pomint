export interface CountdownOptions {
  /**
   * Speed multiplier, intended for testing only.
   * 1 = real time (default), 10 = 10x faster (1 real second = 10 countdown seconds).
   * Only for testing purposes, not for production use.
   */
  speed?: number;
}

/**
 * The return type of the `useCountdown` hook, providing the current countdown state and control functions.
 */
export interface CountdownReturn {
  /**
   * The current countdown time in seconds.
   */
  seconds: number;

  /**
   * Indicates whether the countdown is currently running.
   */
  isRunning: boolean;

  /**
   * Starts the countdown.
   * If the countdown is already running, this function has no effect.
   */
  start(): void;

  /**
   * Pauses the countdown.
   * If the countdown is already paused, this function has no effect.
   */
  pause(): void;

  /**
   *  Resets the countdown to a new time.
   * @param newTime the new countdown time in seconds.
   * If not provided, it resets to the initial time.
   * @param startNow if true, the countdown will start immediately after resetting.
   * If false or not provided, the countdown will not start automatically after resetting.
   */
  reset(newTime?: number, startNow?: boolean): void;
}
