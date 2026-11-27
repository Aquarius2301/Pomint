import { Flex, Image, Space, Tag, Typography } from "antd";

const { Title, Text } = Typography;

interface AboutHeaderProps {
  appName: string;
  version: string;
  isPortable: boolean;
  tagline: string;
}

export function AboutHeader({
  appName,
  version,
  isPortable,
  tagline,
}: AboutHeaderProps) {
  return (
    <Flex align="center" justify="space-between" gap={16} wrap>
      <Flex align="center" gap={16}>
        <Image
          src="/icon.png"
          alt={appName}
          width={56}
          height={56}
          preview={false}
        />
        <div>
          <Title level={2} style={{ margin: 0 }}>
            {appName}
          </Title>
          <Text type="secondary">{tagline}</Text>
        </div>
      </Flex>
      <Space size={8}>
        <Tag style={{ margin: 0 }}>{version}</Tag>
        <Tag
          color={isPortable ? "default" : "processing"}
          style={{ margin: 0 }}
        >
          {isPortable ? "Portable" : "Installed"}
        </Tag>
      </Space>
    </Flex>
  );
}
