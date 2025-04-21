"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./ReturnItem.module.scss";

type ReturnItem = {
  id: string;
  sku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  qty: number;
  warehouse: string;
  status: "For Approval" | "Approved" | "Cancelled";
};

const sampleReturns: ReturnItem[] = [
  // Electronics USB Cable
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-N",
    category: "Electronics",
    name: "USB Cable",
    description: "2‑pack USB cables",
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
    status: "Cancelled",
  },
];

export default function ReturnItem() {
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
        <h1>Return Product</h1>
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
              {/* <td>{item.status}</td> */}
              <td>
                <span
                  className={
                    item.status === "Approved"
                      ? styles.statusApproved
                      : item.status === "For Approval"
                      ? styles.statusForApproval
                      : item.status === "Cancelled"
                      ? styles.statusCancelled // added condition for Cancelled
                      : styles.statusBackToInventory
                  }
                >
                  {item.status}
                </span>
              </td>
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
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColorApproved}></span>
          <span>Approved items </span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorForApproval}></span>
          <span>Pending approval </span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorCancelled}></span>
          <span>Cancelled returns (Back to Inventory)</span>
        </div>
      </div>
    </div>
  );
}
