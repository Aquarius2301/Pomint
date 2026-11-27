import { Card, theme } from "antd";
import Text from "antd/es/typography/Text";

interface TimerStyleItemProps {
  value: TimerStyle;
  label: string;
  image: string;
  selected: boolean;
  onChange: (timerStyle: TimerStyle) => void;
}
type TimerStyle = "default" | "digital" | "split";

export function TimerStyleItem({
  value,
  label,
  image,
  selected,
  onChange,
}: TimerStyleItemProps) {
  const { token } = theme.useToken();

  return (
    <Card
      hoverable
      onClick={() => onChange(value)}
      style={{
        borderColor: selected ? token.colorPrimary : undefined,
        color: selected ? token.colorPrimary : token.colorText,
      }}
      styles={{ body: { padding: "8px" } }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <Text
        strong
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "8px",
          color: selected ? token.colorPrimary : token.colorText,
          borderRadius: "4px",
        }}
      >
        {label}
      </Text>
    </Card>
  );
}
