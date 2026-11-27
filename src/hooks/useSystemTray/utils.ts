import { PomodoroMode } from "@/stores";
import { formatTime } from "@/utils/time";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { PomodoroReturn } from "../usePomodoro";

const MODE_LABELS: Record<PomodoroMode, string> = {
  work: "Working",
  shortBreak: "Short break",
  longBreak: "Long break",
};

export function formatStatus({
  remaining,
  mode,
  cycleCount,
  cycleTarget,
}: PomodoroReturn): string {
  const session = Math.min(cycleCount, cycleTarget);

  return `${formatTime(remaining)} - ${MODE_LABELS[mode]} - ${session}/${cycleTarget}`;
}

export function formatToggle(running: boolean): string {
  return running ? "Pause" : "Start";
}

export async function restoreWindow(): Promise<void> {
  const appWindow = getCurrentWindow();

  await appWindow.show();
  await appWindow.unminimize();
  await appWindow.setFocus();
}
