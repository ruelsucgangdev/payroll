"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./CashRefund.module.scss";

type Refund = {
  id: string;
  refundId: string;
  transactionId: string;
  itemId: number;
  itemName: string;
  quantity: number;
  amount: number;
  reason: string;
  processedBy: string;
  dateRefunded: string;
  status: "Pending" | "Completed" | "Cancelled";
};

const sampleRefunds: Refund[] = [
  {
    id: crypto.randomUUID(),
    refundId: "RFD-3001",
    transactionId: "TX-1001",
    itemId: 101,
    itemName: "USB Cable",
    quantity: 2,
    amount: 10.0,
    reason: "Changed mind",
    processedBy: "John Doe",
    dateRefunded: "2025-04-18",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    refundId: "RFD-3002",
    transactionId: "TX-1005",
    itemId: 205,
    itemName: "Wireless Mouse",
    quantity: 1,
    amount: 12.5,
    reason: "Found cheaper",
    processedBy: "Alice Smith",
    dateRefunded: "2025-04-19",
    status: "Pending",
  },
  {
    id: crypto.randomUUID(),
    refundId: "RFD-3003",
    transactionId: "TX-1010",
    itemId: 310,
    itemName: "HDMI Cable",
    quantity: 1,
    amount: 7.25,
    reason: "No longer needed",
    processedBy: "Cindy Nguyen",
    dateRefunded: "2025-04-17",
    status: "Completed",
  },
  {
    id: crypto.randomUUID(),
    refundId: "RFD-3004",
    transactionId: "TX-1012",
    itemId: 412,
    itemName: "Office Chair",
    quantity: 1,
    amount: 89.99,
    reason: "Defective packaging",
    processedBy: "Bob Thompson",
    dateRefunded: "2025-04-16",
    status: "Cancelled",
  },
  {
    id: crypto.randomUUID(),
    refundId: "RFD-3005",
    transactionId: "TX-1020",
    itemId: 524,
    itemName: "AA Battery Pack",
    quantity: 4,
    amount: 19.96,
    reason: "Duplicate order",
    processedBy: "Jane Lee",
    dateRefunded: "2025-04-15",
    status: "Completed",
  },
];

export default function CashRefund() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleRefunds.filter((r) =>
    [
      r.refundId.toLowerCase(),
      r.transactionId.toLowerCase(),
      r.itemName.toLowerCase(),
      r.reason.toLowerCase(),
      r.processedBy.toLowerCase(),
      r.dateRefunded,
      r.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Cash Refunds</h1>
        <p className={styles.pageSubtitle}>Process customer refunds</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Refund ID, Transaction ID, item name, staff, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New Refund
        </button>
      </div>

      {/* Refund List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Refund ID</th>
            <th>Transaction ID</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Processed By</th>
            <th>Date</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className={styles.row}>
              {/* <td className={styles.idColumn}>{r.id}</td> */}
              <td>{r.refundId}</td>
              <td>{r.transactionId}</td>
              <td>
                {r.itemName} (ID {r.itemId})
              </td>
              <td>{r.quantity}</td>
              <td>₱{r.amount.toFixed(2)}</td>
              <td>{r.reason}</td>
              <td>{r.processedBy}</td>
              <td>{r.dateRefunded}</td>
              <td>{r.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Refund">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Refund">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={11} style={{ textAlign: "center", padding: "1rem" }}>
                No refunds found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
