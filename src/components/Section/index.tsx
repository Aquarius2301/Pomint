import { Flex, Typography } from "antd";
import { type ReactNode } from "react";

const { Text, Title } = Typography;

export interface SectionProps {
  title: ReactNode;
  description?: ReactNode;
  rightNode?: ReactNode;
  children: ReactNode;
}

export function Section({
  title,
  description,
  rightNode,
  children,
}: SectionProps) {
  return (
    <div>
      <Flex justify="space-between" align="center">
        <div>
          <Title level={3} style={{ margin: "0 0 8px" }}>
            {title}
          </Title>
          {description && <Text type="secondary">{description}</Text>}
        </div>
        <div>{rightNode}</div>
      </Flex>
      {children}
    </div>
  );
}
