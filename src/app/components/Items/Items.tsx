// File: src/app/components/Items.tsx
"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./items.module.scss";

type Item = {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  status: "Active" | "Inactive";
};

const sampleItems: Item[] = [
  {
    id: crypto.randomUUID(),
    sku: "USB-6201",
    name: "USB Cable",
    description: "Type‑C to A, 1m",
    category: "Electronics",
    brand: "Acme",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "WMOUSE-7121",
    name: "Wireless Mouse",
    description: "Optical, black",
    category: "Electronics",
    brand: "LogiTech",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "HDMI-9811",
    name: "HDMI Cable",
    description: "2m, high‑speed",
    category: "Electronics",
    brand: "CableMaster",
    status: "Inactive",
  },
  {
    id: crypto.randomUUID(),
    sku: "BATRY-8711",
    name: "AA Battery Pack",
    description: "4‑pack alkaline",
    category: "Household",
    brand: "PowerCells",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "CHRS-9811",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    category: "Furniture",
    brand: "ComfortWorks",
    status: "Active",
  },
];

export default function Items() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleItems.filter((it) =>
    [
      it.id.toString().trim(),
      it.sku.toString(),
      it.name.toLowerCase(),
      it.category.toLowerCase(),
      it.brand.toLowerCase(),
      it.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Items Master</h1>
        <p className={styles.pageSubtitle}>Manage your product catalog</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, name, category, brand, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Items List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((it) => (
            <tr key={it.id} className={styles.row}>
              <td className={styles.idColumn}>{it.id}</td>
              <td>{it.sku}</td>
              <td>{it.name}</td>
              <td>{it.description}</td>
              <td>{it.category}</td>
              <td>{it.brand}</td>
              <td>{it.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Item">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Item">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
