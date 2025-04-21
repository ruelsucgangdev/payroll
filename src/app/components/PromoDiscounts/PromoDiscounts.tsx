"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./PromoDiscounts.module.scss";

type RegularDiscount = {
  id: string;
  sku: string;
  name: string;
  inventoryId: string;
  itemName: string;
  unit: string;
  discountType: "Percentage" | "Buy X Get Y" | "Fixed Amount";
  percentage: string; // e.g. '.10'
  value: string; // e.g. 'Buy 10 Get 1' or '₱50 off'
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
};

const sampleDiscounts: RegularDiscount[] = [
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-PC-N",
    name: "USB Cable",
    inventoryId: crypto.randomUUID(),
    itemName: "USB Cable",
    unit: "pcs",
    discountType: "Percentage",
    percentage: ".30",
    value: "30% off",
    startDate: "2024-01-01",
    endDate: "2024-02-31",
    status: "Inactive",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-PC-N",
    name: "USB Cable",
    inventoryId: crypto.randomUUID(),
    itemName: "USB Cable",
    unit: "pcs",
    discountType: "Percentage",
    percentage: ".15",
    value: "15% off",
    startDate: "2025-04-01",
    endDate: "2026-05-31",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-PK-N",
    name: "USB Cable",
    inventoryId: crypto.randomUUID(),
    itemName: "Wireless Mouse",
    unit: "pack",
    discountType: "Buy X Get Y",
    percentage: "",
    value: "Buy 10 Get 1",
    startDate: "2025-03-01",
    endDate: "2025-11-15",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-N",
    name: "USB Cable",
    inventoryId: crypto.randomUUID(),
    itemName: "HDMI Cable",
    unit: "box",
    discountType: "Percentage",
    percentage: ".50",
    value: "₱50 off",
    startDate: "2025-09-01",
    endDate: "2025-10-31",
    status: "Inactive",
  },
];

export default function RegularDiscounts() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleDiscounts.filter((d) =>
    [
      d.name.toLowerCase(),
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
        <h1>Promo Discounts</h1>
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
            <th>SKU</th>
            <th>Product Name</th>
            {/* <th>Inventory ID</th> */}
            <th>Unit</th>
            <th>Discount</th>
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
              <td>{d.sku}</td>
              <td>{d.name}</td>
              {/* <td>{d.inventoryId}</td> */}
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
