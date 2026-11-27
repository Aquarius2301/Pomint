import { useElementWidth } from "@/hooks";
import { secondsToMinutes } from "@/utils/time";
import { Flex } from "antd";
import "./MinuteBar.css";

interface MinuteBarProps {
  color: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export function MinuteBar({
  color,
  totalSeconds,
  remainingSeconds,
  isRunning,
}: MinuteBarProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const totalMinutes = secondsToMinutes(totalSeconds);

  const remainingMinutes = Math.min(
    totalMinutes,
    Math.max(0, Math.ceil(remainingSeconds / 60)),
  );

  const blockWidth = width ? width / totalMinutes : 0;

  return (
    <Flex
      ref={ref}
      style={{ width: "100%" }}
      gap={2}
      align="center"
      justify="start"
    >
      {Array.from({ length: remainingMinutes }, (_, index) => (
        <div
          className={isRunning && index === remainingMinutes - 1 ? "blink" : ""}
          style={{
            backgroundColor: color,
            width: blockWidth,
            height: 20,
          }}
          key={index}
        />
      ))}
    </Flex>
  );
}
