"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./Inventory.module.scss";

type InventoryItem = {
  id: string;
  sku: string;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  warehouse: string;
  status: "Active" | "Inactive";
};

const sampleInventory: InventoryItem[] = [
  // Electronics USB Cable
  {
    id: crypto.randomUUID(),
    sku: "ABC-001",
    category: "Electronics",
    name: "USB Cable",
    description: "Type‑C to A, 1m",
    unit: "pcs",
    price: 5.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "ABC-001-2PK",
    category: "Electronics",
    name: "USB Cable",
    description: "2‑pack USB cables",
    unit: "pack",
    price: 9.5,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "ABC-001-CASE",
    category: "Electronics",
    name: "USB Cable",
    description: "Case of 50 cables",
    unit: "box",
    price: 240.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Electronics Wireless Mouse
  {
    id: crypto.randomUUID(),
    sku: "ABC-002",
    category: "Electronics",
    name: "Wireless Mouse",
    description: "Optical, black",
    unit: "pcs",
    price: 12.5,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "ABC-002-PACK",
    category: "Electronics",
    name: "Wireless Mouse",
    description: "Pack of 5 mice",
    unit: "pack",
    price: 55.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Household AA Battery
  {
    id: crypto.randomUUID(),
    sku: "HHH-005",
    category: "Household",
    name: "AA Battery Pack",
    description: "4‑pack alkaline",
    unit: "pack",
    price: 4.99,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "HHH-005-SACK",
    category: "Household",
    name: "AA Battery Pack",
    description: "Sack of 100 batteries",
    unit: "sack",
    price: 120.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Furniture Office Chair
  {
    id: crypto.randomUUID(),
    sku: "FUR-CHAIR",
    category: "Furniture",
    name: "Office Chair",
    description: "Ergonomic, adjustable",
    unit: "unit",
    price: 89.99,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Food Rice examples
  {
    id: crypto.randomUUID(),
    sku: "RICE-CK",
    category: "Food",
    name: "Rice",
    description: "50kg sack of rice",
    unit: "sack",
    price: 1500.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "RICE-5KG",
    category: "Food",
    name: "Rice",
    description: "5kg bag of rice",
    unit: "5kg",
    price: 160.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "RICE-KG",
    category: "Food",
    name: "Rice",
    description: "1kg of rice",
    unit: "1kg",
    price: 35.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Beverages Water Bottle
  {
    id: crypto.randomUUID(),
    sku: "WTR-CASE",
    category: "Beverages",
    name: "Water Bottle",
    description: "Case of 24 bottles",
    unit: "case",
    price: 48.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "WTR-BTL",
    category: "Beverages",
    name: "Water Bottle",
    description: "Single bottle, 500ml",
    unit: "bottle",
    price: 2.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },

  // Tobacco Cigarette examples
  {
    id: crypto.randomUUID(),
    sku: "CIG-BOX",
    category: "Tobacco",
    name: "Cigarette",
    description: "Box of 20 sticks",
    unit: "box",
    price: 120.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "CIG-2PK",
    category: "Tobacco",
    name: "Cigarette",
    description: "2‑pack sticks",
    unit: "pack",
    price: 12.0,
    warehouse: "Warehouse-1",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    sku: "CIG-PCS",
    category: "Tobacco",
    name: "Cigarette",
    description: "Single stick",
    unit: "pcs",
    price: 6.0,
    warehouse: "Warehouse-1",
    status: "Active",
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
      item.status.toLowerCase(),
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
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className={styles.row}>
              {/* <td className={styles.idColumn}>{item.id}</td> */}
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>PHP {item.price.toFixed(2)}</td>
              <td>{item.warehouse}</td>
              <td>{item.status}</td>
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
    </div>
  );
}
