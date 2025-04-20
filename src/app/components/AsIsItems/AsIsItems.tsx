"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./AsIsItems.module.scss";

type AsIsItem = {
  id: number;
  sku: string;
  itemId: number;
  itemName: string;
  condition: "Minor Damage" | "Old Stock" | "Discontinued";
  quantity: number;
  originalPrice: number;
  discountPercent: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
};

const sampleAsIs: AsIsItem[] = [
  {
    id: 1,
    sku: "SKU-USB-B",
    itemId: 101,
    itemName: "USB Cable",
    condition: "Minor Damage",
    quantity: 20,
    originalPrice: 255.0,
    discountPercent: "30%",
    startDate: "2025-05-01",
    endDate: "2025-06-01",
    status: "Active",
  },
  {
    id: 2,
    sku: "SKU-WIRE-B",
    itemId: 202,
    itemName: "Wireless Mouse",
    condition: "Old Stock",
    quantity: 10,
    originalPrice: 120.96,
    discountPercent: "28%",
    startDate: "2025-04-20",
    endDate: "2025-05-20",
    status: "Inactive",
  },
  {
    id: 3,
    sku: "SKU-HDM-B",
    itemId: 303,
    itemName: "HDMI Cable",
    condition: "Discontinued",
    quantity: 5,
    originalPrice: 127.25,
    discountPercent: "45%",
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    status: "Active",
  },
];

export default function AsIsItems() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleAsIs.filter((item) =>
    [
      item.itemName.toLowerCase(),
      item.condition.toLowerCase(),
      item.status.toLowerCase(),
      item.startDate,
      item.endDate,
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>As‑Is Items</h1>
        <p className={styles.pageSubtitle}>
          Discounted items due to slight damage or age
        </p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by item name, condition, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New As‑Is Item
        </button>
      </div>

      {/* As-Is Items List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>SKU</th>
            <th>Item (ID)</th>
            <th>Condition</th>
            <th>Qty</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className={styles.row}>
              {/* <td>{item.id}</td> */}
              <td>{item.sku}</td>
              <td>{`${item.itemName} (ID ${item.itemId})`}</td>
              <td>{item.condition}</td>
              <td>{item.quantity}</td>
              <td>₱{item.originalPrice.toFixed(2)}</td>
              <td>{item.discountPercent}</td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit As‑Is Item">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete As‑Is Item">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={11} style={{ textAlign: "center", padding: "1rem" }}>
                No As‑Is items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
