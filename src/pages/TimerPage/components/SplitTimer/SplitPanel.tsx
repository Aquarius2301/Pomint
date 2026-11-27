import { Flex } from "antd";
import Text from "antd/es/typography/Text";

interface SplitPanelProps {
  side: "work" | "break";
  label: string;
  time: string;
  color: string;
  active: boolean;
}

export function SplitPanel({
  side,
  label,
  time,
  color,
  active,
}: SplitPanelProps) {
  const isWork = side === "work";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: isWork
          ? "polygon(0 0, 100% 0, 0 100%)"
          : "polygon(100% 0, 100% 100%, 0 100%)",
      }}
    >
      <Flex
        vertical
        align={isWork ? "start" : "flex-end"}
        gap={2}
        style={{
          position: "absolute",
          top: isWork ? "8%" : undefined,
          left: isWork ? "8%" : undefined,
          right: isWork ? undefined : "8%",
          bottom: isWork ? undefined : "8%",
          filter: active ? "none" : "blur(2px)",
          opacity: active ? 1 : 0.4,
          pointerEvents: "none",
          transition: "filter 180ms ease, opacity 180ms ease",
          whiteSpace: "nowrap",
        }}
      >
        <Text
          strong
          style={{ color, fontSize: "clamp(0.9rem, 2.4vw, 1.5rem)" }}
        >
          {label}
        </Text>
        <Text
          style={{
            color,
            fontFamily: "monospace",
            fontSize: "clamp(2rem, min(6vw, 9vh), 4.5rem)",
            lineHeight: 1,
          }}
        >
          {time}
        </Text>
      </Flex>
    </div>
  );
}
