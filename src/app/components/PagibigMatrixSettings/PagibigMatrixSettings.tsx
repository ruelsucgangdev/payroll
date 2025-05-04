// src/components/PagibigMatrix/PagibigMatrixSettings.tsx
"use client";

import { useState, useMemo } from "react";
import styles from "./pagibig-settings.module.scss";
import { Plus, Pencil, Trash2, Save, XCircle, Table } from "lucide-react";

interface PagibigMatrix {
  id: string;
  rateType: string;
  employeeRate: number;
  employerRate: number;
  rateCap: number;
  effectivityDate: string;
  remarks?: string;
  isNew?: boolean;
}

export default function PagibigMatrixSettings() {
  const [data, setData] = useState<PagibigMatrix[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    rateType: "",
    employeeRate: "",
    employerRate: "",
    effectivityDate: "",
    remarks: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof PagibigMatrix
  ) => {
    const updated = [...data];
    const value = parseFloat(e.target.value) || 0;
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof PagibigMatrix
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setData(updated);
  };

  const handleAdd = () => {
    const newEntry: PagibigMatrix = {
      id: crypto.randomUUID(),
      rateType: "PERCENT",
      employeeRate: 2,
      employerRate: 2,
      rateCap: 5000,
      effectivityDate: new Date().toISOString().slice(0, 10),
      remarks: "",
      isNew: true,
    };
    setData((prev) => [...prev, newEntry]);
    setEditingIndex(data.length);
  };

  const handleSave = (index: number) => {
    const updated = [...data];
    delete updated[index].isNew;
    setData(updated);
    setEditingIndex(null);
  };

  const handleCancel = (index: number) => {
    const updated = [...data];
    if (updated[index].isNew) {
      updated.splice(index, 1);
    }
    setData(updated);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const uniqueEffectivityDates = useMemo(() => {
    const distinct = Array.from(
      new Set(data.map((d) => d.effectivityDate).filter(Boolean))
    );
    return distinct.sort((a, b) => (a < b ? 1 : -1));
  }, [data]);

  const filteredData = data.filter((item) => {
    return (
      item.rateType.toLowerCase().includes(filters.rateType.toLowerCase()) &&
      item.employeeRate.toString().includes(filters.employeeRate) &&
      item.employerRate.toString().includes(filters.employerRate) &&
      (filters.effectivityDate === "" ||
        item.effectivityDate === filters.effectivityDate) &&
      (item.remarks || "").toLowerCase().includes(filters.remarks.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Table size={24} color="white" /> Pag-IBIG Contribution Rate Config
        </h1>
        <p className={styles.subtitle}>
          Define rate-based Pag-IBIG contributions
        </p>
      </header>

      <div className={styles.searchSection}>
        <select
          value={filters.rateType}
          onChange={(e) => setFilters({ ...filters, rateType: e.target.value })}
        >
          <option value="">-- Rate Type --</option>
          <option value="PERCENT">PERCENT</option>
          <option value="FIXED">FIXED</option>
        </select>
        <input
          type="text"
          placeholder="Employee Rate"
          value={filters.employeeRate}
          onChange={(e) =>
            setFilters({ ...filters, employeeRate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Employer Rate"
          value={filters.employerRate}
          onChange={(e) =>
            setFilters({ ...filters, employerRate: e.target.value })
          }
        />
        <select
          value={filters.effectivityDate}
          onChange={(e) =>
            setFilters({ ...filters, effectivityDate: e.target.value })
          }
        >
          <option value="">-- Effectivity Date --</option>
          {uniqueEffectivityDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Remarks"
          value={filters.remarks}
          onChange={(e) => setFilters({ ...filters, remarks: e.target.value })}
        />
      </div>

      <button onClick={handleAdd} className={styles.addButton}>
        <Plus size={16} /> Add Entry
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rate Type</th>
            <th>Employee Rate</th>
            <th>Employer Rate</th>
            <th>Cap</th>
            <th>Effectivity Date</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={row.id}>
              {editingIndex === index ? (
                <>
                  <td>
                    <select
                      value={row.rateType}
                      onChange={(e) => handleTextChange(e, index, "rateType")}
                    >
                      <option value="PERCENT">PERCENT</option>
                      <option value="FIXED">FIXED</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.employeeRate}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employeeRate")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.employerRate}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employerRate")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.rateCap}
                      onChange={(e) => handleFieldChange(e, index, "rateCap")}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={row.effectivityDate}
                      onChange={(e) =>
                        handleTextChange(e, index, "effectivityDate")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) => handleTextChange(e, index, "remarks")}
                    />
                  </td>
                  <td className={styles.actionColumn}>
                    <button onClick={() => handleSave(index)}>
                      <Save size={16} color="white" />
                    </button>
                    <button onClick={() => handleCancel(index)}>
                      <XCircle size={16} color="white" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.rateType}</td>
                  <td className={styles.shareColumn}>{row.employeeRate}%</td>
                  <td className={styles.shareColumn}>{row.employerRate}%</td>
                  <td className={styles.salaryColumn}>
                    {row.rateCap.toLocaleString()}
                  </td>
                  <td className={styles.dateColumn}>{row.effectivityDate}</td>
                  <td className={styles.remarksColumn}>{row.remarks}</td>
                  <td className={styles.actionColumn}>
                    <button onClick={() => handleEdit(index)}>
                      <Pencil size={16} color="white" />
                    </button>
                    <button onClick={() => handleDelete(row.id)}>
                      <Trash2 size={16} color="white" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
