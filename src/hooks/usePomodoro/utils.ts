import { PomodoroMode } from "@/stores";

interface SessionMessageParams {
  mode: PomodoroMode;
  isLongBreakSession: boolean;
  autoStart: boolean;
}

/**
 * Generates a session message based on the current Pomodoro mode and settings.
 * This message is used for notifications to inform the user about the session status.
 * @returns A string message that describes the current session and any automatic transitions.
 */
export function getSessionMessage({
  mode,
  isLongBreakSession,
  autoStart,
}: SessionMessageParams) {
  switch (mode) {
    case "work": {
      let message = isLongBreakSession
        ? "Excellent work! You've completed a full Pomodoro cycle. Time for a longer break!"
        : "Great work! You've completed your focus session. Take a moment to relax.";

      if (autoStart) {
        message += isLongBreakSession
          ? "\nLong break is starting automatically."
          : "\nShort break is starting automatically.";
      }

      return message;
    }

    case "shortBreak":
    case "longBreak": {
      let message = "Hope you feel refreshed. It's time to get back to work!";

      if (autoStart) {
        message += "\nYour next focus session is starting automatically.";
      }

      return message;
    }
  }
}
