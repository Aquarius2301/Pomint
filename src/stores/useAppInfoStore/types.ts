export interface AppInfo {
  /**
   * The name of the application.
   * The name gets fetched from the tauri.conf.json file, and it is used to display the application name in the UI.
   */
  appName: string;

  /**
   * The version of the application.
   * The version gets fetched from the tauri.conf.json file, and it is used to display the application version in the UI.
   */
  version: string;
}

export interface AppInfoStore {
  info: AppInfo;
  setAppInfo: (info: AppInfo) => void;
}
