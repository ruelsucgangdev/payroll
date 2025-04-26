"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { fetchUnits, saveUnit, deleteUnit } from "@/services/units-service";
import ConfirmationModal from "../ConfirmationModal";
import styles from "./UnitsOfMeasure.module.scss";

type Unit = {
  id: string;
  name: string;
  abbreviation: string;
};

export default function UnitsOfMeasure() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [editData, setEditData] = useState<Partial<Unit>>({});
  const [errors, setErrors] = useState<{
    name?: string;
    abbreviation?: string;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Unit | null>(null);

  useEffect(() => {
    loadUnits();
  }, []);

  async function loadUnits() {
    try {
      const data = await fetchUnits();
      setUnits(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (unit: Unit) => {
    if (editingId) return;
    setEditingId(unit.id);
    setEditData({ ...unit });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  const handleSave = async () => {
    const newErrors: { name?: string; abbreviation?: string } = {};

    if (!editData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!editData.abbreviation?.trim()) {
      newErrors.abbreviation = "Abbreviation is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await saveUnit(editData as Unit);
      await loadUnits();
      setEditingId(null);
      setEditData({});
      setErrors({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    if (editingId) return;
    const newUnit: Unit = {
      id: crypto.randomUUID(),
      name: "",
      abbreviation: "",
    };
    setUnits((prev) => [newUnit, ...prev]);
    setEditingId(newUnit.id);
    setEditData({ ...newUnit });
    setErrors({});
  };

  const handleDelete = (unit: Unit) => {
    setItemToDelete(unit);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteUnit(itemToDelete.id);
      await loadUnits();
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const filtered = units.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.abbreviation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Units of Measure</h1>
        <p className={styles.pageSubtitle}>Define measurement units</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or abbreviation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button
          className={styles.addButtonTop}
          onClick={handleAdd}
          disabled={!!editingId}
        >
          <Plus size={16} /> Add Unit
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name*</th>
              <th>Abbreviation*</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const isEditing = editingId === u.id;
              return (
                <tr
                  key={u.id}
                  className={`${styles.row} ${
                    isEditing ? styles.editingRow : ""
                  }`}
                >
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.name || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className={styles.inputCell}
                        />
                        {errors.name && (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {errors.name}
                          </div>
                        )}
                      </>
                    ) : (
                      u.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.abbreviation || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              abbreviation: e.target.value,
                            })
                          }
                          className={styles.inputCell}
                        />
                        {errors.abbreviation && (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {errors.abbreviation}
                          </div>
                        )}
                      </>
                    ) : (
                      u.abbreviation
                    )}
                  </td>
                  <td className={styles.actionsCell}>
                    {isEditing ? (
                      <>
                        <button
                          className={styles.iconButton}
                          onClick={handleSave}
                        >
                          <Save size={16} />
                        </button>
                        <button
                          className={styles.iconButton}
                          onClick={handleCancel}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleEdit(u)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleDelete(u)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No units found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.bottomAddContainer}>
          <button
            className={styles.addButtonBottom}
            onClick={handleAdd}
            disabled={!!editingId}
          >
            <Plus size={16} /> Add Unit
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Unit"
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
