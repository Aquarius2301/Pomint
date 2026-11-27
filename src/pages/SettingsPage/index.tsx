import { Section } from "@/components";
import { App, Button, Flex, Tabs } from "antd";
import {
  NotificationTab,
  TimerTab,
  ResetSettingsModal,
  SystemTab,
  UpdateModal,
  type UpdateInfo,
} from "./components";
import { useSettingsStore } from "@/stores";
import { useRef, useState } from "react";
import { AppearanceTab } from "./components/AppearanceTab";
import { check, type Update } from "@tauri-apps/plugin-updater";
import { isTauri } from "@/api";
import { useTauriNotification } from "@/hooks";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function SettingsPage() {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [installingUpdate, setInstallingUpdate] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const pendingUpdateRef = useRef<Update | null>(null);
  const { message } = App.useApp();
  const { resetSettings } = useSettingsStore();
  const { showNotification } = useTauriNotification();

  const isPortable = import.meta.env.VITE_DISTRIBUTION === "portable";

  const handleTestNotification = () => {
    message.info(
      "Notification has been sent. Please check your system notification center.",
    );

    showNotification(
      "This is a test notification from Pomint. If you can see this, it means that the notification system is working properly.",
    );
  };

  const releasePendingUpdate = () => {
    const pendingUpdate = pendingUpdateRef.current;
    pendingUpdateRef.current = null;

    if (pendingUpdate) {
      void pendingUpdate.close().catch((error: unknown) => {
        console.error("[settings] failed to release update:", error);
      });
    }
  };

  const handleCheckForUpdate = async () => {
    if (isPortable) {
      message.warning("Auto-update is not available in the portable version.");
      return;
    }

    if (!isTauri()) {
      message.warning("Update checks are only available in the desktop app.");
      return;
    }

    setCheckingUpdate(true);
    setUpdateInfo(null);

    try {
      const update = await check();

      if (!update) {
        message.info("You are using the latest version.");
        return;
      }

      pendingUpdateRef.current = update;
      setUpdateInfo({
        version: update.version,
        currentVersion: update.currentVersion,
        date: update.date,
        notes: update.body,
      });
      setProgress(null);
      setUpdateModalOpen(true);
    } catch (error) {
      message.error(`Failed to check for updates`);
      console.error(
        `[settings] failed to check for updates:", ${getErrorMessage(error)}`,
      );
    } finally {
      setCheckingUpdate(false);
    }
  };

  const handleCloseUpdateModal = () => {
    if (installingUpdate) return;

    releasePendingUpdate();
    setUpdateModalOpen(false);
    setUpdateInfo(null);
    setProgress(null);
  };

  const handleAcceptUpdate = async () => {
    const update = pendingUpdateRef.current;
    if (!update || installingUpdate) return;

    setInstallingUpdate(true);
    setProgress(0);

    let downloaded = 0;
    let contentLength: number | undefined;

    try {
      await update.downloadAndInstall((event) => {
        if (event.event === "Started") {
          contentLength = event.data.contentLength;
          setProgress(0);
          return;
        }

        if (event.event === "Progress") {
          downloaded += event.data.chunkLength;
          setProgress(
            contentLength
              ? Math.min(100, Math.round((downloaded / contentLength) * 100))
              : null,
          );
          return;
        }

        setProgress(100);
      });

      pendingUpdateRef.current = null;
      setUpdateModalOpen(false);
      setUpdateInfo(null);
      setInstallingUpdate(false);
      message.success("Update installed. Please restart the app to finish.");
    } catch (error) {
      message.error(`Failed to install update: ${getErrorMessage(error)}`);
      setInstallingUpdate(false);
      setProgress(null);
    }
  };

  const handleResetSettings = () => {
    resetSettings();
    message.success("All settings have been reset to default values.");
    setResetModalOpen(false);
  };

  const tabs = [
    { key: "appearance", label: "Appearance", children: <AppearanceTab /> },
    { key: "timer", label: "Timer", children: <TimerTab /> },
    {
      key: "notification",
      label: "Notification",
      children: (
        <NotificationTab onClickTestNotification={handleTestNotification} />
      ),
    },
    { key: "system", label: "System", children: <SystemTab /> },
  ];

  const renderButton = () => {
    return (
      <Flex gap={8}>
        {!isPortable && (
          <Button
            onClick={handleCheckForUpdate}
            loading={checkingUpdate}
            disabled={installingUpdate}
          >
            Check for Update
          </Button>
        )}
        <Button
          danger
          type="primary"
          onClick={() => setResetModalOpen(true)}
          disabled={installingUpdate}
        >
          Reset settings
        </Button>
      </Flex>
    );
  };

  return (
    <Section
      title="Settings"
      description="Changes are saved automatically."
      rightNode={renderButton()}
    >
      <Tabs items={tabs} defaultActiveKey="appearance" />
      <ResetSettingsModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onReset={handleResetSettings}
      />
      <UpdateModal
        open={updateModalOpen}
        update={updateInfo}
        installing={installingUpdate}
        progress={progress}
        onClose={handleCloseUpdateModal}
        onAccept={handleAcceptUpdate}
      />
    </Section>
  );
}
