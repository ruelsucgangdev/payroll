"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import styles from "./Categories.module.scss";
import ConfirmationModal from "../ConfirmationModal";
import {
  deleteCategory,
  fetchCategories,
  saveCategory,
} from "@/services/categories-service";

type Category = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export default function Categories() {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editData, setEditData] = useState<Partial<Category>>({});
  const [errors, setErrors] = useState<{ code?: string; name?: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (cat: Category) => {
    if (editingId) return;
    setEditingId(cat.id);
    setEditData({ ...cat });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  const handleSave = async () => {
    const newErrors: { code?: string; name?: string } = {};

    if (!editData.code?.trim()) {
      newErrors.code = "Code is required";
    }
    if (!editData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await saveCategory(editData as Category);
      await loadCategories();
      setEditingId(null);
      setEditData({});
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    if (editingId) return;
    const newCategory: Category = {
      id: crypto.randomUUID(),
      code: "",
      name: "",
      description: "",
    };
    setCategories((prev) => [newCategory, ...prev]);
    setEditingId(newCategory.id);
    setEditData({ ...newCategory });
    setErrors({});
  };

  const handleDelete = (cat: Category) => {
    setItemToDelete(cat);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteCategory(itemToDelete.id);
      await loadCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>Categories</h1>
        <p className={styles.pageSubtitle}>Manage your product categories</p>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by code or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button
          className={styles.addButtonTop}
          onClick={handleAddCategory}
          disabled={!!editingId}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code*</th>
              <th>Name*</th>
              <th>Description</th>
              <th className={styles.actionsHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => {
              const isEditing = editingId === cat.id;
              return (
                <tr
                  key={cat.id}
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
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {errors.code}
                          </div>
                        )}
                      </>
                    ) : (
                      cat.code
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
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {errors.name}
                          </div>
                        )}
                      </>
                    ) : (
                      cat.name
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
                      cat.description
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
                          onClick={() => handleEdit(cat)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className={styles.iconButton}
                          onClick={() => handleDelete(cat)}
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
                  colSpan={4}
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.bottomAddContainer}>
          <button
            className={styles.addButtonBottom}
            onClick={handleAddCategory}
            disabled={!!editingId}
          >
            <Plus size={16} /> Add Category
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Category"
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
// import styles from "./Categories.module.scss";
// import ConfirmationModal from "../ConfirmationModal";
// import { fetchCategories, saveCategory } from "@/services/categories-service";

// type Category = {
//   id: string;
//   code: string;
//   name: string;
//   description: string;
// };

// export default function Categories() {
//   const [search, setSearch] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [editData, setEditData] = useState<Partial<Category>>({});
//   const [showModal, setShowModal] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<Category | null>(null);

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   async function loadCategories() {
//     try {
//       const data = await fetchCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const handleEdit = (cat: Category) => {
//     if (editingId) return;
//     setEditingId(cat.id);
//     setEditData({ ...cat });
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditData({});
//   };

//   const handleSave = async () => {
//     try {
//       if (!editData.code || !editData.name) {
//         alert("Code and Name are required");
//         return;
//       }
//       await saveCategory(editData as Category);
//       await loadCategories();
//       setEditingId(null);
//       setEditData({});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddCategory = () => {
//     if (editingId) return;
//     const newCategory: Category = {
//       id: crypto.randomUUID(),
//       code: "",
//       name: "",
//       description: "",
//     };
//     setCategories((prev) => [newCategory, ...prev]);
//     setEditingId(newCategory.id);
//     setEditData({ ...newCategory });
//   };

//   const handleDelete = (cat: Category) => {
//     setItemToDelete(cat);
//     setShowModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!itemToDelete) return;
//     try {
//       await deleteCategory(itemToDelete.id);
//       await loadCategories();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setShowModal(false);
//       setItemToDelete(null);
//     }
//   };

//   const filtered = categories.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.code.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <header className={styles.pageHeader}>
//         <h1>Categories</h1>
//         <p className={styles.pageSubtitle}>Manage your product categories</p>
//       </header>

//       <div className={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search by code or name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className={styles.searchInput}
//         />
//         <button className={styles.addButtonTop} onClick={handleAddCategory}>
//           <Plus size={16} /> Add Category
//         </button>
//       </div>

//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th className={styles.actionsHeader}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((cat) => {
//               const isEditing = editingId === cat.id;
//               return (
//                 <tr
//                   key={cat.id}
//                   className={`${styles.row} ${
//                     isEditing ? styles.editingRow : ""
//                   }`}
//                 >
//                   <td>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editData.code || ""}
//                         onChange={(e) =>
//                           setEditData({ ...editData, code: e.target.value })
//                         }
//                         className={styles.inputCell}
//                       />
//                     ) : (
//                       cat.code
//                     )}
//                   </td>
//                   <td>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editData.name || ""}
//                         onChange={(e) =>
//                           setEditData({ ...editData, name: e.target.value })
//                         }
//                         className={styles.inputCell}
//                       />
//                     ) : (
//                       cat.name
//                     )}
//                   </td>
//                   <td>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editData.description || ""}
//                         onChange={(e) =>
//                           setEditData({
//                             ...editData,
//                             description: e.target.value,
//                           })
//                         }
//                         className={styles.inputCell}
//                       />
//                     ) : (
//                       cat.description
//                     )}
//                   </td>
//                   <td className={styles.actionsCell}>
//                     {isEditing ? (
//                       <>
//                         <button
//                           className={styles.iconButton}
//                           onClick={handleSave}
//                           title="Save"
//                         >
//                           <Save size={16} />
//                         </button>
//                         <button
//                           className={styles.iconButton}
//                           onClick={handleCancel}
//                           title="Cancel"
//                         >
//                           <X size={16} />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           className={styles.iconButton}
//                           onClick={() => handleEdit(cat)}
//                           title="Edit"
//                         >
//                           <Edit3 size={16} />
//                         </button>
//                         <button
//                           className={styles.iconButton}
//                           onClick={() => handleDelete(cat)}
//                           title="Delete"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//             {filtered.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   style={{ textAlign: "center", padding: "1rem" }}
//                 >
//                   No categories found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div className={styles.bottomAddContainer}>
//           <button
//             className={styles.addButtonBottom}
//             onClick={handleAddCategory}
//           >
//             <Plus size={16} /> Add Category
//           </button>
//         </div>
//       </div>

//       <ConfirmationModal
//         isOpen={showModal}
//         title="Delete Category"
//         message={`Are you sure you want to delete category "${itemToDelete?.name}"?`}
//         onConfirm={confirmDelete}
//         onCancel={() => setShowModal(false)}
//       />
//     </div>
//   );
// }
// function deleteCategory(id: string) {
//   throw new Error("Function not implemented.");
// }
