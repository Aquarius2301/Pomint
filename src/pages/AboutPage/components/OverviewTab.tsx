import {
  BellOutlined,
  BgColorsOutlined,
  FieldTimeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Alert, Col, Flex, Row, Typography, theme } from "antd";
import { ReactNode } from "react";
import { Section } from "@/components";

const { Paragraph, Text } = Typography;

interface OverviewTabProps {
  appName: string;
  isPortable: boolean;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <FieldTimeOutlined />,
    title: "Flexible timers",
    description: "Set your own focus and break lengths to fit your workflow.",
  },
  {
    icon: <BellOutlined />,
    title: "Notifications",
    description: "Get alerted when a session ends so you never lose track.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Auto start",
    description: "Roll into the next session automatically, without friction.",
  },
  {
    icon: <BgColorsOutlined />,
    title: "Themes & dark mode",
    description: "Pick a color scheme and switch between light and dark.",
  },
];

export function OverviewTab({ appName, isPortable }: OverviewTabProps) {
  const { token } = theme.useToken();

  return (
    <Flex vertical gap={24}>
      <Section title={`What is ${appName}?`}>
        <Paragraph>
          {appName} is a lightweight desktop timer that helps you focus, manage
          your time, and build better work habits. It is inspired by the{" "}
          <Text strong>Pomodoro Technique</Text>: short, focused sessions
          followed by short breaks, so you can concentrate without burning out.
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          Whether you are studying, working, or learning something new, it gives
          you a simple and flexible way to structure your time.
        </Paragraph>
      </Section>

      <Section title={"Basic features"}>
        <Row gutter={[16, 16]}>
          {FEATURES.map((feature) => (
            <Col xs={24} sm={12} key={feature.title}>
              <Flex gap={12} align="flex-start">
                <span
                  style={{
                    fontSize: 20,
                    color: token.colorPrimary,
                    lineHeight: 1.4,
                  }}
                >
                  {feature.icon}
                </span>
                <div>
                  <Text strong>{feature.title}</Text>
                  <br />
                  <Text type="secondary">{feature.description}</Text>
                </div>
              </Flex>
            </Col>
          ))}
        </Row>
      </Section>

      {isPortable && (
        <Alert
          type="info"
          showIcon
          title="You are using the portable version"
          description={`To receive updates and get the standard installation experience, download the installer from the ${appName} GitHub Releases page.`}
        />
      )}
    </Flex>
  );
}
