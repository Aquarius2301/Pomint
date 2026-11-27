import { Flex, Slider, Typography } from "antd";

const { Text } = Typography;

export interface SlideOptionProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}

export function SlideOption({
  label,
  value,
  min,
  max,
  unit,
  disabled,
  onChange,
  onChangeComplete,
}: SlideOptionProps) {
  return (
    <Flex vertical>
      <Text>
        {label}
        {": "}
        <Text type="secondary">
          {value} {unit}
        </Text>
      </Text>
      <Slider
        disabled={disabled}
        style={{ width: "100%" }}
        min={min}
        max={max}
        tooltip={{ formatter: (value) => `${value} ${unit ?? ""}` }}
        value={value}
        onChange={(value) => onChange(value)}
        onChangeComplete={(value) => onChangeComplete?.(value)}
        marks={{
          [min]: `${min}`,
          [max]: `${max}`,
        }}
      />
    </Flex>
  );
}
