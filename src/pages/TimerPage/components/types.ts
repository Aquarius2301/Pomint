export interface PomodoroTimerProps {
  mode: "work" | "shortBreak" | "longBreak";
  running: boolean;
  remaining: number;
  cycleCount: number;
  cycleTarget: number;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
}
