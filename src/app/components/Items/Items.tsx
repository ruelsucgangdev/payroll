"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import styles from "./items.module.scss";
import ConfirmationModal from "../ConfirmationModal";
import { fetchItems, saveItem, deleteItem } from "@/services/items-service";
import { fetchCategories } from "@/services/categories-service";

type Category = {
  id: string;
  code: string;
  name: string;
};

type Item = {
  id: string;
  productCode: string;
  categoryId: string;
  sku: string;
  productName: string;
  description: string;
};

export default function ItemMaster() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editData, setEditData] = useState<Partial<Item>>({});
  const [errors, setErrors] = useState<{
    productCode?: string;
    sku?: string;
    productName?: string;
    categoryId?: string;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  async function loadItems() {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (item: Item) => {
    if (editingId) return;
    setEditingId(item.id);
    setEditData({ ...item });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  const handleSave = async () => {
    const newErrors: {
      productCode?: string;
      sku?: string;
      productName?: string;
      categoryId?: string;
    } = {};

    if (!editData.productCode?.trim())
      newErrors.productCode = "Product Code is required";
    if (!editData.sku?.trim()) newErrors.sku = "SKU is required";
    if (!editData.productName?.trim())
      newErrors.productName = "Product Name is required";
    if (!editData.categoryId?.trim())
      newErrors.categoryId = "Category is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await saveItem(editData as Item);
      await loadItems();
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = () => {
    if (editingId) return;
    const newItem: Item = {
      id: crypto.randomUUID(),
      productCode: "",
      categoryId: "",
      sku: "",
      productName: "",
      description: "",
    };
    setItems((prev) => [newItem, ...prev]);
    setEditingId(newItem.id);
    setEditData({ ...newItem });
    setErrors({});
  };

  const handleDelete = (item: Item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteItem(itemToDelete.id);
      await loadItems();
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const filtered = items.filter((i) =>
    [i.productCode, i.sku, i.productName].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.code || category.name : "";
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Item Master</h1>
        <p className={styles.pageSubtitle}>Manage your products/items</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by product code, SKU, or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button
          className={styles.addButtonTop}
          onClick={handleAddItem}
          disabled={!!editingId}
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU*</th>
              <th>Category*</th>
              <th>Product Code*</th>
              <th>Product Name*</th>
              <th>Description</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <tr
                  key={item.id}
                  className={`${styles.row} ${
                    isEditing ? styles.editingRow : ""
                  }`}
                >
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.sku || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, sku: e.target.value })
                          }
                          className={styles.inputCell}
                        />
                        {errors.sku && (
                          <div className={styles.errorText}>{errors.sku}</div>
                        )}
                      </>
                    ) : (
                      item.sku
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <select
                          value={editData.categoryId || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              categoryId: e.target.value,
                            })
                          }
                          className={styles.selectCell}
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.code || c.name}
                            </option>
                          ))}
                        </select>
                        {errors.categoryId && (
                          <div className={styles.errorText}>
                            {errors.categoryId}
                          </div>
                        )}
                      </>
                    ) : (
                      getCategoryName(item.categoryId)
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.productCode || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              productCode: e.target.value,
                            })
                          }
                          className={styles.inputCell}
                        />
                        {errors.productCode && (
                          <div className={styles.errorText}>
                            {errors.productCode}
                          </div>
                        )}
                      </>
                    ) : (
                      item.productCode
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.productName || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              productName: e.target.value,
                            })
                          }
                          className={styles.inputCell}
                        />
                        {errors.productName && (
                          <div className={styles.errorText}>
                            {errors.productName}
                          </div>
                        )}
                      </>
                    ) : (
                      item.productName
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        className={styles.inputCell}
                      />
                    ) : (
                      item.description
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
                          onClick={() => handleEdit(item)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleDelete(item)}
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
                  colSpan={6}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.bottomAddContainer}>
          <button
            className={styles.addButtonBottom}
            onClick={handleAddItem}
            disabled={!!editingId}
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Item"
        message={`Are you sure you want to delete "${itemToDelete?.productName}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
