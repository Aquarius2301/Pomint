import { useSettingsStore } from "@/stores";
import { SlideOption } from "@/components";
import { Divider, Flex } from "antd";
import {
  MAX_LONG_BREAK_TIME_SECONDS,
  MAX_SESSIONS_BEFORE_LONG_BREAK,
  MAX_SHORT_BREAK_TIME_SECONDS,
  MAX_WORK_TIME_SECONDS,
  MIN_LONG_BREAK_TIME_SECONDS,
  MIN_SESSIONS_BEFORE_LONG_BREAK,
  MIN_SHORT_BREAK_TIME_SECONDS,
  MIN_WORK_TIME_SECONDS,
} from "@/constants";
import { minutesToSeconds, secondsToMinutes } from "@/utils/time";

export function DurationSection() {
  const { workTime, shortBreakTime, longBreakTime, sessionsBeforeLongBreak } =
    useSettingsStore((state) => state.settings);

  const { updateSettings } = useSettingsStore();
  return (
    <Flex vertical gap={16}>
      <Divider orientation="horizontal" plain titlePlacement="left">
        Duration
      </Divider>
      <SlideOption
        label="Work time"
        value={secondsToMinutes(workTime)}
        min={secondsToMinutes(MIN_WORK_TIME_SECONDS)}
        max={secondsToMinutes(MAX_WORK_TIME_SECONDS)}
        unit="min"
        onChange={(value) =>
          updateSettings({ workTime: minutesToSeconds(value) })
        }
      />
      <SlideOption
        label="Break time"
        value={secondsToMinutes(shortBreakTime)}
        min={secondsToMinutes(MIN_SHORT_BREAK_TIME_SECONDS)}
        max={secondsToMinutes(MAX_SHORT_BREAK_TIME_SECONDS)}
        unit="min"
        onChange={(value) =>
          updateSettings({ shortBreakTime: minutesToSeconds(value) })
        }
      />
      <SlideOption
        label="Long break time"
        value={secondsToMinutes(longBreakTime)}
        min={secondsToMinutes(MIN_LONG_BREAK_TIME_SECONDS)}
        max={secondsToMinutes(MAX_LONG_BREAK_TIME_SECONDS)}
        unit="min"
        onChange={(value) =>
          updateSettings({ longBreakTime: minutesToSeconds(value) })
        }
      />
      <SlideOption
        label="Sessions before long break"
        value={sessionsBeforeLongBreak}
        min={MIN_SESSIONS_BEFORE_LONG_BREAK}
        max={MAX_SESSIONS_BEFORE_LONG_BREAK}
        unit="sections"
        onChange={(value) => updateSettings({ sessionsBeforeLongBreak: value })}
      />
    </Flex>
  );
}
