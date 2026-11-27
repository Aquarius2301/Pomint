import { useCallback, useEffect, useRef } from "react";
import { defaultWindowIcon, exit } from "@tauri-apps/api/app";
import { Menu, MenuItem } from "@tauri-apps/api/menu";
import { TrayIcon } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { isTauri } from "@/api";
import { APP_NAME } from "@/constants";
import { useSettingsStore } from "@/stores";
import { SystemTrayProps, TrayMenuItems } from "./types";
import { formatStatus, formatToggle, restoreWindow } from "./utils";

const TRAY_ID = "pomint-tray";

/**
 * A custom hook that manages the system tray icon and menu
 * for the Pomodoro timer application.
 * @param pomodoro - The current state of the Pomodoro timer, including mode, running status, remaining time, cycle count, and control functions.
 */
export const useSystemTray = (pomodoro: SystemTrayProps) => {
  const enabledTray = useSettingsStore((state) => state.settings.enabledTray);

  const enabledRef = useRef(enabledTray);
  const pomodoroRef = useRef(pomodoro);
  const trayRef = useRef<TrayIcon | null>(null);
  const menuRef = useRef<Menu | null>(null);
  const itemsRef = useRef<TrayMenuItems | null>(null);
  const lastStatusRef = useRef("");
  const lastToggleRef = useRef("");

  const updateMenuLabels = useCallback(async () => {
    const items = itemsRef.current;
    if (!items) return;

    const status = formatStatus(pomodoroRef.current);
    if (status !== lastStatusRef.current) {
      await items.status.setText(status);
      lastStatusRef.current = status;
    }

    const toggle = formatToggle(pomodoroRef.current.running);
    if (toggle !== lastToggleRef.current) {
      await items.toggle.setText(toggle);
      lastToggleRef.current = toggle;
    }
  }, []);

  useEffect(() => {
    enabledRef.current = enabledTray;
  }, [enabledTray]);

  useEffect(() => {
    pomodoroRef.current = pomodoro;
    void updateMenuLabels();
  }, [pomodoro, updateMenuLabels]);

  useEffect(() => {
    if (!isTauri()) return;

    const appWindow = getCurrentWindow();
    let cancelled = false;
    let unlistenClose: (() => void) | undefined;

    appWindow
      .onCloseRequested((event) => {
        if (!enabledRef.current) return;

        event.preventDefault();
        void appWindow.hide();
      })
      .then((unlisten) => {
        if (cancelled) {
          unlisten();
          return;
        }

        unlistenClose = unlisten;
      });

    return () => {
      cancelled = true;
      unlistenClose?.();
    };
  }, []);

  useEffect(() => {
    if (!isTauri()) return;

    let cancelled = false;

    const destroyTray = async () => {
      const tray = trayRef.current ?? (await TrayIcon.getById(TRAY_ID));
      if (tray) await tray.close();

      menuRef.current?.close();
      trayRef.current = null;
      menuRef.current = null;
      itemsRef.current = null;
      lastStatusRef.current = "";
      lastToggleRef.current = "";
    };

    const createTray = async () => {
      const existingTray = await TrayIcon.getById(TRAY_ID);
      if (existingTray) await existingTray.close();

      const statusItem = await MenuItem.new({
        id: "tray-status",
        text: formatStatus(pomodoroRef.current),
        enabled: false,
      });
      const toggleItem = await MenuItem.new({
        id: "tray-toggle",
        text: formatToggle(pomodoroRef.current.running),
        action: () => {
          const current = pomodoroRef.current;
          if (current.running) current.pause();
          else current.start();
        },
      });
      const skipItem = await MenuItem.new({
        id: "tray-skip",
        text: "Skip",
        action: () => pomodoroRef.current.skip(),
      });
      const resetItem = await MenuItem.new({
        id: "tray-reset",
        text: "Reset",
        action: () => pomodoroRef.current.reset(),
      });
      const exitItem = await MenuItem.new({
        id: "tray-exit",
        text: "Exit",
        action: () => void exit(0),
      });

      const menu = await Menu.new({
        items: [statusItem, toggleItem, skipItem, resetItem, exitItem],
      });
      const icon = (await defaultWindowIcon()) ?? undefined;

      const tray = await TrayIcon.new({
        id: TRAY_ID,
        icon,
        menu,
        tooltip: APP_NAME,
        showMenuOnLeftClick: false,
        action: (event) => {
          if (event.type === "DoubleClick" && event.button === "Left") {
            void restoreWindow();
          }
        },
      });

      if (cancelled) {
        await tray.close();
        await menu.close();
        return;
      }

      trayRef.current = tray;
      menuRef.current = menu;
      itemsRef.current = { status: statusItem, toggle: toggleItem };
      lastStatusRef.current = formatStatus(pomodoroRef.current);
      lastToggleRef.current = formatToggle(pomodoroRef.current.running);
    };

    if (enabledTray) void createTray();
    else void destroyTray();

    return () => {
      cancelled = true;
      void destroyTray();
    };
  }, [enabledTray]);
};
