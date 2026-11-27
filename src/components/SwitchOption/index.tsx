import { Space, Switch, Typography } from "antd";

const { Text } = Typography;

export interface SwitchOptionProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function SwitchOption({ label, checked, onChange }: SwitchOptionProps) {
  return (
    <Space align="center">
      <Text>{label}: </Text>
      <Switch checked={checked} onChange={(value) => onChange(value)} />
    </Space>
  );
}
