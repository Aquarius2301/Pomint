import defaultPreview from "@/assets/default.png";
import digitalPreview from "@/assets/digital.png";
import splitPreview from "@/assets/split.png";
import Text from "antd/es/typography/Text";
import { Flex } from "antd";
import { TimerStyleItem } from "./TimerStyleItem";
import { useSettingsStore } from "@/stores";

type TimerStyle = "default" | "digital" | "split";

const TIMER_OPTIONS: {
  value: TimerStyle;
  label: string;
  image: string;
}[] = [
  { value: "default", label: "Default", image: defaultPreview },
  { value: "digital", label: "Digital", image: digitalPreview },
  { value: "split", label: "Split", image: splitPreview },
];

export function AppearanceTab() {
  const { timerStyle } = useSettingsStore((state) => state.settings);
  const { updateSettings } = useSettingsStore();

  return (
    <div>
      <Text type="secondary">Choose the visual style of the timer.</Text>
      <Flex
        justify="center"
        align="center"
        gap={16}
        style={{ marginTop: "16px" }}
      >
        {TIMER_OPTIONS.map(({ value, label, image }) => {
          const selected = timerStyle === value;
          return (
            <TimerStyleItem
              key={value}
              value={value}
              label={label}
              image={image}
              selected={selected}
              onChange={() => updateSettings({ timerStyle: value })}
            />
          );
        })}
      </Flex>
    </div>
  );
}
