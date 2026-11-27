import { SwitchOption } from "@/components/SwitchOption";
import { useSettingsStore } from "@/stores";
import { Divider, Flex } from "antd";

export function AutomationSection() {
  const { autoStartWork, autoStartBreak } = useSettingsStore(
    (state) => state.settings,
  );

  const { updateSettings } = useSettingsStore();

  return (
    <Flex vertical gap={16}>
      <Divider orientation="horizontal" plain titlePlacement="left">
        Automation
      </Divider>
      <SwitchOption
        label="Auto start work session"
        checked={autoStartWork}
        onChange={(value) => updateSettings({ autoStartWork: value })}
      />
      <SwitchOption
        label="Auto start break session"
        checked={autoStartBreak}
        onChange={(value) => updateSettings({ autoStartBreak: value })}
      />
    </Flex>
  );
}
