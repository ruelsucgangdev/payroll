"use client";

import { useState } from "react";
import styles from "./ItemListReport.module.scss";

type InventoryItem = {
  id: number;
  sku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  status: "Active" | "Inactive";
};

const sampleInventory: InventoryItem[] = [
  {
    id: 1,
    sku: "ABC-001",
    category: "Electronics",
    name: "USB Cable",
    description: "Type‑C to A, 1m",
    unit: "pcs",
    price: 5.0,
    status: "Active",
  },
  {
    id: 2,
    sku: "ABC-002",
    category: "Electronics",
    name: "Wireless Mouse",
    description: "Optical, black",
    unit: "pcs",
    price: 12.5,
    status: "Active",
  },
  {
    id: 3,
    sku: "ELE-CASE",
    category: "Electronics",
    name: "HDMI Cable Case",
    description: "Case of 10 HDMI cables",
    unit: "case",
    price: 60.0,
    status: "Active",
  },
  {
    id: 4,
    sku: "HHH-005",
    category: "Household",
    name: "AA Battery Pack",
    description: "4‑pack alkaline",
    unit: "pack",
    price: 4.99,
    status: "Inactive",
  },
  {
    id: 5,
    sku: "RICE-5KG",
    category: "Food",
    name: "Rice",
    description: "5kg bag of rice",
    unit: "5kg",
    price: 160.0,
    status: "Active",
  },
];

export default function ItemListReport() {
  const [filters, setFilters] = useState({
    sku: "",
    category: "",
    name: "",
    status: "",
  });
  const [reportData, setReportData] = useState<InventoryItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const generateReport = () => {
    const filtered = sampleInventory.filter((item) =>
      [
        item.sku.toLowerCase(),
        item.category.toLowerCase(),
        item.name.toLowerCase(),
        item.status.toLowerCase(),
      ].some((field) =>
        field.includes(filters[field as keyof typeof filters].toLowerCase())
      )
    );
    setReportData(filtered);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Item List Report</h1>
        <p className={styles.pageSubtitle}>
          Generate and view inventory report
        </p>
      </header>

      {/* Filter criteria */}
      <div className={styles.filters}>
        <input
          name="sku"
          placeholder="Filter by SKU"
          value={filters.sku}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <input
          name="category"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <input
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleChange}
          className={styles.filterInput}
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className={styles.filterInput}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={generateReport} className={styles.generateButton}>
          Generate Report
        </button>
      </div>

      {/* Report Table */}
      {reportData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.id} className={styles.row}>
                <td>{item.id}</td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.unit}</td>
                <td>₱{item.price.toFixed(2)}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.placeholder}>No report generated.</div>
      )}
    </div>
  );
}
