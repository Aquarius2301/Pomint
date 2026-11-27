import { Divider, Empty, Space, Timeline, Typography } from "antd";
import { useAppInfoStore } from "@/stores";
import { Section } from "@/components";
import { releases } from "./release";
const { Text } = Typography;

const noteGroups = [
  { key: "added", label: "Added" },
  { key: "changed", label: "Changed" },
  { key: "fixed", label: "Fixed" },
  { key: "deleted", label: "Deleted" },
] as const;

export function ChangelogPage() {
  const { appName } = useAppInfoStore((state) => state.info);

  return (
    <Section
      title="Changelog"
      description={`A history of what has changed in ${appName}.`}
    >
      <Divider />

      {releases.length === 0 ? (
        <Empty description="No release notes yet." />
      ) : (
        <Timeline
          items={releases.map((release, index) => ({
            key: release.version,
            color: index === 0 ? "blue" : "gray",
            children: (
              <div>
                <Space size={[8, 8]} wrap>
                  <Text strong>{release.version}</Text>
                  <Text type="secondary">{release.date}</Text>
                </Space>

                {noteGroups.map(({ key, label }) => {
                  const items = release[key];
                  if (!items?.length) {
                    return null;
                  }
                  return (
                    <div key={key} style={{ marginTop: 12 }}>
                      <Text strong>{label}</Text>
                      <ul style={{ margin: "4px 0 0", paddingLeft: 22 }}>
                        {items.map((item) => (
                          <li key={item} style={{ marginBottom: 4 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ),
          }))}
        />
      )}
    </Section>
  );
}
