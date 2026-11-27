import { Section } from "@/components";
import { GithubOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Typography } from "antd";

const { Paragraph, Text } = Typography;

interface DeveloperTabProps {
  appName: string;
  openRepository: () => void;
}

const TECHNOLOGIES = ["React", "TypeScript", "Tauri", "Rust"] as const;

export function DeveloperTab({ appName, openRepository }: DeveloperTabProps) {
  return (
    <Section title="About the developer">
      <Paragraph>
        {appName} is an independent project created by Khang Ta, built out of a
        passion for productivity and software development.
      </Paragraph>
      <Space size={[8, 8]} wrap style={{ marginBottom: 16 }}>
        <Text type="secondary">Built with</Text>
        {TECHNOLOGIES.map((technology) => (
          <Tag key={technology}>{technology}</Tag>
        ))}
      </Space>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<GithubOutlined />} onClick={openRepository}>
          View source on GitHub
        </Button>
      </div>
      <Text type="secondary">
        P.S. {appName} started as a small personal project to help me stay
        focused. I hope it makes your workdays a little better, too.
      </Text>
    </Section>
  );
}
