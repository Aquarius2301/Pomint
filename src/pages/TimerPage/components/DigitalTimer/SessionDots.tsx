import { Space } from "antd";

interface SessionDotsProps {
  cycleCount: number;
  cycleTarget: number;
  color: string;
}

export function SessionDots({
  cycleCount,
  cycleTarget,
  color,
}: SessionDotsProps) {
  return (
    <Space>
      {Array.from({ length: cycleTarget }, (_, index) => (
        <div
          key={index}
          style={{
            width: 10,
            height: 10,
            border: "1px solid " + color,
            borderRadius: "50%",
            backgroundColor: index < cycleCount ? color : "transparent",
          }}
        />
      ))}
    </Space>
  );
}
