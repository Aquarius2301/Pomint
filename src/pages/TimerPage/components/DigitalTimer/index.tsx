import { Flex, Space } from "antd";
import { MODE_LABELS, TIMER_COLORS } from "../constants";
import type { PomodoroTimerProps } from "../types";
import { useSettingsStore } from "@/stores";
import Text from "antd/es/typography/Text";
import { SessionDots } from "./SessionDots";
import { formatTime } from "@/utils/time";
import { MinuteBar } from "./MinuteBar";
import { ButtonTimer } from "../ButtonTimer";

export function DigitalTimer({
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
  const colors = running ? TIMER_COLORS[mode] : TIMER_COLORS.stop;
  const totalSeconds =
    mode === "work"
      ? settings.workTime
      : mode === "shortBreak"
        ? settings.shortBreakTime
        : settings.longBreakTime;

  return (
    <Flex
      vertical
      style={{ width: "100%" }}
      align="center"
      justify="center"
      gap={16}
    >
      <Flex style={{ width: "100%" }} align="center" justify="space-between">
        <Space vertical align="start" size={8}>
          <Text
            strong
            style={{
              color: colors.primary,
              fontFamily: "Orbitron",
              fontSize: "clamp(1rem, 3vw, 2rem)",
            }}
          >
            {MODE_LABELS[mode]}
          </Text>
          <SessionDots
            cycleCount={Math.min(cycleCount, cycleTarget)}
            cycleTarget={cycleTarget}
            color={colors.primary}
          />
          <ButtonTimer
            running={running}
            onStart={onStart}
            onPause={onPause}
            onSkip={onSkip}
            onReset={onReset}
            color={colors.primary}
          />
        </Space>
        <Text
          style={{
            color: colors.primary,
            fontFamily: "DSEG7",
            fontSize: "clamp(3.5rem, min(14vw, 26vh), 9rem)",
          }}
        >
          {formatTime(remaining)}
        </Text>
      </Flex>
      <MinuteBar
        isRunning={running}
        color={colors.primary}
        totalSeconds={totalSeconds}
        remainingSeconds={remaining}
      />
    </Flex>
  );
}
