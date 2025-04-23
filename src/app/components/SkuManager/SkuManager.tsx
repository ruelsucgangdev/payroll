"use client";

import { useState } from "react";
import { CheckSquare, XSquare, Save, Edit3, Trash2 } from "lucide-react";
import styles from "./SkuManager.module.scss";

type SkuRecord = {
  id: number;
  sku: string;
  productName: string;
  currentQty: number;
  uom: string;
  price: number;
  checked: boolean;
  comment: string;
};

const sampleData: Omit<SkuRecord, "checked" | "comment">[] = [
  {
    id: 1,
    sku: "ELE-USB-PC-N",
    productName: "USB Cable",
    currentQty: 0,
    uom: "pcs",
    price: 150,
  },
  {
    id: 2,
    sku: "BEV-WTR-CASE-N",
    productName: "Water Bottle",
    currentQty: 0,
    uom: "case",
    price: 1200,
  },
  {
    id: 3,
    sku: "ELE-USB-PK-N",
    productName: "USB Cable Pack",
    currentQty: 0,
    uom: "pack",
    price: 700,
  },
];

export default function SkuManager() {
  const [records, setRecords] = useState<SkuRecord[]>(
    sampleData.map((r) => ({ ...r, checked: false, comment: "" }))
  );

  const toggleCheck = (id: number) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };

  const handleComment = (id: number, value: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, comment: value } : r))
    );
  };

  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => console.log("Delete", id);

  const handleSelectAll = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, checked: true })));
  };

  const handleDeselectAll = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, checked: false })));
  };

  const handleSaveBatch = () => {
    const selected = records.filter((r) => r.checked);
    if (selected.length === 0) return;
    const confirmed = window.confirm(
      "Do you want to hide the selected SKUs? They will be removed from the list."
    );
    if (confirmed) {
      setRecords((prev) => prev.filter((r) => !r.checked));
    }
  };

  const allChecked = records.every((r) => r.checked);
  const anyChecked = records.some((r) => r.checked);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1>SKU Management</h1>
          <p className={styles.pageSubtitle}>
            Manage and hide discontinued SKUs
          </p>
        </div>
        <div className={styles.headerButtons}>
          <button
            onClick={handleSelectAll}
            className={styles.batchButton}
            disabled={allChecked}
          >
            <CheckSquare size={16} /> Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className={styles.batchButton}
            disabled={!anyChecked}
          >
            <XSquare size={16} /> Deselect All
          </button>
          <button
            onClick={handleSaveBatch}
            className={`${styles.batchButton} ${styles.saveButton}`}
            disabled={!anyChecked}
          >
            <Save size={16} /> Save Selected
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => {
                  const all = e.target.checked;
                  setRecords((prev) =>
                    prev.map((r) => ({ ...r, checked: all }))
                  );
                }}
              />
            </th>
            <th>SKU</th>
            <th>Product</th>
            <th>Qty</th>
            <th>UoM</th>
            <th>Price</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className={styles.row}>
              <td className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={r.checked}
                  onChange={() => toggleCheck(r.id)}
                />
              </td>
              <td>{r.sku}</td>
              <td>{r.productName}</td>
              <td className={styles.numeric}>{r.currentQty}</td>
              <td>{r.uom}</td>
              <td className={styles.numeric}>{r.price.toFixed(2)}</td>
              <td>
                <input
                  type="text"
                  value={r.comment}
                  onChange={(e) => handleComment(r.id, e.target.value)}
                  className={styles.commentInput}
                  placeholder="Enter comment"
                />
              </td>
              <td className={styles.actionCell}>
                <button
                  onClick={() => handleEdit(r.id)}
                  className={styles.iconBtn}
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className={styles.iconBtn}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "1rem" }}>
                Walang records.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
