// ✅ PhysicalCount.tsx (Warehouse & Counter filters, professional Add Row, remove warehouse column)
"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";
import styles from "./PhysicalCount.module.scss";

type CountRecord = {
  id: number;
  sku: string;
  recordedQty: number;
  countedQty: number;
  discrepancy: number;
  dateCounted: string;
  countedBy: string;
  warehouse: string;
  qty: string;
  status: "Match" | "Shortage" | "Overage";
  remarks: string;
  posted: "Y" | "N";
};

const sampleCounts: CountRecord[] = [
  {
    id: 1,
    sku: "ELE-USB-PC-N",
    recordedQty: 100,
    countedQty: 98,
    discrepancy: -2,
    dateCounted: "2025-04-12",
    countedBy: "Alice",
    warehouse: "Warehouse-000",
    qty: "pcs",
    status: "Shortage",
    remarks: "2 cables missing",
    posted: "N",
  },
  {
    id: 2,
    sku: "BEV-WTR-CASE-N",
    recordedQty: 50,
    countedQty: 50,
    discrepancy: 0,
    dateCounted: "2025-04-13",
    countedBy: "Bob",
    warehouse: "Warehouse-1",
    qty: "case",
    status: "Match",
    remarks: "No discrepancy",
    posted: "Y",
  },
  {
    id: 3,
    sku: "BEV-WTR-BOT-N",
    recordedQty: 30,
    countedQty: 32,
    discrepancy: 2,
    dateCounted: "2025-04-14",
    countedBy: "Carol",
    warehouse: "Warehouse-2",
    qty: "bottle",
    status: "Overage",
    remarks: "2 extra found",
    posted: "N",
  },
  {
    id: 4,
    sku: "ELE-USB-PK-N",
    recordedQty: 200,
    countedQty: 195,
    discrepancy: -5,
    dateCounted: "2025-04-15",
    countedBy: "Dave",
    warehouse: "Warehouse-3",
    qty: "pack",
    status: "Shortage",
    remarks: "Batteries damaged",
    posted: "Y",
  },
  {
    id: 5,
    sku: "ELE-USB-BX-D",
    recordedQty: 20,
    countedQty: 20,
    discrepancy: 0,
    dateCounted: "2025-04-16",
    countedBy: "Eve",
    warehouse: "Warehouse-4",
    qty: "box",
    status: "Match",
    remarks: "All present",
    posted: "N",
  },
];

export default function PhysicalCount() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const [filterCounter, setFilterCounter] = useState<string>("");

  const warehouseOptions = [
    "Warehouse-000",
    "Warehouse-1",
    "Warehouse-2",
    "Warehouse-3",
    "Warehouse-4",
    "Warehouse-5",
  ];

  const [counts, setCounts] = useState<CountRecord[]>(sampleCounts);

  const handleRemarksChange = (id: number, value: string) => {
    setCounts((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, remarks: value } : rec))
    );
  };

  const handleCountChange = (id: number, value: number) => {
    setCounts((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const discrepancy = value - rec.recordedQty;
          const status =
            discrepancy === 0
              ? "Match"
              : discrepancy < 0
              ? "Shortage"
              : "Overage";
          return { ...rec, countedQty: value, discrepancy, status };
        }
        return rec;
      })
    );
  };

  const handleDateChange = (id: number, value: string) => {
    setCounts((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, dateCounted: value } : rec))
    );
  };

  const handleCounterChange = (id: number, value: string) => {
    setCounts((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, countedBy: value } : rec))
    );
  };

  const handleAddRow = () => {
    const newId = counts.length ? Math.max(...counts.map((c) => c.id)) + 1 : 1;
    const today = new Date().toISOString().slice(0, 10);
    const newRec: CountRecord = {
      id: newId,
      sku: "",
      recordedQty: 0,
      countedQty: 0,
      discrepancy: 0,
      dateCounted: today,
      countedBy: "",
      warehouse: "",
      qty: "",
      status: "Match",
      remarks: "",
      posted: "N",
    };
    setCounts((prev) => [...prev, newRec]);
  };

  const filtered = counts.filter((rec) => {
    if (selectedWarehouse && rec.warehouse !== selectedWarehouse) return false;
    if (
      filterCounter &&
      !rec.countedBy.toLowerCase().includes(filterCounter.toLowerCase())
    )
      return false;
    return true;
  });

  const handlePostClick = () => {
    if (window.confirm("Post selected physical counts to inventory?"))
      console.log("Confirmed physical count post");
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Physical Count</h1>
        <p className={styles.pageSubtitle}>Inventory adjustment by count</p>
      </header>

      {/* Filters & Post */}
      <div className={styles.searchContainer}>
        <input
          list="warehouses"
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className={styles.searchInput}
          style={{ width: 200 }}
          placeholder="Select or Type Warehouse"
        />
        <datalist id="warehouses">
          {warehouseOptions.map((w) => (
            <option key={w} value={w} />
          ))}
        </datalist>

        <input
          type="text"
          value={filterCounter}
          onChange={(e) => setFilterCounter(e.target.value)}
          className={styles.searchInput}
          placeholder="Counted by"
        />

        <button className={styles.postButton} onClick={handlePostClick}>
          <Send size={16} /> Post
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Recorded Qty</th>
            <th>Actual Count</th>
            <th>Discrepancy</th>
            <th>Qty</th>
            <th>Date Counted</th>
            <th>Counted By</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((rec) => (
            <tr key={rec.id} className={styles.row}>
              <td>
                <input
                  list="sku-list"
                  className={styles.commentInput}
                  value={rec.sku}
                  onChange={(e) =>
                    setCounts((prev) =>
                      prev.map((r) =>
                        r.id === rec.id ? { ...r, sku: e.target.value } : r
                      )
                    )
                  }
                />
                <datalist id="sku-list">
                  {sampleCounts.map((s) => (
                    <option key={s.id} value={s.sku} />
                  ))}
                </datalist>
              </td>
              <td className={styles.numericCell}>{rec.recordedQty}</td>
              <td>
                <input
                  type="number"
                  className={styles.commentInput}
                  value={rec.countedQty}
                  onChange={(e) =>
                    handleCountChange(rec.id, Number(e.target.value))
                  }
                  disabled={rec.posted === "Y"}
                  style={{ width: 60 }}
                />
              </td>
              <td
                className={styles.numericCell}
                style={{ color: rec.discrepancy < 0 ? "red" : "inherit" }}
              >
                {rec.discrepancy}
              </td>
              <td>{rec.qty}</td>
              <td>
                <input
                  type="date"
                  value={rec.dateCounted}
                  onChange={(e) => handleDateChange(rec.id, e.target.value)}
                  className={styles.commentInput}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.commentInput}
                  value={rec.countedBy}
                  onChange={(e) => handleCounterChange(rec.id, e.target.value)}
                  placeholder="Name"
                />
              </td>
              <td className={rec.status !== "Match" ? styles.statusAlert : ""}>
                {rec.status}
              </td>
              <td>
                <input
                  type="text"
                  className={styles.commentInput}
                  value={rec.remarks}
                  onChange={(e) => handleRemarksChange(rec.id, e.target.value)}
                  disabled={rec.posted === "Y"}
                  placeholder="Enter remarks"
                />
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                No count records found. Please consult Admin.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Professional Add Row */}
      <button
        className={styles.addButton}
        onClick={handleAddRow}
        style={{ marginTop: "1rem" }}
      >
        <Plus size={16} /> Add Row
      </button>
    </div>
  );
}
