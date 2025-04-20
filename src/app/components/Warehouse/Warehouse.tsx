"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./Warehouse.module.scss";

type Warehouse = {
  id: string;
  code: string;
  name: string;
  location: string;
  capacity: number;
  manager: string;
  remarks: string;
  status: "Active" | "Inactive";
};

const sampleWarehouses: Warehouse[] = [
  {
    id: crypto.randomUUID(),
    code: "WH-001",
    name: "Main Warehouse",
    location: "Manila, Philippines",
    capacity: 5000,
    manager: "Pedro Cruz",
    remarks: "Central storage hub",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    code: "WH-002",
    name: "North Depot",
    location: "Quezon City",
    capacity: 3000,
    manager: "Ana Reyes",
    remarks: "Near terminal",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    code: "WH-003",
    name: "South Depot",
    location: "Parañaque",
    capacity: 2000,
    manager: "Luis Garcia",
    remarks: "Under renovation",
    status: "Inactive",
  },
  {
    id: crypto.randomUUID(),
    code: "WH-004",
    name: "East Warehouse",
    location: "Pasig City",
    capacity: 4000,
    manager: "Maria Lopez",
    remarks: "Extension planned",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    code: "WH-005",
    name: "West Storage",
    location: "Makati City",
    capacity: 2500,
    manager: "Jose Santos",
    remarks: "Cold storage section",
    status: "Active",
  },
];

export default function Warehouse() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleWarehouses.filter((w) =>
    [
      w.id.toString(),
      w.code.toLowerCase(),
      w.name.toLowerCase(),
      w.location.toLowerCase(),
      w.manager.toLowerCase(),
      w.remarks.toLowerCase(),
      w.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Warehouse List</h1>
        <p className={styles.pageSubtitle}>Manage storage locations</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by code, name, location, manager, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      {/* Warehouse List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Manager</th>
            <th>Remarks</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((w) => (
            <tr key={w.id} className={styles.row}>
              <td>{w.id}</td>
              <td>{w.code}</td>
              <td>{w.name}</td>
              <td>{w.location}</td>
              <td>{w.capacity}</td>
              <td>{w.manager}</td>
              <td>{w.remarks}</td>
              <td>{w.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Warehouse">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Warehouse">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                No warehouses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
