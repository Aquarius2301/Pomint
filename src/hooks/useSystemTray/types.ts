import { MenuItem } from "@tauri-apps/api/menu";
import { PomodoroReturn } from "../usePomodoro";

export interface TrayMenuItems {
  status: MenuItem;
  toggle: MenuItem;
}

export interface SystemTrayProps extends PomodoroReturn {}
