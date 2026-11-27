import { DEFAULT_APP_INFO } from "@/constants";
import { AppInfo } from "@/stores";
import { getName, getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";

interface NotificationPayload {
  title: string;
  body: string;
}

/**
 * Checks if the application is running in a Tauri environment.
 * @returns `true` if the application is running in Tauri, otherwise `false`.
 */
export function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

/**
 * Installs the Tauri bridge for communication between the frontend and the Tauri backend.
 * This function should be called once during the application's initialization phase.
 */
export function installTauriBridge() {
  window.api = {
    async notify(payload: NotificationPayload) {
      if (!isTauri()) return;
      await invoke("notify", { payload });
    },
  };
}

/**
 * Get the application information such as name and version from the Tauri backend.
 * If the application is not running in a Tauri environment, it returns the `DEFAULT_APP_INFO`.
 */
export async function getAppInfo(): Promise<AppInfo> {
  if (!isTauri()) return DEFAULT_APP_INFO;

  const [appName, version] = await Promise.all([getName(), getVersion()]);

  return { appName, version };
}
