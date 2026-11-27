import { PomodoroMode, usePomodoroStore, useSettingsStore } from "@/stores";
import { useCountdown } from "../useCountdown";
import { useTauriNotification } from "../useTauriNotification";
import { useEffect } from "react";
import { playLongAlert } from "@/utils/sound";
import { getSessionMessage } from "./utils";
import { PomodoroReturn } from "./types";

/**
 * A custom hook that manages the Pomodoro timer state and behavior.
 */
export const usePomodoro = (): PomodoroReturn => {
  const settings = useSettingsStore((state) => state.settings);
  const setPomodoro = usePomodoroStore((state) => state.setPomodoro);

  const { seconds, isRunning, start, reset, pause } = useCountdown(
    usePomodoroStore.getState().pomodoro.seconds,
  );

  // Get the current Pomodoro mode and cycle count from the store
  // use...Store.getState() cannot re-render when the store is updated.
  const mode = usePomodoroStore((state) => state.pomodoro.mode);
  const cycleCount = usePomodoroStore((state) => state.pomodoro.sessionsCycle);

  const { showNotification } = useTauriNotification();

  useEffect(() => {
    if (
      seconds > 0 &&
      seconds != usePomodoroStore.getState().pomodoro.seconds
    ) {
      setPomodoro({
        seconds: seconds,
      });
    }

    if (seconds <= 0 && !isRunning) {
      const { autoStart, currentMode, nextTimeMode, isLongBreakSession } =
        moveToNextMode();

      handleNotification(currentMode, isLongBreakSession, autoStart);
      handleAlarm();

      reset(nextTimeMode, autoStart);
    }
  }, [seconds, isRunning]);

  const handleNotification = (
    mode: PomodoroMode,
    isLongBreakSession: boolean,
    autoStart: boolean,
  ) => {
    if (!settings.enableNotifications) return;

    const message = getSessionMessage({
      mode,
      isLongBreakSession,
      autoStart,
    });

    showNotification(message);
  };

  const handleAlarm = () => {
    if (!settings.enableSound) return;

    playLongAlert(settings.soundVolume);
  };

  const handleStart = () => {
    if (isRunning) return;

    const { mode, sessionsCycle } = usePomodoroStore.getState().pomodoro;

    if (mode == "work" && sessionsCycle == 0) {
      setPomodoro({
        sessionsCycle: 1,
      });
    }

    start();
  };

  const handleReset = () => {
    setPomodoro({
      sessionsCycle: 0,
      mode: "work",
      seconds: settings.workTime,
    });

    reset(settings.workTime);
  };

  const handleSkip = () => {
    const { mode, sessionsCycle } = usePomodoroStore.getState().pomodoro;

    // If the current mode is "work" and the session cycle count is 0,
    // increment the session cycle count to 1 before moving to the next mode.
    // If not incremented, the next mode will be "short break" with cycle count is 0
    if (mode == "work" && sessionsCycle == 0) {
      setPomodoro({
        sessionsCycle: 1,
      });
    }

    const { nextTimeMode } = moveToNextMode();

    reset(nextTimeMode);
  };

  const moveToNextMode = (): {
    currentMode: PomodoroMode;
    isLongBreakSession: boolean;
    nextTimeMode: number;
    autoStart: boolean;
  } => {
    const { sessionsCycle, mode } = usePomodoroStore.getState().pomodoro;

    const isLongBreakSession =
      sessionsCycle >= settings.sessionsBeforeLongBreak;

    const isWork = mode === "work";

    if (isWork) {
      const breakTime = isLongBreakSession
        ? settings.longBreakTime
        : settings.shortBreakTime;
      setPomodoro({
        mode: isLongBreakSession ? "longBreak" : "shortBreak",
        seconds: breakTime,
      });

      return {
        currentMode: "work",
        isLongBreakSession,
        nextTimeMode: breakTime,
        autoStart: settings.autoStartBreak,
      };
    }

    setPomodoro({
      mode: "work",
      seconds: settings.workTime,
      sessionsCycle: isLongBreakSession ? 1 : sessionsCycle + 1,
    });

    return {
      currentMode: mode,
      isLongBreakSession,
      nextTimeMode: settings.workTime,
      autoStart: settings.autoStartWork,
    };
  };

  return {
    running: isRunning,
    remaining: seconds,
    mode,
    cycleCount,
    cycleTarget: settings.sessionsBeforeLongBreak,
    timerStyle: settings.timerStyle,
    start: handleStart,
    reset: handleReset,
    skip: handleSkip,
    pause,
  };
};
