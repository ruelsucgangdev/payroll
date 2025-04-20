"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./DamageReturns.module.scss";

type DamageReturn = {
  id: number;
  returnId: string;
  itemId: number;
  itemName: string;
  quantity: number;
  reason: string;
  dateReturned: string;
  status: "Pending" | "Processed" | "Rejected";
};

const sampleReturns: DamageReturn[] = [
  {
    id: 1,
    returnId: "RET-1001",
    itemId: 101,
    itemName: "USB Cable",
    quantity: 3,
    reason: "Broken connector",
    dateReturned: "2025-04-10",
    status: "Pending",
  },
  {
    id: 2,
    returnId: "RET-1002",
    itemId: 205,
    itemName: "Wireless Mouse",
    quantity: 1,
    reason: "Dead on arrival",
    dateReturned: "2025-04-11",
    status: "Processed",
  },
  {
    id: 3,
    returnId: "RET-1003",
    itemId: 310,
    itemName: "HDMI Cable",
    quantity: 2,
    reason: "Frayed cable",
    dateReturned: "2025-04-12",
    status: "Rejected",
  },
  {
    id: 4,
    returnId: "RET-1004",
    itemId: 412,
    itemName: "Office Chair",
    quantity: 1,
    reason: "Broken leg",
    dateReturned: "2025-04-13",
    status: "Pending",
  },
  {
    id: 5,
    returnId: "RET-1005",
    itemId: 524,
    itemName: "AA Battery Pack",
    quantity: 4,
    reason: "Leakage",
    dateReturned: "2025-04-14",
    status: "Processed",
  },
];

export default function DamageReturns() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleReturns.filter((ret) =>
    [
      ret.returnId.toLowerCase(),
      ret.itemName.toLowerCase(),
      ret.reason.toLowerCase(),
      ret.dateReturned,
      ret.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Damage Returns</h1>
        <p className={styles.pageSubtitle}>Items returned due to damage</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Return ID, item name, reason, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New Return
        </button>
      </div>

      {/* Returns List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Return ID</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Reason</th>
            <th>Date Returned</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((ret) => (
            <tr key={ret.id} className={styles.row}>
              {/* <td>{ret.id}</td> */}
              <td>{ret.returnId}</td>
              <td>{ret.itemId}</td>
              <td>{ret.itemName}</td>
              <td>{ret.quantity}</td>
              <td>{ret.reason}</td>
              <td>{ret.dateReturned}</td>
              <td>{ret.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Return">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Return">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                No damage returns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
