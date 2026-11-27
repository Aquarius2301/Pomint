import { useAppInfoStore } from "@/stores";
import { isTauri } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Divider, Tabs, Typography } from "antd";
import type { TabsProps } from "antd";
import {
  AboutHeader,
  DeveloperTab,
  HowItWorksTab,
  OverviewTab,
  PresetTab,
} from "./components";
import { GITHUB_REPO_URL } from "@/constants";

const { Text } = Typography;

const TAGLINE = "Stay focused. Work better. Take a break.";

function openRepository(): void {
  if (!isTauri()) {
    window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
    return;
  }

  void openUrl(GITHUB_REPO_URL).catch((error: unknown) => {
    console.error("[about] failed to open repository link:", error);
  });
}

export function AboutPage() {
  const { appName, version } = useAppInfoStore((state) => state.info);

  const isPortable = import.meta.env.VITE_DISTRIBUTION === "portable";

  const tabItems: TabsProps["items"] = [
    {
      key: "overview",
      label: "Overview",
      children: <OverviewTab appName={appName} isPortable={isPortable} />,
    },
    { key: "how-it-works", label: "How it works", children: <HowItWorksTab /> },
    {
      key: "presets",
      label: "Presets",
      children: <PresetTab />,
    },

    {
      key: "developer",
      label: "Developer",
      children: (
        <DeveloperTab appName={appName} openRepository={openRepository} />
      ),
    },
  ];

  return (
    <>
      <AboutHeader
        appName={appName}
        version={version}
        isPortable={isPortable}
        tagline={TAGLINE}
      />

      <Divider />

      <Tabs defaultActiveKey="overview" items={tabItems} />

      <Divider />

      <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
        Made with care by Khang Ta
      </Text>
    </>
  );
}
