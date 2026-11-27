import { AppInfo } from "@/stores";
import { APP_NAME, VERSION } from "./common";

export const DEFAULT_APP_INFO: AppInfo = {
  appName: APP_NAME,
  version: "v" + VERSION,
};
