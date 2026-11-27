import { SECONDS_PER_MINUTE } from "@/constants";

/**
 * Converts minutes to seconds.
 * @param minutes the number of minutes to convert
 * @returns the equivalent number of seconds
 * @example
 * ```ts
 * const seconds = minutesToSeconds(5); // returns 300
 * ```
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * SECONDS_PER_MINUTE;
}

/**
 *  Converts seconds to minutes.
 * @param seconds  the number of seconds to convert
 * @returns the equivalent number of minutes
 * @example
 * ```ts
 * const minutes = secondsToMinutes(300); // returns 5
 * ```
 */
export function secondsToMinutes(seconds: number): number {
  return seconds / SECONDS_PER_MINUTE;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
