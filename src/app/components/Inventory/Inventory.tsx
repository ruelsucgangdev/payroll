"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, Info } from "lucide-react";
import styles from "./Inventory.module.scss";

type InventoryItem = {
  id: string;
  sku: string;
  oldsku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  intQty: number;
  currQty: number;
  warehouse: string;
  condition: "New" | "Return" | "Old Stock";
};

const sampleInventory: InventoryItem[] = [
  // Electronics USB Cable
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-PC-N",
    oldsku: "",
    category: "Electronics",
    name: "USB Cable",
    description: "Type‑C to A, 1m",
    unit: "pcs",
    price: 5.0,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-PK-N",
    oldsku: "",
    category: "Electronics",
    name: "USB Cable",
    description: "2‑pack USB cables",
    unit: "pack",
    price: 9.5,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-N",
    oldsku: "",
    category: "Electronics",
    name: "USB Cable",
    description: "Case of 50 cables",
    unit: "box",
    price: 240.0,
    intQty: 100,
    currQty: 98,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "ELE-USB-BX-D",
    oldsku: "ELE-USB-BX-N",
    category: "Electronics",
    name: "USB Cable",
    description: "Case of 50 cables",
    unit: "box",
    price: 140.0,
    intQty: 1,
    currQty: 1,
    warehouse: "Warehouse-1",
    condition: "Return",
  },

  // Beverages Water Bottle
  {
    id: crypto.randomUUID(),
    sku: "BEV-WTR-CASE-N",
    oldsku: "",
    category: "Beverages",
    name: "Water Bottle",
    description: "Case of 24 bottles",
    unit: "case",
    price: 48.0,
    intQty: 100,
    currQty: 99,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "BEV-WTR-BOT-N",
    oldsku: "",
    category: "Beverages",
    name: "Water Bottle",
    description: "Single bottle, 500ml",
    unit: "bottle",
    price: 2.0,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },

  // Furniture Office Chair
  {
    id: crypto.randomUUID(),
    sku: "FUR-CHAIR-PC-N",
    oldsku: "",
    category: "Furniture",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    unit: "pcs",
    price: 89.99,
    intQty: 100,
    currQty: 80,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "FUR-CHAIR-PC-D",
    oldsku: "FUR-CHAIR-PC-N",
    category: "Furniture",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    unit: "pcs",
    price: 45.6,
    intQty: 10,
    currQty: 10,
    warehouse: "Warehouse-1",
    condition: "Return",
  },

  // Food Rice examples
  {
    id: crypto.randomUUID(),
    sku: "FUD-RICE-SACK-N",
    oldsku: "",
    category: "Food",
    name: "Rice",
    description: "50kg sack of rice",
    unit: "sack",
    price: 1500.0,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "FUD-RICE-5KG-N",
    oldsku: "",
    category: "Food",
    name: "Rice",
    description: "5kg bag of rice",
    unit: "5kg",
    price: 160.0,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },
  {
    id: crypto.randomUUID(),
    sku: "FUD-RICE-1KG-N",
    oldsku: "",
    category: "Food",
    name: "Rice",
    description: "1kg of rice",
    unit: "1kg",
    price: 35.0,
    intQty: 100,
    currQty: 100,
    warehouse: "Warehouse-1",
    condition: "New",
  },
];

export default function Inventory() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleInventory.filter((item) =>
    [
      item.id.toString(),
      item.sku.toLowerCase(),
      item.category.toLowerCase(),
      item.name.toLowerCase(),
      item.unit.toLowerCase(),
      item.warehouse.toString(),
      // item.condition.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Inventory</h1>
        <p className={styles.pageSubtitle}>Manage stock items and pricing</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, SKU, name, category, unit or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add Inventory
        </button>
      </div>

      {/* Inventory List */}
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
            <th>Initial Qty</th>
            <th>Current Qty</th>
            <th>Warehouse</th>
            <th>Old SKU</th>
            <th>Condition</th>
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
              {/* <td>{item.intQty}</td> */}
              <td> {item.condition === "Return" ? "" : item.intQty}</td>

              <td>
                <span
                  className={
                    item.condition === "Return"
                      ? styles.currQtyReturn
                      : item.intQty !== item.currQty
                      ? styles.currQtyMismatch
                      : undefined
                  }
                >
                  {item.currQty}
                </span>

                {item.intQty !== item.currQty &&
                  item.condition !== "Return" && (
                    <span className={styles.tooltipWrapper}>
                      <Info size={16} className={styles.tooltipIconMismatch} />
                      <span className={styles.tooltipText}>
                        Current quantity adjusts in real time based on POS
                        sales.
                      </span>
                    </span>
                  )}
              </td>

              <td>{item.warehouse}</td>
              <td>{item.oldsku}</td>
              <td
                className={`${styles.statusCell} ${
                  item.condition === "Return"
                    ? styles.statusDamaged
                    : item.condition === "Old Stock"
                    ? styles.statusOldStock
                    : styles.statusNew
                }`}
              >
                {item.condition}
              </td>

              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                No inventory items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* added: legend under table to explain color meanings */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColorMismatch}></span>
          <span>Items sold </span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorReturn}></span>
          <span>Return items </span>
        </div>
      </div>
    </div>
  );
}
