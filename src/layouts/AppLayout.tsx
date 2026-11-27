import { useState } from "react";
import type { ReactNode } from "react";
import { Button, Card, Image, Layout, Menu, Space, Tooltip, theme } from "antd";
import type { MenuProps } from "antd";
import {
  ClockCircleOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useAppInfoStore, useThemeStore } from "@/stores";
import Text from "antd/es/typography/Text";
import { PageKey } from "@/routes";

const { Sider, Content } = Layout;

const HEADER_HEIGHT = 64;
const SIDER_WIDTH = 150;
const COLLAPSED_WIDTH = 50;

const menuItems: MenuProps["items"] = [
  { key: "timer", icon: <ClockCircleOutlined />, label: "Timer" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "about", icon: <InfoCircleOutlined />, label: "About" },
  { key: "changelog", icon: <FileTextOutlined />, label: "Changelog" },
];

interface AppLayoutProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
  children?: ReactNode;
}

export function AppLayout({
  activePage,
  onNavigate,
  children,
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const { displayMode, changeMode } = useThemeStore();
  const { appName, version } = useAppInfoStore((state) => state.info);
  const { token } = theme.useToken();
  const isDark = displayMode === "dark";

  return (
    <Layout style={{ height: "100vh", background: token.colorBgLayout }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={SIDER_WIDTH}
        collapsedWidth={COLLAPSED_WIDTH}
        theme="light"
        style={{
          height: "100vh",
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
        styles={{ body: { display: "flex", flexDirection: "column" } }}
      >
        <div
          style={{
            height: HEADER_HEIGHT,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: collapsed ? "0 12px" : "0 16px",
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            overflow: "hidden",
          }}
        >
          <Image
            aria-disabled
            src="/icon.png"
            alt={appName}
            preview={false}
            width={44}
            height={44}
            style={{ objectFit: "contain" }}
          />
          {!collapsed && (
            <Space vertical size={0}>
              <Text strong>{appName}</Text>
              <Text strong type="secondary" style={{ fontSize: 12 }}>
                {version}
              </Text>
            </Space>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activePage]}
          items={menuItems}
          onClick={({ key }) => onNavigate(key as PageKey)}
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            borderInlineEnd: "none",
            background: "transparent",
          }}
        />

        <div
          style={{
            flexShrink: 0,
            padding: 12,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: collapsed ? "center" : "stretch",
          }}
        >
          <Tooltip
            title={
              collapsed
                ? isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : undefined
            }
            placement="right"
          >
            <Button
              type="text"
              icon={isDark ? <MoonOutlined /> : <SunOutlined />}
              onClick={changeMode}
              style={{ width: "100%", textAlign: "left" }}
            >
              {!collapsed && (isDark ? "Dark mode" : "Light mode")}
            </Button>
          </Tooltip>

          <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((value) => !value)}
              style={{ width: "100%" }}
            />
          </Tooltip>
        </div>
      </Sider>

      <Content
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          padding: 16,
        }}
      >
        <Card
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          styles={{
            body: { flex: 1, display: "flex", flexDirection: "column" },
          }}
        >
          {children}
        </Card>
      </Content>
    </Layout>
  );
}
