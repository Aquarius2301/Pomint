import { CustomModal } from "@/components";
import { Button } from "antd";

interface ResetSettingsModalProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function ResetSettingsModal({
  open,
  onClose,
  onReset,
}: ResetSettingsModalProps) {
  const renderButtons = () => {
    return (
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onReset} type="primary" danger>
          Reset
        </Button>
      </>
    );
  };

  return (
    <CustomModal open={open} title="Reset Settings" buttons={renderButtons()}>
      Are you sure you want to reset all settings? This action cannot be undone.
    </CustomModal>
  );
}
