import { useState } from "react";
import styles from "./sss-settings.module.scss";
import { Pencil, Trash2, Save, XCircle, Plus } from "lucide-react";

interface SSSMatrix {
  id: string;
  minSalary: number;
  maxSalary: number;
  employeeShare: number;
  employerShare: number;
  total: number;
  effectivityDate: string;
  remarks?: string;
}

export default function SSSMatrixSettings() {
  const [data, setData] = useState<SSSMatrix[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<Partial<SSSMatrix>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SSSMatrix
  ) => {
    setNewRow((prev) => ({
      ...prev,
      [field]:
        field === "total" ? parseFloat(e.target.value) || 0 : e.target.value,
    }));
  };

  const handleAdd = () => {
    if (
      !newRow.minSalary ||
      !newRow.maxSalary ||
      !newRow.employeeShare ||
      !newRow.employerShare ||
      !newRow.total ||
      !newRow.effectivityDate
    )
      return;
    const entry: SSSMatrix = {
      id: crypto.randomUUID(),
      minSalary: Number(newRow.minSalary),
      maxSalary: Number(newRow.maxSalary),
      employeeShare: Number(newRow.employeeShare),
      employerShare: Number(newRow.employerShare),
      total: Number(newRow.total),
      effectivityDate: newRow.effectivityDate,
      remarks: newRow.remarks || "",
    };
    setData((prev) => [...prev, entry]);
    setNewRow({});
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewRow(data[index]);
  };

  const handleSave = () => {
    if (editingIndex === null) return;
    const updated = [...data];
    updated[editingIndex] = {
      ...updated[editingIndex],
      ...newRow,
      minSalary: Number(newRow.minSalary),
      maxSalary: Number(newRow.maxSalary),
      employeeShare: Number(newRow.employeeShare),
      employerShare: Number(newRow.employerShare),
      total: Number(newRow.total),
    };
    setData(updated);
    setEditingIndex(null);
    setNewRow({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setNewRow({});
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>SSS Contribution Matrix</h2>
      <p className={styles.subtitle}>
        Define salary ranges and SSS contribution breakdowns
      </p>

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
          {data.map((row, index) => (
            <tr key={row.id}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      type="number"
                      value={newRow.minSalary ?? ""}
                      onChange={(e) => handleChange(e, "minSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newRow.maxSalary ?? ""}
                      onChange={(e) => handleChange(e, "maxSalary")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newRow.employeeShare ?? ""}
                      onChange={(e) => handleChange(e, "employeeShare")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newRow.employerShare ?? ""}
                      onChange={(e) => handleChange(e, "employerShare")}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newRow.total ?? ""}
                      onChange={(e) => handleChange(e, "total")}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={newRow.effectivityDate ?? ""}
                      onChange={(e) => handleChange(e, "effectivityDate")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newRow.remarks ?? ""}
                      onChange={(e) => handleChange(e, "remarks")}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>
                      <Save size={16} />
                    </button>
                    <button onClick={handleCancel}>
                      <XCircle size={16} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.minSalary}</td>
                  <td>{row.maxSalary}</td>
                  <td>{row.employeeShare}</td>
                  <td>{row.employerShare}</td>
                  <td>{row.total}</td>
                  <td>{row.effectivityDate}</td>
                  <td>{row.remarks}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(row.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.actionsBottom}>
        <button onClick={handleAdd} className={styles.addButton}>
          <Plus size={16} /> Add Entry
        </button>
      </div>
    </div>
  );
}
