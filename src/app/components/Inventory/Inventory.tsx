"use client";

import { Fragment, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Plus,
} from "lucide-react";
import styles from "./Inventory.module.scss";

type DetailItem = {
  id: string;
  sku: string;
  uom: string;
  quantity: number;
  sellingPrice: number;
  sourceDoc: string;
  condition:
    | "Stacked"
    | "Sold"
    | "Restocked"
    | "Refunded"
    | "Rejected"
    | "Transferred-In"
    | "Transferred-Out"
    | "Case-Break"
    | "Case-Pack";
  remarks: string;
};

type MasterItem = {
  id: string;
  category: string;
  productCode: string;
  productName: string;
  description: string;
  warehouse: string;
  details: DetailItem[];
};

const sampleData: MasterItem[] = [
  // 1) Sony Resistor (pcs only)
  {
    id: crypto.randomUUID(),
    category: "Component",
    productCode: "SONY-RES",
    productName: "Sony Resistor",
    description: "10Ω resistor",
    warehouse: "Warehouse A",
    details: [
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: 10,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Stacked",
        remarks: "PO",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: -5,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: 2,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Returned",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: -3,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: 4,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From WH B",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: -2,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To WH C",
      },
      {
        id: crypto.randomUUID(),
        sku: "SONY-RES",
        uom: "pcs",
        quantity: 4,
        sellingPrice: 12.5,
        sourceDoc: "...",
        condition: "Refunded",
        remarks: "Cash Refunded",
      },
    ],
  },

  // 2) Sinandomeng Rice (sack ↔ kg)
  {
    id: crypto.randomUUID(),
    category: "Food",
    productCode: "RICE-SANDMG",
    productName: "Sinandomeng Rice",
    description: "Davao rice",
    warehouse: "Main Depot",
    details: [
      // Sack level
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: 100,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Stacked",
        remarks: "PO",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: -20,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: 5,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Restocked",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: -2,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: 10,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From Storage B",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: -5,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To Store C",
      },

      // Case-Break: sack → kg
      {
        id: crypto.randomUUID(),
        sku: "RICE-KG",
        uom: "kg",
        quantity: -100,
        sellingPrice: 25,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Manual] kg → sack",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: 2,
        sellingPrice: 1600,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto Generated]",
      },

      // KG level
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "kg",
        quantity: -100,
        sellingPrice: 35,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "kg",
        quantity: 50,
        sellingPrice: 35,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Restocked",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "kg",
        quantity: -20,
        sellingPrice: 35,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "kg",
        quantity: 75,
        sellingPrice: 35,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From Storage B",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "kg",
        quantity: -30,
        sellingPrice: 35,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To Store C",
      },

      // Case-Pack: kg → sack
      {
        id: crypto.randomUUID(),
        sku: "RICE-SACK",
        uom: "sack",
        quantity: -1,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Case-Break",
        remarks: "[Manual] sack → kg",
      },
      {
        id: crypto.randomUUID(),
        sku: "RICE-KG",
        uom: "kg",
        quantity: 50,
        sellingPrice: 1500,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto Generated]",
      },
      // mag input ako ng galing sa supplier.. 150 kilos na bigas..
      {
        id: crypto.randomUUID(),
        sku: "RICE-KG",
        uom: "kg",
        quantity: 150,
        sellingPrice: 25,
        sourceDoc: "...",
        condition: "Stacked",
        remarks: "PO",
      },
      // mag post ako ng POS.. ipo-post ko na may bumli na ng 10 kilos na bigas
      {
        id: crypto.randomUUID(),
        sku: "RICE-KG",
        uom: "kg",
        quantity: -10,
        sellingPrice: 25,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
    ],
  },

  // 3) Marlboro Red Box (box ↔ pack ↔ pcs)
  {
    id: crypto.randomUUID(),
    category: "Tobacco",
    productCode: "CIG-BOX",
    productName: "Marlboro Red Box",
    description: "Imported from New Zealand",
    warehouse: "Warehouse C",
    details: [
      // Box level
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: 15,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Stacked",
        remarks: "PO",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: -5,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: 2,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Returned",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: -3,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: 4,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From Store B",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: -2,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To Outlet D",
      },

      // Case-Break: box → pack
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "box",
        quantity: -1,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Case-Break",
        remarks: "[Manual] box → packs",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: 20,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto-Generated] pack → box",
      },

      // Pack level
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: -5,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: 2,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Returned",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: -1,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: 3,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From Warehouse C",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: -1,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To Retailer A",
      },

      // Case-Pack: pack → box
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: -20,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Manual ]pack → box",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-BOX",
        uom: "pack",
        quantity: 1,
        sellingPrice: 800,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto Generated]",
      },

      // Case-Break: pack → pcs
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: -1,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Case-Break",
        remarks: "[Manual] pack → pcs",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: 12,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto Generated]",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: -12,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Manual] pcs - pack",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PACK",
        uom: "pack",
        quantity: 1,
        sellingPrice: 40,
        sourceDoc: "...",
        condition: "Case-Pack",
        remarks: "[Auto Generated]",
      },

      // PCS level
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: -50,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: 10,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Restocked",
        remarks: "Returned",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: -5,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Rejected",
        remarks: "Damaged",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: 20,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Transferred-In",
        remarks: "From Sub-Depot",
      },
      {
        id: crypto.randomUUID(),
        sku: "CIG-PCS",
        uom: "pcs",
        quantity: -8,
        sellingPrice: 2,
        sourceDoc: "...",
        condition: "Transferred-Out",
        remarks: "To Kiosk #5",
      },
    ],
  },

  // 4) Widget Case (case ↔ pcs)
  {
    id: crypto.randomUUID(),
    category: "Accessory",
    productCode: "WGT-CASE",
    productName: "Widget Case",
    description: "Plastic case for widgets",
    warehouse: "Warehouse B",
    details: [
      // Case level
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: 50,
        sellingPrice: 75,
        sourceDoc: "TI-4001",
        condition: "Transferred-In",
        remarks: "From WH A",
      },
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: -10,
        sellingPrice: 75,
        sourceDoc: "TO-4002",
        condition: "Transferred-Out",
        remarks: "To WH C",
      },
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: -20,
        sellingPrice: 75,
        sourceDoc: "POS-4003",
        condition: "Sold",
        remarks: "POS",
      },
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: 5,
        sellingPrice: 75,
        sourceDoc: "RET-4004",
        condition: "Restocked",
        remarks: "Returned",
      },
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: -3,
        sellingPrice: 75,
        sourceDoc: "REJ-4005",
        condition: "Rejected",
        remarks: "Damaged",
      },

      // Case-Break: case → pcs (1 case = 10 pcs)
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: -1,
        sellingPrice: 75,
        sourceDoc: "CONV-CASE2PCS",
        condition: "Case-Break",
        remarks: "case → pcs",
      },
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE-PCS",
        uom: "pcs",
        quantity: 10,
        sellingPrice: 10,
        sourceDoc: "CONV-PCS2CASE",
        condition: "Case-Pack",
        remarks: "pcs → case",
      },

      // Case-Pack: pcs → case
      {
        id: crypto.randomUUID(),
        sku: "WGT-CASE",
        uom: "case",
        quantity: 1,
        sellingPrice: 75,
        sourceDoc: "CONV-PCS2CASE",
        condition: "Case-Pack",
        remarks: "pcs → case",
      },
    ],
  },
];

export default function Inventory() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    sku: "",
    productCode: "",
    productName: "",
    search: "",
  });
  const [sortKey, setSortKey] = useState<keyof MasterItem | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSort = (key: keyof MasterItem) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleRow = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id)! : next.add(id);
      return next;
    });

  const allExpanded = expandedIds.size === sampleData.length;
  const toggleAll = () =>
    setExpandedIds(
      allExpanded ? new Set() : new Set(sampleData.map((m) => m.id))
    );

  let data = sampleData.filter((m) => {
    const bySKU = m.details.some((d) =>
      d.sku.toLowerCase().includes(filters.sku.toLowerCase())
    );
    const byCode = m.productCode
      .toLowerCase()
      .includes(filters.productCode.toLowerCase());
    const byName = m.productName
      .toLowerCase()
      .includes(filters.productName.toLowerCase());
    const bySearch =
      m.category.toLowerCase().includes(filters.search.toLowerCase()) ||
      m.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      m.warehouse.toLowerCase().includes(filters.search.toLowerCase());
    return bySKU && byCode && byName && bySearch;
  });

  if (sortKey) {
    data.sort((a, b) => {
      const aVal = a[sortKey] as string;
      const bVal = b[sortKey] as string;
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Inventory</h1>
          <p className={styles.pageSubtitle}>Master‑detail view</p>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onClick={toggleAll}
            className={styles.iconButton}
            title={allExpanded ? "Collapse All" : "Expand All"}
          >
            {allExpanded ? <ChevronsUp /> : <ChevronsDown />}
          </button>
          <button className={styles.addButton}>
            <Plus /> Add Product
          </button>
        </div>
      </header>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by SKU"
          value={filters.sku}
          onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Product Code"
          value={filters.productCode}
          onChange={(e) =>
            setFilters({ ...filters, productCode: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Filter by Product Name"
          value={filters.productName}
          onChange={(e) =>
            setFilters({ ...filters, productName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th onClick={() => toggleSort("category")}>Category</th>
            <th onClick={() => toggleSort("productCode")}>Product Code</th>
            <th onClick={() => toggleSort("productName")}>Product Name</th>
            <th onClick={() => toggleSort("description")}>Description</th>
            <th onClick={() => toggleSort("warehouse")}>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((master) => {
            const open = expandedIds.has(master.id);
            const skuTotals = master.details.reduce((acc, d) => {
              acc[d.sku] = (acc[d.sku] || 0) + d.quantity;
              return acc;
            }, {} as Record<string, number>);

            return (
              <Fragment key={master.id}>
                <tr
                  className={styles.row}
                  onClick={() => toggleRow(master.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{open ? <ChevronDown /> : <ChevronRight />}</td>
                  <td>{master.category}</td>
                  <td>{master.productCode}</td>
                  <td>{master.productName}</td>
                  <td>{master.description}</td>
                  <td>{master.warehouse}</td>
                </tr>
                {open && (
                  <tr>
                    <td colSpan={6}>
                      <table
                        className={`${styles.table} ${styles.nestedTable}`}
                      >
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>UOM</th>
                            <th>Quantity</th>
                            <th>Selling Price</th>
                            <th>Source Doc</th>
                            <th>Condition</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {master.details.map((detail) => {
                            const isPositive = detail.quantity >= 0;
                            return (
                              <tr key={detail.id} className={styles.row}>
                                <td>{detail.sku}</td>
                                <td>{detail.uom}</td>
                                <td
                                  className={
                                    isPositive
                                      ? styles.positiveQty
                                      : styles.negativeQty
                                  }
                                >
                                  {detail.quantity}
                                </td>
                                <td>₱{detail.sellingPrice.toFixed(2)}</td>
                                <td>{detail.sourceDoc}</td>
                                <td
                                  className={`${styles.statusCell} ${
                                    isPositive
                                      ? styles.statusPositive
                                      : styles.statusNegative
                                  }`}
                                >
                                  {detail.condition}
                                </td>
                                <td>{detail.remarks}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className={styles.detailSummary}>
                        {Object.entries(skuTotals).map(([sku, total]) => (
                          <div key={sku} className={styles.summaryRow}>
                            <span>{sku} Total:</span>
                            <span
                              className={
                                total >= 0
                                  ? styles.summaryPositive
                                  : styles.summaryNegative
                              }
                            >
                              {total}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <div className={styles.legend}>
        {[
          ["  [ Positive Qty ]", styles.legendColorStacked],
          ["  [ Negative Qty ]", styles.legendColorSold],
        ].map(([label, cls]) => (
          <div key={label} className={styles.legendItem}>
            <span className={cls as string} />
            <span style={{ paddingLeft: "5px" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
