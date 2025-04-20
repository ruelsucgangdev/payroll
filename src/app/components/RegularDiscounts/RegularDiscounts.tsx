"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./RegularDiscounts.module.scss";

type RegularDiscount = {
  id: string;
  discountId: string;
  itemId: number;
  itemName: string;
  unit: string;
  discountType: "Percentage" | "Buy X Get Y" | "Fixed Amount";
  percentage: string; // e.g. '10%'
  value: string; // e.g. 'Buy 10 Get 1' or '₱50 off'
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
};

const sampleDiscounts: RegularDiscount[] = [
  {
    id: crypto.randomUUID(),
    discountId: "DISC-001",
    itemId: 101,
    itemName: "USB Cable",
    unit: "pack",
    discountType: "Percentage",
    percentage: "10%",
    value: "10% off",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    discountId: "DISC-002",
    itemId: 205,
    itemName: "Wireless Mouse",
    unit: "pcs",
    discountType: "Buy X Get Y",
    percentage: "",
    value: "Buy 10 Get 1",
    startDate: "2025-06-01",
    endDate: "2025-06-15",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    discountId: "DISC-003",
    itemId: 310,
    itemName: "HDMI Cable",
    unit: "case",
    discountType: "Fixed Amount",
    percentage: "",
    value: "₱50 off",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    status: "Inactive",
  },
];

export default function RegularDiscounts() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleDiscounts.filter((d) =>
    [
      d.discountId.toLowerCase(),
      d.itemName.toLowerCase(),
      d.unit.toLowerCase(),
      d.discountType.toLowerCase(),
      d.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Regular Discounts</h1>
        <p className={styles.pageSubtitle}>
          Set up promotional offers on products
        </p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Discount ID, item name, type, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> New Discount
        </button>
      </div>

      {/* Discounts List */}
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Discount ID</th>
            <th>Item (ID)</th>
            <th>Unit</th>
            <th>Percentage</th>
            <th>Type</th>
            <th>Value</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id} className={styles.row}>
              {/* <td className={styles.idColumn}>{d.id}</td> */}
              <td>{d.discountId}</td>
              <td>{`${d.itemName} (${d.itemId})`}</td>
              <td>{d.unit}</td>
              <td>{d.percentage || "-"}</td>
              <td>{d.discountType}</td>
              <td>{d.value}</td>
              <td>{d.startDate}</td>
              <td>{d.endDate}</td>
              <td>{d.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Discount">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Discount">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={11} style={{ textAlign: "center", padding: "1rem" }}>
                No discounts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
