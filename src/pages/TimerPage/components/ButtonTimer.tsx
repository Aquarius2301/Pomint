import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

interface ButtonTimerProps {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
  color?: string;
}

export function ButtonTimer({
  running,
  color,
  onStart,
  onPause,
  onSkip,
  onReset,
}: ButtonTimerProps) {
  const buttonStyle: React.CSSProperties = {
    width: "clamp(36px, 8vw, 56px)",
    height: "clamp(36px, 8vw, 56px)",
    fontSize: "clamp(16px, 4vw, 24px)",
    borderColor: color,
    color: color,
  };

  return (
    <Space size={8} style={{ marginTop: 16 }}>
      <Tooltip title={running ? "Pause (Space)" : "Start (Space)"}>
        <Button onClick={running ? onPause : onStart} style={buttonStyle}>
          {running ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        </Button>
      </Tooltip>
      <Tooltip title={"Skip"}>
        <Button onClick={onSkip} style={buttonStyle}>
          <StepForwardOutlined />
        </Button>
      </Tooltip>
      <Tooltip title={"Reset"}>
        <Button onClick={onReset} style={buttonStyle}>
          <ReloadOutlined />
        </Button>
      </Tooltip>
    </Space>
  );
}
