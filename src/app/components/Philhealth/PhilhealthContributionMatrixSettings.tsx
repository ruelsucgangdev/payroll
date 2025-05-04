"use client";

import { useState, useMemo } from "react";
import styles from "./philhealth-contribution-settings.module.scss";
import { Plus, Pencil, Trash2, Save, XCircle, Table } from "lucide-react";

interface PhilhealthContributionMatrix {
  id: string;
  minSalary: number;
  maxSalary: number;
  salaryBase: number;
  employeeShare: number;
  employerShare: number;
  effectivityDate: string;
  remarks?: string;
  isNew?: boolean;
}

export default function PhilhealthContributionMatrixSettings() {
  const [data, setData] = useState<PhilhealthContributionMatrix[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    minSalary: "",
    maxSalary: "",
    effectivityDate: "",
    remarks: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof PhilhealthContributionMatrix
  ) => {
    const updated = [...data];
    const value = parseFloat(e.target.value) || 0;
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof PhilhealthContributionMatrix
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setData(updated);
  };

  const handleAdd = () => {
    const newEntry: PhilhealthContributionMatrix = {
      id: crypto.randomUUID(),
      minSalary: 10000,
      maxSalary: 59999.99,
      salaryBase: 45000,
      employeeShare: 225,
      employerShare: 225,
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
      item.minSalary.toString().includes(filters.minSalary) &&
      item.maxSalary.toString().includes(filters.maxSalary) &&
      (filters.effectivityDate === "" ||
        item.effectivityDate === filters.effectivityDate) &&
      (item.remarks || "").toLowerCase().includes(filters.remarks.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Table size={24} color="white" /> PhilHealth Contribution Matrix
        </h1>
        <p className={styles.subtitle}>
          Define bracket-based PhilHealth contributions
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
            <th>Salary Base</th>
            <th>Employee Share</th>
            <th>Employer Share</th>
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
                      value={row.minSalary}
                      onChange={(e) => handleFieldChange(e, index, "minSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.maxSalary}
                      onChange={(e) => handleFieldChange(e, index, "maxSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.salaryBase}
                      onChange={(e) =>
                        handleFieldChange(e, index, "salaryBase")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.employeeShare}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employeeShare")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.employerShare}
                      onChange={(e) =>
                        handleFieldChange(e, index, "employerShare")
                      }
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
                  <td>{row.minSalary.toLocaleString()}</td>
                  <td>{row.maxSalary.toLocaleString()}</td>
                  <td>{row.salaryBase.toLocaleString()}</td>
                  <td>{row.employeeShare.toFixed(2)}</td>
                  <td>{row.employerShare.toFixed(2)}</td>
                  <td>{row.effectivityDate}</td>
                  <td>{row.remarks}</td>
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
