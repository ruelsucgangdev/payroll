// ✅ PhysicalCount.tsx (Updated to match ReturnItem design)
"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, Send } from "lucide-react";
import styles from "./PhysicalCount.module.scss";

type CountRecord = {
  id: number;
  sku: string;
  itemName: string;
  recordedQty: number;
  countedQty: number;
  discrepancy: number;
  dateCounted: string;
  warehouse: string;
  qty: string;
  status: "Match" | "Shortage" | "Overage";
  remarks: string;
  posted: "Y" | "N";
};

const sampleCounts: CountRecord[] = [
  {
    id: 1,
    sku: "ELE-USB-PC-N",
    itemName: "USB Cable",
    recordedQty: 100,
    countedQty: 98,
    discrepancy: -2,
    dateCounted: "2025-04-12",
    warehouse: "Warehouse-999",
    qty: "pcs",
    status: "Shortage",
    remarks: "2 cables missing",
    posted: "N",
  },
  {
    id: 2,
    sku: "BEV-WTR-CASE-N",
    itemName: "Water Bottle",
    recordedQty: 50,
    countedQty: 50,
    discrepancy: 0,
    dateCounted: "2025-04-13",
    warehouse: "Warehouse-1",
    qty: "case",
    status: "Match",
    remarks: "No discrepancy",
    posted: "Y",
  },
  {
    id: 3,
    sku: "BEV-WTR-BOT-N",
    itemName: "Beverages",
    recordedQty: 30,
    countedQty: 32,
    discrepancy: 2,
    dateCounted: "2025-04-14",
    warehouse: "Warehouse-1",
    qty: "bottle",
    status: "Overage",
    remarks: "2 extra cables found",
    posted: "N",
  },
  {
    id: 4,
    sku: "ELE-USB-PK-N",
    itemName: "USB Cable",
    recordedQty: 200,
    countedQty: 195,
    discrepancy: -5,
    dateCounted: "2025-04-15",
    warehouse: "Warehouse-1",
    qty: "pack",
    status: "Shortage",
    remarks: "Batteries damaged",
    posted: "Y",
  },
  {
    id: 5,
    sku: "ELE-USB-BX-D",
    itemName: "USB Cable",
    recordedQty: 20,
    countedQty: 20,
    discrepancy: 0,
    dateCounted: "2025-04-16",
    warehouse: "Warehouse-1",
    qty: "box",
    status: "Match",
    remarks: "All present",
    posted: "N",
  },
];

export default function PhysicalCount() {
  const [search, setSearch] = useState<string>("");
  const [counts, setCounts] = useState<CountRecord[]>(sampleCounts);

  const handleRemarksChange = (id: number, value: string) => {
    setCounts((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, remarks: value } : rec))
    );
  };

  const handleCountChange = (id: number, value: number) => {
    setCounts((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const discrepancy = value - rec.recordedQty;
          const status =
            discrepancy === 0
              ? "Match"
              : discrepancy < 0
              ? "Shortage"
              : "Overage";
          return { ...rec, countedQty: value, discrepancy, status };
        }
        return rec;
      })
    );
  };

  const filtered = counts.filter((rec) =>
    [
      rec.id.toString(),
      rec.sku.toString(),
      rec.itemName.toLowerCase(),
      rec.status.toLowerCase(),
      rec.remarks.toLowerCase(),
      rec.dateCounted,
    ].some((field) => field.includes(search.toLowerCase()))
  );

  const handlePostClick = () => {
    const confirmed = window.confirm(
      "Post selected physical counts to inventory?"
    );
    if (confirmed) {
      console.log("Confirmed physical count post");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Physical Count</h1>
        <p className={styles.pageSubtitle}>Inventory adjustment by count</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, item name, status or remarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.buttonGroup}>
          <button className={styles.addButton}>
            <Plus size={16} /> New Count
          </button>
          <button className={styles.postButton} onClick={handlePostClick}>
            <Send size={16} /> Post Physical Count
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product Name</th>
            <th>Recorded Qty</th>
            <th>Actual Count Qty</th>
            <th>Discrepancy</th>
            <th>Qty</th>
            <th>Date Counted</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Is Posted</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((rec) => (
            <tr key={rec.id} className={styles.row}>
              <td>{rec.sku}</td>
              <td>{rec.itemName}</td>
              <td className={styles.numericCell}>{rec.recordedQty}</td>
              <td>
                <input
                  type="number"
                  className={`${styles.commentInput} ${styles.numericCell}`}
                  value={rec.countedQty}
                  onChange={(e) =>
                    handleCountChange(rec.id, Number(e.target.value))
                  }
                  disabled={rec.posted === "Y"}
                />
              </td>
              <td className={styles.numericCell}>{rec.discrepancy}</td>
              <td>{rec.qty}</td>
              <td>{rec.dateCounted}</td>
              <td>{rec.warehouse}</td>
              <td className={rec.status !== "Match" ? styles.statusAlert : ""}>
                {rec.status}
              </td>
              <td>
                <input
                  type="text"
                  className={styles.commentInput}
                  value={rec.remarks}
                  onChange={(e) => handleRemarksChange(rec.id, e.target.value)}
                  disabled={rec.posted === "Y"}
                  placeholder="Enter remarks"
                />
              </td>
              <td className={styles.isPostedCell}>{rec.posted}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={12} style={{ textAlign: "center", padding: "1rem" }}>
                No count records found. Please consult Admin.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
