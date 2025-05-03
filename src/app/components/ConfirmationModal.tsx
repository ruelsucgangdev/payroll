// ✅ FILE: components/ConfirmationModal.tsx

"use client";

import styles from "./ConfirmationModal.module.scss";
import { AlertCircle, Trash2, CheckCircle, FileEdit } from "lucide-react";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "delete" | "save" | "update" | "confirm";
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
  type = "confirm",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "delete":
        return <Trash2 size={24} color="#dc3545" />;
      case "save":
        return <CheckCircle size={24} color="#198754" />;
      case "update":
        return <FileEdit size={24} color="#0d6efd" />;
      default:
        return <AlertCircle size={24} color="#ffc107" />;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalIconTitle}>
          {getIcon()}
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmLabel}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
