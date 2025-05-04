"use client";

import { useState, useMemo } from "react";
import styles from "./sss-settings.module.scss";
import { Plus, Pencil, Trash2, Save, XCircle, Table } from "lucide-react";

interface SSSMatrix {
  id: string;
  minSalary: number;
  maxSalary: number;
  employeeShare: number;
  employerShare: number;
  total: number;
  effectivityDate: string;
  remarks?: string;
  isNew?: boolean;
}

export default function SSSMatrixSettings() {
  const [data, setData] = useState<SSSMatrix[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    minSalary: "",
    maxSalary: "",
    employeeShare: "",
    employerShare: "",
    effectivityDate: "",
    remarks: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof SSSMatrix
  ) => {
    const updated = [...data];
    const value = parseFloat(e.target.value) || 0;

    updated[index] = {
      ...updated[index],
      [field]: value,
      total:
        field === "employeeShare" || field === "employerShare"
          ? field === "employeeShare"
            ? value + updated[index].employerShare
            : updated[index].employeeShare + value
          : updated[index].total,
    };

    setData(updated);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof SSSMatrix
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: e.target.value,
    };
    setData(updated);
  };

  const handleAdd = () => {
    const newEntry: SSSMatrix = {
      id: crypto.randomUUID(),
      minSalary: 0,
      maxSalary: 0,
      employeeShare: 0,
      employerShare: 0,
      total: 0,
      effectivityDate: "",
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
      item.minSalary.toString().includes(filters.minSalary) &&
      item.maxSalary.toString().includes(filters.maxSalary) &&
      item.employeeShare.toString().includes(filters.employeeShare) &&
      item.employerShare.toString().includes(filters.employerShare) &&
      (filters.effectivityDate === "" ||
        item.effectivityDate === filters.effectivityDate) &&
      (item.remarks || "").toLowerCase().includes(filters.remarks.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Table size={24} color="white" /> SSS Contribution Matrix
        </h1>
        <p className={styles.subtitle}>
          Define salary ranges and SSS contributions
        </p>
      </header>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Min Salary"
          value={filters.minSalary}
          onChange={(e) =>
            setFilters({ ...filters, minSalary: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Max Salary"
          value={filters.maxSalary}
          onChange={(e) =>
            setFilters({ ...filters, maxSalary: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Employee Share"
          value={filters.employeeShare}
          onChange={(e) =>
            setFilters({ ...filters, employeeShare: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Employer Share"
          value={filters.employerShare}
          onChange={(e) =>
            setFilters({ ...filters, employerShare: e.target.value })
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
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Employee Share</th>
            <th>Employer Share</th>
            <th>Total</th>
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
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.minSalary}
                      onChange={(e) => handleFieldChange(e, index, "minSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.maxSalary}
                      onChange={(e) => handleFieldChange(e, index, "maxSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.employeeShare}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employeeShare")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.employerShare}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employerShare")
                      }
                    />
                  </td>
                  <td className={styles.readonlyField}>
                    {row.total.toLocaleString()}
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
                  <td>
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
                  <td className={styles.salaryColumn}>
                    {row.minSalary.toLocaleString()}
                  </td>
                  <td className={styles.salaryColumn}>
                    {row.maxSalary.toLocaleString()}
                  </td>
                  <td className={styles.shareColumn}>
                    {row.employeeShare.toLocaleString()}
                  </td>
                  <td className={styles.shareColumn}>
                    {row.employerShare.toLocaleString()}
                  </td>
                  <td className={styles.shareColumn}>
                    {row.total.toLocaleString()}
                  </td>
                  <td className={styles.dateColumn}>{row.effectivityDate}</td>
                  <td className={styles.remarksColumn}>{row.remarks}</td>
                  <td>
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
