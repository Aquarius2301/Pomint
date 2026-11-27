import {
  AimOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Flex, Space, Steps, Tag, Typography } from "antd";
import { Section } from "@/components";

const { Paragraph, Text } = Typography;

const STEPS = [
  {
    icon: <AimOutlined />,
    title: "Choose a task",
    description: "Pick one thing you want to make progress on.",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Focus for 25 minutes",
    description:
      "Work with full attention. No emails, no social media, no multitasking.",
  },
  {
    icon: <CoffeeOutlined />,
    title: "Take a 5-minute break",
    description: "Stand up, stretch, drink some water, and rest your eyes.",
  },
  {
    icon: <RedoOutlined />,
    title: "Repeat",
    description:
      "Each completed focus session counts as one pomodoro. Go back to step 2.",
  },
  {
    icon: <CheckCircleOutlined />,
    title: "Long break after 4 pomodoros",
    description: "Rest for 15–30 minutes before starting a new round.",
  },
];

const TIPS = [
  "Protect your focus sessions from distractions.",
  "Actually rest during breaks: look away from the screen, move around, and breathe deeply.",
  "Experiment with durations until you find your rhythm.",
  "Consistency beats intensity. Small sessions add up.",
];

export function HowItWorksTab() {
  return (
    <Flex vertical gap={24}>
      <Section title="How the Pomodoro Technique works">
        <Paragraph>
          Developed by Francesco Cirillo in the late 1980s, the technique breaks
          work into intervals, traditionally <Text strong>25 minutes</Text>{" "}
          long, separated by short breaks. Each interval is called a
          <Text strong>pomodoro</Text>, after the tomato-shaped kitchen timer
          Cirillo used as a university student.
        </Paragraph>

        <Space size={[8, 8]} wrap style={{ marginBottom: 16 }}>
          <Tag icon={<ClockCircleOutlined />} color="blue">
            25 min focus
          </Tag>
          <Tag icon={<CoffeeOutlined />} color="green">
            5 min short break
          </Tag>
          <Tag icon={<RedoOutlined />} color="orange">
            15–30 min long break
          </Tag>
        </Space>

        <Steps
          style={{ marginBottom: 16 }}
          orientation="vertical"
          size="small"
          current={-1}
          items={STEPS.map((step) => ({
            title: step.title,
            description: step.description,
            icon: step.icon,
            status: "process",
          }))}
        />

        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          These durations are only defaults. Change them in Settings to match
          your own rhythm.
        </Paragraph>
      </Section>

      <Section
        title={
          <>
            <BulbOutlined /> Tips for better productivity
          </>
        }
      >
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          {TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <Text type="secondary">
          The goal is not to work longer, but to work more intentionally.
        </Text>
      </Section>
    </Flex>
  );
}
