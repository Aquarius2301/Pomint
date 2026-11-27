import { useEffect } from "react";
import { ConfigProvider, App as AntdApp, theme as AntdTheme } from "antd";
import { useAppInfoStore, useThemeStore } from "./stores";
import { AppRoutes } from "./routes";
import { getAppInfo, installTauriBridge } from "./api";

export function App() {
  const { displayMode } = useThemeStore();
  const { setAppInfo } = useAppInfoStore();

  installTauriBridge();

  useEffect(() => {
    const fetchAppInfo = async () => {
      try {
        const info = await getAppInfo();

        setAppInfo(info);
      } catch (error) {
        console.error("Failed to fetch app info", error);
      }
    };

    fetchAppInfo();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = displayMode;
    document.documentElement.style.colorScheme = displayMode;
  }, [displayMode]);

  const isDark = displayMode === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? AntdTheme.darkAlgorithm
          : AntdTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <AppRoutes />
      </AntdApp>
    </ConfigProvider>
  );
}
