"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./Categories.module.scss";

type Category = {
  id: string;
  name: string;
  description: string;
};

const sampleCategories: Category[] = [
  {
    id: crypto.randomUUID(),
    name: "Electronics",
    description: "Gadgets and devices",
  },
  {
    id: crypto.randomUUID(),
    name: "Stationery",
    description: "Office supplies and materials",
  },
  {
    id: crypto.randomUUID(),
    name: "Furniture",
    description: "Chairs, tables, shelves",
  },
  {
    id: crypto.randomUUID(),
    name: "Food & Beverage",
    description: "Snacks and drinks",
  },
  {
    id: crypto.randomUUID(),
    name: "Cleaning",
    description: "Detergents and tools",
  },
];

export default function Categories() {
  const [search, setSearch] = useState<string>("");

  const filtered = sampleCategories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toString().includes(search)
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Categories</h1>
        <p className={styles.pageSubtitle}>Manage your product categories</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Category List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cat) => (
            <tr key={cat.id} className={styles.row}>
              <td className={styles.idColumn}>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit Category">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete Category">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { Plus } from "lucide-react";
// import styles from "./Categories.module.scss";

// type Category = {
//   id: number;
//   name: string;
//   description: string;
// };

// const sampleCategories: Category[] = [
//   { id: 1, name: "Electronics", description: "Gadgets and devices" },
//   { id: 2, name: "Stationery", description: "Office supplies and materials" },
//   { id: 3, name: "Furniture", description: "Chairs, tables, shelves" },
//   { id: 4, name: "Food & Beverage", description: "Snacks and drinks" },
//   { id: 5, name: "Cleaning", description: "Detergents and tools" },
// ];

// export default function Categories() {
//   const [search, setSearch] = useState<string>("");

//   const filtered = sampleCategories.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.id.toString().includes(search)
//   );

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <header className={styles.pageHeader}>
//         <h1>Categories</h1>
//         <p className={styles.pageSubtitle}>Manage your product categories</p>
//       </header>

//       {/* Search & Add */}
//       <div className={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search by ID or name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className={styles.searchInput}
//         />
//         <button className={styles.addButton}>
//           <Plus size={16} /> Add Category
//         </button>
//       </div>

//       {/* Category List */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((cat) => (
//             <tr key={cat.id}>
//               <td>{cat.id}</td>
//               <td>{cat.name}</td>
//               <td>{cat.description}</td>
//             </tr>
//           ))}
//           {filtered.length === 0 && (
//             <tr>
//               <td colSpan={3} style={{ textAlign: "center", padding: "1rem" }}>
//                 No categories found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
