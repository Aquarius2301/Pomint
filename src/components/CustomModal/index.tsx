import { Modal } from "antd";
import { ReactNode } from "react";

export interface CustomModalProps {
  open: boolean;
  title?: ReactNode;
  children?: ReactNode;
  buttons?: ReactNode;
}

export function CustomModal({
  open,
  title,
  children,
  buttons,
}: CustomModalProps) {
  return (
    <Modal
      title={title}
      open={open}
      destroyOnHidden
      footer={buttons}
      closeIcon={null}
      centered
    >
      {children}
    </Modal>
  );
}
