"use client";

import { Fragment, useState } from "react";
import {
  CheckSquare,
  XSquare,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import styles from "./SalesManager.module.scss";

type SaleDetail = {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type SaleMaster = {
  id: number;
  orNumber: string;
  customerName: string;
  date: string;
  totalAmount: number;
  details: SaleDetail[];
  checked: boolean;
};

const sampleData: SaleMaster[] = Array.from({ length: 10 }, (_, i) => {
  const details: SaleDetail[] = Array.from({ length: 3 + (i % 3) }, (_, j) => {
    const qty = Math.floor(Math.random() * 5) + 1;
    const price = parseFloat((Math.random() * 200 + 20).toFixed(2));
    return {
      id: `${i}-${j}`,
      sku: `SKU-${i + 1}-${j + 1}`,
      productName: `Product ${j + 1}`,
      quantity: qty,
      unitPrice: price,
      lineTotal: parseFloat((qty * price).toFixed(2)),
    };
  });
  return {
    id: i + 1,
    orNumber: `OR-${202504}${String(i + 1).padStart(2, "0")}`,
    customerName: `Customer ${i + 1}`,
    date: `2025-04-${String(10 + i).padStart(2, "0")}`,
    totalAmount: details.reduce((sum, d) => sum + d.lineTotal, 0),
    details,
    checked: false,
  };
});

export default function SalesPOSManager() {
  const [records, setRecords] = useState<SaleMaster[]>(sampleData);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const allChecked = records.every((r) => r.checked);
  const anyChecked = records.some((r) => r.checked);

  const toggleSelectAll = () =>
    setRecords((prev) => prev.map((r) => ({ ...r, checked: !allChecked })));
  const toggleCheck = (id: number) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };
  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const handlePost = () => {
    if (!anyChecked) return;
    if (
      window.confirm("Post selected sales? They will be removed from the list.")
    ) {
      setRecords((prev) => prev.filter((r) => !r.checked));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Sales Posting</h1>
          <p className={styles.pageSubtitle}>List and post customer sales</p>
        </div>
        <div className={styles.headerButtons}>
          <button
            onClick={toggleSelectAll}
            className={styles.batchButton}
            disabled={records.length === 0}
          >
            <CheckSquare size={16} />{" "}
            {allChecked ? "Deselect All" : "Select All"}
          </button>
          <button
            onClick={handlePost}
            className={`${styles.batchButton} ${styles.postButton}`}
            disabled={!anyChecked}
          >
            <Send size={16} /> Post Selected
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleSelectAll}
              />
            </th>
            <th>OR Number</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((r) => {
            const isOpen = expanded.has(r.id);
            return (
              <Fragment key={r.id}>
                <tr
                  className={styles.row}
                  onClick={() => toggleExpand(r.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={r.checked}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheck(r.id);
                      }}
                    />
                  </td>
                  <td>{r.orNumber}</td>
                  <td>{r.customerName}</td>
                  <td>{r.date}</td>
                  <td className={styles.numeric}>
                    ₱{r.totalAmount.toFixed(2)}
                  </td>
                  <td className={styles.expandCell}>
                    {isOpen ? <ChevronDown /> : <ChevronRight />}
                  </td>
                </tr>
                {isOpen && (
                  <tr>
                    <td colSpan={6}>
                      <table
                        className={`${styles.table} ${styles.nestedTable}`}
                      >
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Line Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.details.map((d) => (
                            <tr key={d.id} className={styles.row}>
                              <td>{d.sku}</td>
                              <td>{d.productName}</td>
                              <td className={styles.numeric}>{d.quantity}</td>
                              <td className={styles.numeric}>
                                ₱{d.unitPrice.toFixed(2)}
                              </td>
                              <td
                                className={styles.numeric}
                                style={{ fontWeight: "bold" }}
                              >
                                ₱{d.lineTotal.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
          {records.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                Walang sales records.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
