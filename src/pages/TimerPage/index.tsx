import { Flex } from "antd";
import { useEffect } from "react";
import {
  DefaultTimer,
  DigitalTimer,
  type PomodoroTimerProps,
  SplitTimer,
} from "./components";
import { type PomodoroProps } from "@/hooks";
import { playClick } from "@/utils/sound";
import { useSettingsStore } from "@/stores";

export function TimerPage(props: PomodoroProps) {
  const {
    mode,
    running,
    remaining,
    cycleCount,
    cycleTarget,
    timerStyle,
    start,
    pause,
    skip,
    reset,
  } = props;

  const { enableSound, soundVolume } = useSettingsStore(
    (state) => state.settings,
  );

  const handleClick = (onClick: () => void) => {
    playClick();

    onClick();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.closest("input, textarea, select, button, [role='button']")
      ) {
        return;
      }

      event.preventDefault();
      handleClick(running ? pause : start);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [running, start, pause, enableSound, soundVolume]);

  const renderTimer = () => {
    const props = {
      mode,
      running,
      remaining,
      cycleCount,
      cycleTarget,
      onStart: () => handleClick(start),
      onPause: () => handleClick(pause),
      onSkip: () => handleClick(skip),
      onReset: () => handleClick(reset),
    } as PomodoroTimerProps;

    switch (timerStyle) {
      case "default":
        return <DefaultTimer {...props} />;
      case "digital":
        return <DigitalTimer {...props} />;
      case "split":
        return <SplitTimer {...props} />;
      default:
        return null;
    }
  };

  return (
    <Flex
      justify="center"
      align={timerStyle === "split" ? "stretch" : "center"}
      flex={1}
      style={{
        minHeight: "100%",
        height: "100%",
        width: "100%",
        position: timerStyle === "split" ? "relative" : undefined,
      }}
    >
      {renderTimer()}
    </Flex>
  );
}
