"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./UnitsOfMeasure.module.scss";

type Unit = {
  id: string;
  name: string;
  abbreviation: string;
};

const sampleUnits: Unit[] = [
  { id: crypto.randomUUID(), name: "Kilogram", abbreviation: "kg" },
  { id: crypto.randomUUID(), name: "Gram", abbreviation: "g" },
  { id: crypto.randomUUID(), name: "Liter", abbreviation: "L" },
  { id: crypto.randomUUID(), name: "Piece", abbreviation: "pc" },
  { id: crypto.randomUUID(), name: "Box", abbreviation: "bx" },
];

export default function UnitsOfMeasure() {
  const [search, setSearch] = useState<string>("");

  const filtered = sampleUnits.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toString().includes(search)
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Units of Measure</h1>
        <p className={styles.pageSubtitle}>Define measurement units</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, name, or abbreviation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add Unit
        </button>
      </div>

      {/* Unit List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Abbreviation</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className={styles.row}>
              <td className={styles.idColumn}>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.abbreviation}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Unit">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Unit">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                No units found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
