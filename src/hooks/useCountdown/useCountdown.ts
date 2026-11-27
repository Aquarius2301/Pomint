import { useCallback, useEffect, useRef, useState } from "react";
import { CountdownOptions, CountdownReturn } from "./types";

const TICK_INTERVAL_MS = 200;

const normalize = (value: number): number => Math.max(0, Math.ceil(value));

const isDev = import.meta.env.DEV;

/**
 * A custom hook to manage a countdown timer.
 * @param initialTime - The initial time in seconds for the countdown.
 * @param options - Optional configuration for the countdown, including speed.
 */
export const useCountdown = (
  initialTime: number,
  options: CountdownOptions = { speed: isDev ? 10 : 1 },
): CountdownReturn => {
  const speed = options.speed && options.speed > 0 ? options.speed : 1;
  const [seconds, setSeconds] = useState<number>(() => normalize(initialTime));
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const initialTimeRef = useRef<number>(initialTime);
  const secondsRef = useRef<number>(normalize(initialTime));
  const endTimeRef = useRef<number | null>(null);

  const speedRef = useRef<number>(speed);

  initialTimeRef.current = initialTime;
  speedRef.current = speed;

  // Real timestamp (ms) at which `secs` countdown-seconds will have elapsed.
  const computeEndTime = (secs: number): number =>
    Date.now() + (secs * 1000) / speedRef.current;

  const getRemaining = (): number => {
    if (endTimeRef.current === null) return secondsRef.current;
    return normalize(
      ((endTimeRef.current - Date.now()) / 1000) * speedRef.current,
    );
  };

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const remaining = getRemaining();
      secondsRef.current = remaining;
      setSeconds(remaining);

      if (remaining === 0) {
        endTimeRef.current = null;
        setIsRunning(false);
      }
    }, TICK_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isRunning]);

  const start = useCallback((): void => {
    if (isRunning || secondsRef.current <= 0) return;
    endTimeRef.current = computeEndTime(secondsRef.current);
    setIsRunning(true);
  }, [isRunning]);

  const pause = useCallback((): void => {
    if (!isRunning) return;
    const remaining = getRemaining();
    secondsRef.current = remaining;
    endTimeRef.current = null;
    setSeconds(remaining);
    setIsRunning(false);
  }, [isRunning]);

  const reset = useCallback(
    (newTime?: number, startNow: boolean = false): void => {
      const time = normalize(newTime ?? initialTimeRef.current);
      secondsRef.current = time;
      setSeconds(time);

      if (startNow && time > 0) {
        endTimeRef.current = computeEndTime(time);
        setIsRunning(true);
      } else {
        endTimeRef.current = null;
        setIsRunning(false);
      }
    },
    [],
  );

  return { seconds, isRunning, start, pause, reset };
};
