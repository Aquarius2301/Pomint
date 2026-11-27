import { CustomModal } from "@/components";
import { Button, Empty, Flex, Progress, Space, Typography } from "antd";

const { Text } = Typography;

export interface UpdateInfo {
  version: string;
  currentVersion?: string;
  date?: string;
  notes?: string;
}

interface UpdateModalProps {
  open: boolean;
  update: UpdateInfo | null;
  installing: boolean;
  progress: number | null;
  onClose: () => void;
  onAccept: () => void;
}

function formatDate(value?: string) {
  if (!value) return null;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

function renderNotes(notes?: string) {
  if (!notes?.trim()) {
    return (
      <Empty
        description="No release notes provided."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  const lines = notes
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^([-*]|\d+\.)\s+/, ""))
    .filter(Boolean);

  if (lines.length === 0) {
    return <Text>{notes}</Text>;
  }

  return (
    <ul style={{ margin: 0, paddingLeft: 22 }}>
      {lines.map((line, index) => (
        <li key={`${index}-${line}`} style={{ marginBottom: 6 }}>
          {line}
        </li>
      ))}
    </ul>
  );
}

export function UpdateModal({
  open,
  update,
  installing,
  progress,
  onClose,
  onAccept,
}: UpdateModalProps) {
  const date = formatDate(update?.date);

  const renderButtons = () => {
    return (
      <>
        <Button onClick={onClose} disabled={installing}>
          Cancel
        </Button>
        <Button
          onClick={onAccept}
          type="primary"
          loading={installing}
          disabled={!update}
        >
          Accept &amp; Update
        </Button>
      </>
    );
  };

  return (
    <CustomModal open={open} title="Update Available" buttons={renderButtons()}>
      <Flex vertical gap={12}>
        <Space size={[8, 8]} wrap>
          <Text strong>v{update?.version}</Text>
          {update?.currentVersion && (
            <Text type="secondary">from v{update.currentVersion}</Text>
          )}
          {date && <Text type="secondary">{date}</Text>}
        </Space>

        <Text strong>What&apos;s new</Text>

        <div style={{ maxHeight: 280, overflowY: "auto" }}>
          {renderNotes(update?.notes)}
        </div>

        {installing && (
          <Flex vertical gap={4}>
            <Text type="secondary">Downloading and installing update...</Text>
            <Progress
              percent={progress ?? 0}
              status="active"
              showInfo={progress !== null}
            />
          </Flex>
        )}
      </Flex>
    </CustomModal>
  );
}
