import { Flex } from "antd";
import { MODE_LABELS, TIMER_COLORS } from "../constants";
import type { PomodoroTimerProps } from "../types";
import Text from "antd/es/typography/Text";
import { formatTime } from "@/utils/time";
import { ButtonTimer } from "../ButtonTimer";

export function DefaultTimer({
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
  const colors = running ? TIMER_COLORS[mode] : TIMER_COLORS.stop;

  return (
    <Flex vertical align="center" justify="center" style={{ height: "100%" }}>
      <Text
        strong
        style={{
          color: colors.secondary,
          fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
        }}
      >
        {MODE_LABELS[mode]}
      </Text>

      <Text
        strong
        style={{
          color: colors.primary,
          fontSize: "clamp(0.9rem, 1.6vw, 1.5rem)",
        }}
      >
        Session {Math.min(cycleCount, cycleTarget)} / {cycleTarget}
      </Text>
      <Text
        style={{
          color: colors.primary,
          fontSize: "clamp(4rem, min(20vw, 32vh), 16rem)",
          fontFamily: "monospace",
        }}
      >
        {formatTime(remaining)}
      </Text>
      <ButtonTimer
        running={running}
        onStart={onStart}
        onPause={onPause}
        onSkip={onSkip}
        onReset={onReset}
        color={colors.primary}
      />
    </Flex>
  );
}
