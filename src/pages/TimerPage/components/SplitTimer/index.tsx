import { Flex, theme } from "antd";
import Text from "antd/es/typography/Text";
import { useSettingsStore } from "@/stores";
import { MODE_LABELS, TIMER_COLORS } from "../constants";
import type { PomodoroTimerProps } from "../types";
import { formatTime } from "@/utils/time";
import { SplitPanel } from "./SplitPanel";
import { ButtonTimer } from "../ButtonTimer";

type BreakMode = "shortBreak" | "longBreak";

export function SplitTimer({
  mode,
  running,
  remaining,
  cycleCount,
  cycleTarget,
  onStart,
  onPause,
  onSkip,
  onReset,
}: PomodoroTimerProps) {
  const { settings } = useSettingsStore();
  const { token } = theme.useToken();

  const isWorkMode = mode === "work";
  const breakMode: BreakMode =
    mode === "shortBreak" || mode === "longBreak"
      ? mode
      : cycleCount >= cycleTarget
        ? "longBreak"
        : "shortBreak";

  const activeMode = isWorkMode ? "work" : breakMode;
  const workColors =
    running && isWorkMode ? TIMER_COLORS.work : TIMER_COLORS.stop;
  const breakColors =
    running && !isWorkMode ? TIMER_COLORS[breakMode] : TIMER_COLORS.stop;
  const centerColors = running ? TIMER_COLORS[activeMode] : TIMER_COLORS.stop;

  const fullBreakSeconds =
    breakMode === "shortBreak"
      ? settings.shortBreakTime
      : settings.longBreakTime;

  const workTime = formatTime(isWorkMode ? remaining : settings.workTime);
  const breakTime = formatTime(isWorkMode ? fullBreakSeconds : remaining);

  // const buttonStyle: React.CSSProperties = {
  //   width: 40,
  //   height: 40,
  //   fontSize: 18,
  //   borderColor: centerColors.primary,
  //   color: centerColors.primary,
  // };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        minHeight: 320,
        overflow: "hidden",
        background: token.colorBgContainer,
      }}
    >
      <SplitPanel
        side="work"
        label={MODE_LABELS.work}
        time={workTime}
        color={workColors.primary}
        active={isWorkMode}
      />
      <SplitPanel
        side="break"
        label={MODE_LABELS[breakMode]}
        time={breakTime}
        color={breakColors.primary}
        active={!isWorkMode}
      />

      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke={token.colorBorder}
          strokeWidth={2}
        />
      </svg>

      <Flex
        vertical
        align="center"
        gap={6}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
          padding: "8px 12px",
          borderRadius: 10,
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Text
          strong
          style={{
            color: centerColors.primary,
            fontSize: "clamp(0.75rem, 1.6vw, 1rem)",
            whiteSpace: "nowrap",
          }}
        >
          Session {Math.min(cycleCount, cycleTarget)} / {cycleTarget}
        </Text>
        <ButtonTimer
          running={running}
          onStart={onStart}
          onPause={onPause}
          onSkip={onSkip}
          onReset={onReset}
          color={centerColors.primary}
        />
      </Flex>
    </div>
  );
}
