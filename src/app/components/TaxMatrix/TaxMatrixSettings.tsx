"use client";

import { useState, useMemo } from "react";
import styles from "./tax-settings.module.scss"; // imported same style as SSS
import { Plus, Pencil, Trash2, Save, XCircle, Table } from "lucide-react";

interface TaxMatrix {
  id: string;
  minSalary: number;
  maxSalary: number;
  baseTax: number;
  percentOver: number;
  effectivityDate: string;
  remarks?: string;
  isNew?: boolean;
}

export default function TaxMatrixSettings() {
  const [data, setData] = useState<TaxMatrix[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    minSalary: "",
    maxSalary: "",
    baseTax: "",
    percentOver: "",
    effectivityDate: "",
    remarks: "",
  });

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof TaxMatrix
  ) => {
    const updated = [...data];
    const value = parseFloat(e.target.value) || 0;
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof TaxMatrix
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setData(updated);
  };

  const handleAdd = () => {
    const newEntry: TaxMatrix = {
      id: crypto.randomUUID(),
      minSalary: 0,
      maxSalary: 0,
      baseTax: 0,
      percentOver: 0,
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
      item.baseTax.toString().includes(filters.baseTax) &&
      item.percentOver.toString().includes(filters.percentOver) &&
      (filters.effectivityDate === "" ||
        item.effectivityDate === filters.effectivityDate) &&
      (item.remarks || "").toLowerCase().includes(filters.remarks.toLowerCase())
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Table size={24} color="white" /> Tax Withholding Matrix
        </h1>
        <p className={styles.subtitle}>
          Define tax brackets and computation rules
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
          placeholder="Base Tax"
          value={filters.baseTax}
          onChange={(e) => setFilters({ ...filters, baseTax: e.target.value })}
        />
        <input
          type="text"
          placeholder="% Over"
          value={filters.percentOver}
          onChange={(e) =>
            setFilters({ ...filters, percentOver: e.target.value })
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
            <th>Base Tax</th>
            <th>% Over</th>
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
                      value={row.baseTax}
                      onChange={(e) => handleFieldChange(e, index, "baseTax")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={row.percentOver}
                      onChange={(e) =>
                        handleFieldChange(e, index, "percentOver")
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
                  <td>
                    <button onClick={() => handleSave(index)}>
                      <Save
                        size={16}
                        color="white"
                        style={{ background: "transparent" }}
                      />
                    </button>
                    <button onClick={() => handleCancel(index)}>
                      <XCircle
                        size={16}
                        color="white"
                        style={{ background: "transparent" }}
                      />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.minSalary.toLocaleString()}</td>
                  <td>{row.maxSalary.toLocaleString()}</td>
                  <td>{row.baseTax.toLocaleString()}</td>
                  <td>{row.percentOver}%</td>
                  <td>{row.effectivityDate}</td>
                  <td>{row.remarks}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>
                      <Pencil
                        size={16}
                        color="white"
                        style={{ background: "transparent" }}
                      />
                    </button>
                    <button onClick={() => handleDelete(row.id)}>
                      <Trash2
                        size={16}
                        color="white"
                        style={{ background: "transparent" }}
                      />
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
