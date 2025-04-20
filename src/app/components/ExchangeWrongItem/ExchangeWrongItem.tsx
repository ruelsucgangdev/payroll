"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./ExchangeWrongItem.module.scss";

type Exchange = {
  id: number;
  exchangeId: string;
  originalItemId: number;
  originalItemName: string;
  newItemId: number;
  newItemName: string;
  reason: string;
  staff: string;
  dateExchanged: string;
  status: "Pending" | "Completed" | "Cancelled";
};

const sampleExchanges: Exchange[] = [
  {
    id: 1,
    exchangeId: "EXC-2001",
    originalItemId: 101,
    originalItemName: "USB Cable",
    newItemId: 102,
    newItemName: "USB Cable, pack",
    reason: "Wrong length delivered",
    staff: "Alice Smith",
    dateExchanged: "2025-04-15",
    status: "Completed",
  },
  {
    id: 2,
    exchangeId: "EXC-2002",
    originalItemId: 205,
    originalItemName: "Wireless Mouse",
    newItemId: 206,
    newItemName: "Wireless Mouse (left-handed)",
    reason: "Incorrect handedness",
    staff: "John Doe",
    dateExchanged: "2025-04-16",
    status: "Pending",
  },
  {
    id: 3,
    exchangeId: "EXC-2003",
    originalItemId: 310,
    originalItemName: "HDMI Cable",
    newItemId: 311,
    newItemName: "HDMI Cable (3m)",
    reason: "Customer needed longer cable",
    staff: "Cindy Nguyen",
    dateExchanged: "2025-04-17",
    status: "Cancelled",
  },
];

export default function ExchangeWrongItem() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleExchanges.filter((ex) =>
    [
      ex.exchangeId.toLowerCase(),
      ex.originalItemName.toLowerCase(),
      ex.newItemName.toLowerCase(),
      ex.reason.toLowerCase(),
      ex.staff.toLowerCase(),
      ex.dateExchanged,
      ex.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Exchange (Wrong Item)</h1>
        <p className={styles.pageSubtitle}>
          Handle exchanges for incorrect items
        </p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Exchange ID, item names, staff, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New Exchange
        </button>
      </div>

      {/* Exchange List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Exchange ID</th>
            <th>Original Item</th>
            <th>New Item</th>
            <th>Reason</th>
            <th>Staff</th>
            <th>Date</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((ex) => (
            <tr key={ex.id} className={styles.row}>
              {/* <td>{ex.id}</td> */}
              <td>{ex.exchangeId}</td>
              <td>{`${ex.originalItemName} (ID ${ex.originalItemId})`}</td>
              <td>{`${ex.newItemName} (ID ${ex.newItemId})`}</td>
              <td>{ex.reason}</td>
              <td>{ex.staff}</td>
              <td>{ex.dateExchanged}</td>
              <td>{ex.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Exchange">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Exchange">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                No exchanges found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
