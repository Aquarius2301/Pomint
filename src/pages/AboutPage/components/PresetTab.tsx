import { Table, Typography, type TableProps } from "antd";
import { Section } from "@/components";

const { Paragraph } = Typography;

interface Preset {
  key: string;
  name: string;
  focus: number;
  shortBreak: number;
  longBreak: number;
  /** Number of focus sessions before a long break. */
  sessions: number;
  bestFor: string;
}

const PRESETS: Preset[] = [
  {
    key: "short",
    name: "Short Pomodoro",
    focus: 15,
    shortBreak: 3,
    longBreak: 10,
    sessions: 5,
    bestFor: "Quick tasks, limited time, or when you get distracted easily",
  },
  {
    key: "classic",
    name: "Classic Pomodoro",
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    sessions: 4,
    bestFor: "General tasks, studying, reading",
  },
  {
    key: "extended",
    name: "Extended Focus",
    focus: 50,
    shortBreak: 10,
    longBreak: 20,
    sessions: 3,
    bestFor: "Writing, coding, design",
  },
  {
    key: "deep",
    name: "Deep Work",
    focus: 90,
    shortBreak: 15,
    longBreak: 30,
    sessions: 2,
    bestFor: "Complex work that needs deep, uninterrupted focus",
  },
];

const formatMinutes = (value: number): string => `${value} min`;

const PRESET_COLUMNS: TableProps<Preset>["columns"] = [
  { title: "Preset", dataIndex: "name", key: "name" },
  {
    title: "Focus",
    dataIndex: "focus",
    key: "focus",
    align: "right",
    render: formatMinutes,
  },
  {
    title: "Short break",
    dataIndex: "shortBreak",
    key: "shortBreak",
    align: "right",
    render: formatMinutes,
  },
  {
    title: "Long break",
    dataIndex: "longBreak",
    key: "longBreak",
    align: "right",
    render: formatMinutes,
  },
  { title: "Sessions", dataIndex: "sessions", key: "sessions", align: "right" },
  { title: "Best for", dataIndex: "bestFor", key: "bestFor" },
];

export function PresetTab() {
  return (
    <Section title="Recommended timer presets">
      <Paragraph type="secondary">
        Not sure which durations to pick? Start from one of these popular
        configurations. “Sessions” is the number of focus sessions before a long
        break.
      </Paragraph>
      <Table<Preset>
        size="small"
        columns={PRESET_COLUMNS}
        dataSource={PRESETS}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
        Treat them as starting points and adjust until they feel right.
      </Paragraph>
    </Section>
  );
}
