import { AppLayout } from "@/layouts";
import { TimerPage, AboutPage, ChangelogPage, SettingsPage } from "@/pages";
import { usePomodoro, useSystemTray, type PomodoroProps } from "@/hooks";
import { type ReactNode, useState } from "react";

export type PageKey = "timer" | "settings" | "about" | "changelog";

function renderPage(page: PageKey, pomodoro: PomodoroProps): ReactNode {
  switch (page) {
    case "timer":
      return <TimerPage {...pomodoro} />;
    case "about":
      return <AboutPage />;
    case "changelog":
      return <ChangelogPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return null;
  }
}

export function AppRoutes() {
  const [activePage, setActivePage] = useState<PageKey>("timer");
  const pomodoro = usePomodoro();

  useSystemTray(pomodoro);

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage(activePage, pomodoro)}
    </AppLayout>
  );
}
