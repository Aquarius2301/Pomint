import { useAppInfoStore } from "@/stores";

export interface TauriNotificationReturn {
  /**
   * Shows a notification using the Tauri API with the specified message body.
   * @param body - The message body of the notification to be displayed.
   */
  showNotification: (body: string) => void;
}

/**
 * A custom hook that provides a function to show notifications using the Tauri API.
 */
export const useTauriNotification = (): TauriNotificationReturn => {
  const { appName } = useAppInfoStore((state) => state.info);

  const showNotification = (body: string) => {
    window.api.notify({
      title: `${appName} Notification`,
      body,
    });
  };

  return {
    showNotification,
  };
};
