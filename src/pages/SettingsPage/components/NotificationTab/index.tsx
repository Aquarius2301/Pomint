import { SlideOption, SwitchOption } from "@/components";
import { useSettingsStore } from "@/stores";
import { playLongAlert } from "@/utils/sound";
import { Button, Divider, Flex } from "antd";

interface NotificationTabProps {
  onClickTestNotification: () => void;
}

export function NotificationTab({
  onClickTestNotification,
}: NotificationTabProps) {
  const { enableNotifications, enableSound, soundVolume } = useSettingsStore(
    (state) => state.settings,
  );

  const { updateSettings } = useSettingsStore();

  return (
    <Flex vertical gap={16}>
      <Divider orientation="horizontal" plain titlePlacement="left">
        Notification
      </Divider>
      <SwitchOption
        label="Notify when work/break sessions end"
        checked={enableNotifications}
        onChange={(value) => updateSettings({ enableNotifications: value })}
      />
      <Button onClick={onClickTestNotification}>Test notification</Button>

      <Divider orientation="horizontal" plain titlePlacement="left">
        Sound
      </Divider>

      <SwitchOption
        label="Alarm when work/break sessions end"
        checked={enableSound}
        onChange={(value) => updateSettings({ enableSound: value })}
      />

      <SlideOption
        disabled={!enableSound}
        label="Alarm volume"
        min={1}
        max={100}
        value={Math.round(soundVolume * 100)} // Use Math.round to ensure the value is an integer. If not, value will be a real number
        unit="%"
        onChange={(value) => {
          updateSettings({ soundVolume: value / 100 });
        }}
        onChangeComplete={(finalValue) => {
          playLongAlert(finalValue / 100);
        }}
      />
    </Flex>
  );
}
