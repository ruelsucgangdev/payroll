"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./Returns.module.scss";

type DamageReturn = {
  id: string;
  sku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  qty: number;
  warehouse: string;
  status: "For Approval" | "Approved" | "Back To Inventory";
};

const sampleReturns: DamageReturn[] = [
  // Electronics USB Cable
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-N",
    category: "Electronics",
    name: "USB Cable",
    description: "Case of 50 cables",
    unit: "box",
    price: 240.0,
    qty: 1,
    warehouse: "Warehouse-1",
    status: "Approved",
  },
  {
    id: crypto.randomUUID(),
    sku: "FUR-CHAIR-PC-N",
    category: "Furniture",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    unit: "pcs",
    price: 45.6,
    qty: 10,
    warehouse: "Warehouse-1",
    status: "Approved",
  },
  {
    id: crypto.randomUUID(),
    sku: "BEV-WTR-CASE-N",
    category: "Beverages",
    name: "Water Bottle",
    description: "Case of 24 bottles",
    unit: "case",
    price: 48.0,
    qty: 1,
    warehouse: "Warehouse-1",
    status: "For Approval",
  },
];

export default function Returns() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleReturns.filter((item) =>
    [
      item.id.toString(),
      item.sku.toLowerCase(),
      item.category.toLowerCase(),
      item.name.toLowerCase(),
      item.unit.toLowerCase(),
      item.warehouse.toString(),
      item.status,
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Return Item</h1>
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
            <th>SKU</th>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className={styles.row}>
              {/* <td className={styles.idColumn}>{item.id}</td> */}
              <td>{item.sku}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>PHP {item.price.toFixed(2)}</td>
              <td>{item.qty}</td>
              <td>{item.warehouse}</td>
              <td>{item.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit">
                  <Edit3 size={16} />
                </button>
                {/* <button className={styles.iconButton} title="Delete">
                  <Trash2 size={16} />
                </button> */}
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
