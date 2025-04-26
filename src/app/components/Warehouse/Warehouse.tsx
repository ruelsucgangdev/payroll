"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import styles from "./Warehouse.module.scss";
import ConfirmationModal from "../ConfirmationModal";
import {
  fetchWarehouses,
  saveWarehouse,
  deleteWarehouse,
} from "@/services/warehouse-service";

type Warehouse = {
  id: string;
  code: string;
  name: string;
  location: string;
  capacity: number;
  manager: string;
  remarks: string | null;
  status: boolean;
};

export default function Warehouse() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [editData, setEditData] = useState<Partial<Warehouse>>({});
  const [errors, setErrors] = useState<{ code?: string; name?: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Warehouse | null>(null);

  useEffect(() => {
    loadWarehouses();
  }, []);

  async function loadWarehouses() {
    try {
      const data = await fetchWarehouses();
      setWarehouses(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (wh: Warehouse) => {
    if (editingId) return;
    setEditingId(wh.id);
    setEditData({ ...wh });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  const handleSave = async () => {
    const newErrors: { code?: string; name?: string } = {};

    if (!editData.code?.trim()) newErrors.code = "Code is required";
    if (!editData.name?.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await saveWarehouse(editData as Warehouse);
      await loadWarehouses();
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWarehouse = () => {
    if (editingId) return;
    const newWarehouse: Warehouse = {
      id: crypto.randomUUID(),
      code: "",
      name: "",
      location: "",
      capacity: 0,
      manager: "",
      remarks: "",
      status: true,
    };
    setWarehouses((prev) => [newWarehouse, ...prev]);
    setEditingId(newWarehouse.id);
    setEditData({ ...newWarehouse });
    setErrors({});
  };

  const handleDelete = (wh: Warehouse) => {
    setItemToDelete(wh);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteWarehouse(itemToDelete.id);
      await loadWarehouses();
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const filtered = warehouses.filter((w) =>
    [w.code, w.name, w.location, w.manager].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Warehouses</h1>
        <p className={styles.pageSubtitle}>Manage your warehouses</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by code, name, location, manager..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button
          className={styles.addButtonTop}
          onClick={handleAddWarehouse}
          disabled={!!editingId}
        >
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code*</th>
              <th>Name*</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Manager</th>
              <th>Remarks</th>
              <th>Status</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((wh) => {
              const isEditing = editingId === wh.id;
              return (
                <tr
                  key={wh.id}
                  className={`${styles.row} ${
                    isEditing ? styles.editingRow : ""
                  }`}
                >
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.code || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, code: e.target.value })
                          }
                          className={styles.inputCell}
                        />
                        {errors.code && (
                          <div className={styles.errorText}>{errors.code}</div>
                        )}
                      </>
                    ) : (
                      wh.code
                    )}
                  </td>
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
                          <div className={styles.errorText}>{errors.name}</div>
                        )}
                      </>
                    ) : (
                      wh.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        className={styles.inputCell}
                      />
                    ) : (
                      wh.location
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.capacity?.toString() || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            capacity: Number(e.target.value),
                          })
                        }
                        className={styles.inputCell}
                      />
                    ) : (
                      wh.capacity
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.manager || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, manager: e.target.value })
                        }
                        className={styles.inputCell}
                      />
                    ) : (
                      wh.manager
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.remarks || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, remarks: e.target.value })
                        }
                        className={styles.inputCell}
                      />
                    ) : (
                      wh.remarks
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={!!editData.status}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              status: e.target.checked,
                            })
                          }
                        />
                        {editData.status ? "Active" : "Inactive"}
                      </label>
                    ) : wh.status ? (
                      "Active"
                    ) : (
                      "Inactive"
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
                          onClick={() => handleEdit(wh)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleDelete(wh)}
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
                  colSpan={8}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No warehouses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.bottomAddContainer}>
          <button
            className={styles.addButtonBottom}
            onClick={handleAddWarehouse}
            disabled={!!editingId}
          >
            <Plus size={16} /> Add Warehouse
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Warehouse"
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
