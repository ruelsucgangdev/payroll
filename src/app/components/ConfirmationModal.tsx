"use client";

import { ReactNode } from "react";
import styles from "./ConfirmationModal.module.scss";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
