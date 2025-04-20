"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./PhysicalCount.module.scss";

type CountRecord = {
  id: number;
  itemId: number;
  itemName: string;
  recordedQty: number;
  countedQty: number;
  discrepancy: number;
  dateCounted: string;
  status: "Match" | "Shortage" | "Overage";
  remarks: string;
};

const sampleCounts: CountRecord[] = [
  {
    id: 1,
    itemId: 101,
    itemName: "USB Cable",
    recordedQty: 100,
    countedQty: 98,
    discrepancy: -2,
    dateCounted: "2025-04-12",
    status: "Shortage",
    remarks: "2 cables missing",
  },
  {
    id: 2,
    itemId: 202,
    itemName: "Wireless Mouse",
    recordedQty: 50,
    countedQty: 50,
    discrepancy: 0,
    dateCounted: "2025-04-13",
    status: "Match",
    remarks: "No discrepancy",
  },
  {
    id: 3,
    itemId: 303,
    itemName: "HDMI Cable",
    recordedQty: 30,
    countedQty: 32,
    discrepancy: 2,
    dateCounted: "2025-04-14",
    status: "Overage",
    remarks: "2 extra cables found",
  },
  {
    id: 4,
    itemId: 404,
    itemName: "AA Battery Pack",
    recordedQty: 200,
    countedQty: 195,
    discrepancy: -5,
    dateCounted: "2025-04-15",
    status: "Shortage",
    remarks: "Batteries damaged",
  },
  {
    id: 5,
    itemId: 505,
    itemName: "Office Chair",
    recordedQty: 20,
    countedQty: 20,
    discrepancy: 0,
    dateCounted: "2025-04-16",
    status: "Match",
    remarks: "All present",
  },
];

export default function PhysicalCount() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleCounts.filter((rec) =>
    [
      rec.id.toString(),
      rec.itemId.toString(),
      rec.itemName.toLowerCase(),
      rec.status.toLowerCase(),
      rec.remarks.toLowerCase(),
      rec.dateCounted,
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Physical Count</h1>
        <p className={styles.pageSubtitle}>Inventory adjustment by count</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, item name, status or remarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New Count
        </button>
      </div>

      {/* Count Records List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Recorded Qty</th>
            <th>Counted Qty</th>
            <th>Discrepancy</th>
            <th>Date Counted</th>
            <th>Status</th>
            <th>Remarks</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((rec) => (
            <tr key={rec.id} className={styles.row}>
              {/* <td>{rec.id}</td> */}
              <td>{rec.itemId}</td>
              <td>{rec.itemName}</td>
              <td>{rec.recordedQty}</td>
              <td>{rec.countedQty}</td>
              <td>{rec.discrepancy}</td>
              <td>{rec.dateCounted}</td>
              <td>{rec.status}</td>
              <td>{rec.remarks}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Count">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Count">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "1rem" }}>
                No count records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
