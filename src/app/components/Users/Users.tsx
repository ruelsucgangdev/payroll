"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import styles from "./Users.module.scss";

type User = {
  id: string;
  username: string;
  fullName: string;
  role: string;
  status: "Active" | "Inactive";
};

const sampleUsers: User[] = [
  {
    id: crypto.randomUUID(),
    username: "jdoe",
    fullName: "John Doe",
    role: "Admin",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    username: "asmith",
    fullName: "Alice Smith",
    role: "Editor",
    status: "Active",
  },
  {
    id: crypto.randomUUID(),
    username: "bthompson",
    fullName: "Bob Thompson",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: crypto.randomUUID(),
    username: "cnguyen",
    fullName: "Cindy Nguyen",
    role: "Editor",
    status: "Active",
  },
];

export default function Users() {
  const [search, setSearch] = useState<string>("");
  const filtered = sampleUsers.filter((u) =>
    [
      u.id.toString(),
      u.username.toLowerCase(),
      u.fullName.toLowerCase(),
      u.role.toLowerCase(),
      u.status.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>User Administration</h1>
        <p className={styles.pageSubtitle}>Manage system users and roles</p>
      </header>

      {/* Search & Add */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by ID, username, name, role or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Users List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th className={styles.actionsHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className={styles.row}>
              <td className={styles.idColumn}>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td className={styles.actionsCell}>
                <button className={styles.iconButton} title="Edit User">
                  <Edit3 size={16} />
                </button>
                <button className={styles.iconButton} title="Delete User">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
