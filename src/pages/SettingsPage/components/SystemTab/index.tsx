import { SwitchOption } from "@/components/SwitchOption";
import { useSettingsStore } from "@/stores";
import { Divider, Flex } from "antd";

export function SystemTab() {
  const { enabledTray } = useSettingsStore((state) => state.settings);

  const { updateSettings } = useSettingsStore();

  return (
    <Flex vertical gap={16}>
      <Divider orientation="horizontal" plain titlePlacement="left">
        System tray
      </Divider>
      <SwitchOption
        label="Minimize to system tray when closing"
        checked={enabledTray}
        onChange={(value) => updateSettings({ enabledTray: value })}
      />
    </Flex>
  );
}
