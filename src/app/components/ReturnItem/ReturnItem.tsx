"use client";

import { useState } from "react";
import { Plus, Edit3, Send } from "lucide-react";
import styles from "./ReturnItem.module.scss";

type ReturnItem = {
  id: string;
  sku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  reason: string;
  status: "Pending" | "Restocked" | "Refunded" | "Rejected";
  posted: "Y" | "N";
};

const sampleReturns: ReturnItem[] = [
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-N",
    category: "Electronics",
    name: "USB Cable",
    description: "2‑pack USB cables",
    unit: "box",
    price: 240.0,
    reason: "Damaged during transport",
    status: "Pending",
    posted: "N",
  },
  {
    id: crypto.randomUUID(),
    sku: "FUR-CHAIR-PC-N",
    category: "Furniture",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    unit: "pcs",
    price: 45.6,
    reason: "Wrong item sent",
    status: "Refunded",
    posted: "Y",
  },
  {
    id: crypto.randomUUID(),
    sku: "BEV-WTR-CASE-N",
    category: "Beverages",
    name: "Water Bottle",
    description: "Case of 24 bottles",
    unit: "case",
    price: 48.0,
    reason: "Broken packaging",
    status: "Restocked",
    posted: "N",
  },
  {
    id: crypto.randomUUID(),
    sku: "MED-ALC-BOX-N",
    category: "Medical",
    name: "Alcohol",
    description: "70% Solution, 12 bottles",
    unit: "box",
    price: 180.0,
    reason: "Item not in order list",
    status: "Rejected",
    posted: "Y",
  },
];

export default function ReturnItem() {
  const [search, setSearch] = useState<string>("");
  const [returns, setReturns] = useState<ReturnItem[]>(sampleReturns);

  const handleStatusChange = (id: string, newStatus: ReturnItem["status"]) => {
    setReturns((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const filtered = returns.filter((item) =>
    [
      item.id.toString(),
      item.sku.toLowerCase(),
      item.category.toLowerCase(),
      item.name.toLowerCase(),
      item.unit.toLowerCase(),
      item.reason.toLowerCase(),
      item.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Return Product</h1>
        <p className={styles.pageSubtitle}>Items returned due to damage</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Return ID, item name, reason, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.buttonGroup}>
          <button className={styles.addButton}>
            <Plus size={16} /> New Return
          </button>
          <button className={styles.postButton}>
            <Send size={16} /> Post Return Product
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Reason</th>
            <th>Status</th>
            <th className={styles.isPostedCell}>Is Posted</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className={styles.row}>
              <td>{item.sku}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>PHP {item.price.toFixed(2)}</td>
              <td>{item.reason}</td>
              <td>
                <select
                  className={`${styles.statusDropdown} ${
                    styles[`status${item.status}`]
                  }`}
                  value={item.status}
                  disabled={item.posted === "Y"}
                  onChange={(e) =>
                    handleStatusChange(
                      item.id,
                      e.target.value as ReturnItem["status"]
                    )
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Restocked">Restocked</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className={styles.isPostedCell}>{item.posted}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit">
                  <Edit3 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "1rem" }}>
                No damage returns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.colorPending}></span>
          <span>Pending</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.colorRestocked}></span>
          <span>Restocked</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.colorRefunded}></span>
          <span>Refunded</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.colorRejected}></span>
          <span>Rejected</span>
        </div>
      </div>
    </div>
  );
}
