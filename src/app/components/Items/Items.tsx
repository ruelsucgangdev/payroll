"use client";

import { Fragment, useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Save, X, Eye } from "lucide-react";
import styles from "./items.module.scss";
import ConfirmationModal from "../ConfirmationModal";
import { fetchItems, saveItem, deleteItem } from "@/services/items-service";
import { fetchCategories } from "@/services/categories-service";
import { fetchUnits } from "@/services/units-service";

type Category = {
  id: string;
  code: string;
  name: string;
};

type Unit = {
  id: string;
  name: string;
  abbreviation: string;
};

type Item = {
  id: string;
  productCode: string;
  categoryId: string;
  sku: string;
  productName: string;
  description: string;
};

type Conversion = {
  id: string;
  productCode: string;
  fromUnitId: string;
  toUnitId: string;
  quantity: string;
};

export default function ItemMaster() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [editData, setEditData] = useState<Partial<Item>>({});
  const [errors, setErrors] = useState<{
    productCode?: string;
    sku?: string;
    productName?: string;
    categoryId?: string;
  }>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [conversionRows, setConversionRows] = useState<{
    [parentId: string]: Conversion[];
  }>({});
  const [convEditing, setConvEditing] = useState<{
    parentId: string | null;
    convId: string | null;
  }>({ parentId: null, convId: null });
  const [convEditData, setConvEditData] = useState<Partial<Conversion>>({});
  const [convErrors, setConvErrors] = useState<{
    fromUnitId?: string;
    toUnitId?: string;
    quantity?: string;
  }>({});
  useEffect(() => {
    loadItems();
    loadCategories();
    loadUnits();
  }, []);

  async function loadItems() {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadUnits() {
    try {
      const data = await fetchUnits();
      setUnits(data);
    } catch (e) {
      console.error(e);
    }
  }

  const handleEdit = (item: Item) => {
    if (editingId || expandedRow) return;
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
    const newErr: typeof errors = {};
    if (!editData.productCode?.trim())
      newErr.productCode = "Product Code is required";
    if (!editData.sku?.trim()) newErr.sku = "SKU is required";
    if (!editData.productName?.trim())
      newErr.productName = "Product Name is required";
    if (!editData.categoryId?.trim())
      newErr.categoryId = "Category is required";
    setErrors(newErr);
    if (Object.keys(newErr).length) return;

    try {
      await saveItem(editData as Item);
      await loadItems();
      setEditingId(null);
      setEditData({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = () => {
    if (editingId || expandedRow) return;
    const newItem: Item = {
      id: crypto.randomUUID(),
      productCode: "",
      categoryId: "",
      sku: "",
      productName: "",
      description: "",
    };
    setItems((p) => [newItem, ...p]);
    setEditingId(newItem.id);
    setEditData({ ...newItem });
    setErrors({});
  };

  const handleDelete = (item: Item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteItem(itemToDelete.id);
      await loadItems();
    } catch (e) {
      console.error(e);
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleToggleExpand = (item: Item) => {
    if (editingId) return;
    const pid = item.id;
    if (expandedRow === pid) {
      setExpandedRow(null);
    } else {
      setExpandedRow(pid);
      setConversionRows((p) => ({
        ...p,
        [pid]: p[pid] || [],
      }));
    }
    setConvEditing({ parentId: null, convId: null });
  };

  const handleAddConversion = (parentId: string) => {
    if (convEditing.parentId) return;
    const newConv: Conversion = {
      id: crypto.randomUUID(),
      productCode: "",
      fromUnitId: "",
      toUnitId: "",
      quantity: "",
    };
    setConversionRows((p) => ({
      ...p,
      [parentId]: [newConv, ...(p[parentId] || [])],
    }));
    setConvEditing({ parentId, convId: newConv.id });
    setConvEditData(newConv);
    setConvErrors({});
  };

  const handleConvEdit = (parentId: string, conv: Conversion) => {
    if (convEditing.parentId) return;
    setConvEditing({ parentId, convId: conv.id });
    setConvEditData({ ...conv });
    setConvErrors({});
  };

  const handleConvCancel = () => {
    const { parentId, convId } = convEditing;
    if (parentId && convId) {
      const isNew =
        conversionRows[parentId].find((c) => c.id === convId)?.productCode ===
        "";
      if (isNew) {
        setConversionRows((p) => ({
          ...p,
          [parentId]: p[parentId].filter((c) => c.id !== convId),
        }));
      }
    }
    setConvEditing({ parentId: null, convId: null });
    setConvEditData({});
    setConvErrors({});
  };

  const handleConvSave = (parentId: string) => {
    const e: typeof convErrors = {};
    if (!convEditData.fromUnitId) e.fromUnitId = "Select UOM";
    if (!convEditData.toUnitId) e.toUnitId = "Select UOM";
    if (!convEditData.quantity?.trim()) e.quantity = "Required";
    setConvErrors(e);
    if (Object.keys(e).length) return;

    setConversionRows((p) => ({
      ...p,
      [parentId]: p[parentId].map((c) =>
        c.id === convEditing.convId ? { ...c, ...convEditData } : c
      ),
    }));
    setConvEditing({ parentId: null, convId: null });
    setConvEditData({});
    setConvErrors({});
  };

  const handleConvDelete = (parentId: string, convId: string) => {
    if (convEditing.parentId === parentId && convEditing.convId === convId)
      return;
    setConversionRows((p) => ({
      ...p,
      [parentId]: p[parentId].filter((c) => c.id !== convId),
    }));
  };

  const filtered = items.filter((i) =>
    [i.productCode, i.sku, i.productName].some((f) =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const getCategoryName = (cid: string) =>
    categories.find((c) => c.id === cid)?.code || "";
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
          disabled={!!editingId || !!expandedRow}
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
              const isExpanded = expandedRow === item.id;

              return (
                <Fragment key={item.id}>
                  {/* Parent row */}
                  <tr
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
                              setEditData((d) => ({
                                ...d,
                                sku: e.target.value,
                              }))
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
                              setEditData((d) => ({
                                ...d,
                                categoryId: e.target.value,
                              }))
                            }
                            className={styles.selectCell}
                          >
                            <option value="">-- Select Category --</option>
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.code}
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
                              setEditData((d) => ({
                                ...d,
                                productCode: e.target.value,
                              }))
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
                              setEditData((d) => ({
                                ...d,
                                productName: e.target.value,
                              }))
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
                            setEditData((d) => ({
                              ...d,
                              description: e.target.value,
                            }))
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
                            onClick={() => handleToggleExpand(item)}
                          >
                            <Eye size={16} />
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

                  {/* Child row for conversions */}
                  {isExpanded && (
                    <tr className={styles.childRow}>
                      <td colSpan={6}>
                        <table className={styles.childTable}>
                          <thead>
                            <tr>
                              <th>Product Code</th>
                              <th>From UOM</th>
                              <th>To UOM</th>
                              <th>Quantity</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(conversionRows[item.id] || []).map((conv) => {
                              const isConvEditing =
                                convEditing.parentId === item.id &&
                                convEditing.convId === conv.id;
                              return (
                                <tr key={conv.id}>
                                  <td>
                                    {/* Child Product Code label only, bold */}
                                    <span
                                      className={styles.childProductCodeLabel}
                                    >
                                      {item.productCode}
                                    </span>
                                  </td>
                                  <td>
                                    {isConvEditing ? (
                                      <select
                                        value={convEditData.fromUnitId || ""}
                                        onChange={(e) =>
                                          setConvEditData((d) => ({
                                            ...d,
                                            fromUnitId: e.target.value,
                                          }))
                                        }
                                        className={styles.selectCell}
                                      >
                                        <option value="">-- Select --</option>
                                        {units.map((u) => (
                                          <option key={u.id} value={u.id}>
                                            {u.abbreviation || u.name}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      units.find(
                                        (u) => u.id === conv.fromUnitId
                                      )?.abbreviation || ""
                                    )}
                                  </td>
                                  <td>
                                    {isConvEditing ? (
                                      <select
                                        value={convEditData.toUnitId || ""}
                                        onChange={(e) =>
                                          setConvEditData((d) => ({
                                            ...d,
                                            toUnitId: e.target.value,
                                          }))
                                        }
                                        className={styles.selectCell}
                                      >
                                        <option value="">-- Select --</option>
                                        {units.map((u) => (
                                          <option key={u.id} value={u.id}>
                                            {u.abbreviation || u.name}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      units.find((u) => u.id === conv.toUnitId)
                                        ?.abbreviation || ""
                                    )}
                                  </td>
                                  <td>
                                    {isConvEditing ? (
                                      <input
                                        type="text"
                                        value={convEditData.quantity || ""}
                                        onChange={(e) =>
                                          setConvEditData((d) => ({
                                            ...d,
                                            quantity: e.target.value,
                                          }))
                                        }
                                        className={styles.inputCell}
                                      />
                                    ) : (
                                      conv.quantity
                                    )}
                                  </td>
                                  <td>
                                    {isConvEditing ? (
                                      <>
                                        <button
                                          className={styles.iconButton}
                                          onClick={() =>
                                            handleConvSave(item.id)
                                          }
                                        >
                                          <Save size={16} />
                                        </button>
                                        <button
                                          className={styles.iconButton}
                                          onClick={handleConvCancel}
                                        >
                                          <X size={16} />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          className={styles.iconButton}
                                          onClick={() =>
                                            handleConvEdit(item.id, conv)
                                          }
                                        >
                                          <Edit3 size={16} />
                                        </button>
                                        <button
                                          className={styles.iconButton}
                                          onClick={() =>
                                            handleConvDelete(item.id, conv.id)
                                          }
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <button
                          className={styles.addConversionButton}
                          onClick={() => handleAddConversion(item.id)}
                        >
                          + Add Conversion
                        </button>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Item"
        message={`Are you sure you want to delete "${itemToDelete?.productName}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
