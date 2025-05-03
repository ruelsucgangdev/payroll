"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, UserCircle } from "lucide-react";
import styles from "./EmployeeMasterFile.module.scss";
import EmployeeDataEntryModal from "./EmployeeDataEntryModal";
import ConfirmationModal from "../ConfirmationModal";

type Employee = {
  id: string;
  employeeNo: string;
  lastName: string;
  firstName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  contactNumber: string;
  address: string;
  dateHired: string;
  sss: string;
  tin: string;
  pagibig: string;
  philhealth: string;
  status: string;
};

export default function EmployeeMasterFile() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: crypto.randomUUID(),
      employeeNo: "EMP-001",
      lastName: "Reyes",
      firstName: "Juan",
      gender: "Male",
      dateOfBirth: "1990-01-01",
      age: 33,
      contactNumber: "09171234567",
      address: "123 Street",
      dateHired: "2022-08-15",
      sss: "1234567",
      tin: "123-456-789",
      pagibig: "1234567890",
      philhealth: "9876543210",
      status: "Active",
    },
  ]);

  const handleEdit = (emp: Employee) => {
    setModalMode("edit");
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  const filtered = employees.filter(
    (emp) =>
      emp.employeeNo.toLowerCase().includes(search.toLowerCase()) ||
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <UserCircle size={24} color="white" /> Employee Master File
        </h1>
        <p className={styles.subtitle}>
          Centralized list of all employee records
        </p>
      </header>

      <div className={styles.searchSection}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBox}
        />
      </div>

      <button
        className={styles.addButton}
        onClick={() => {
          setModalMode("add");
          setSelectedEmployee(null);
          setShowModal(true);
        }}
      >
        <Plus size={16} color="white" /> Add Employee
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee No.</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date Hired</th>
            <th>TIN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeNo}</td>
              <td>{emp.lastName}</td>
              <td>{emp.firstName}</td>
              <td>{emp.dateHired}</td>
              <td>{emp.tin}</td>
              <td className={styles.actionsCell}>
                <button onClick={() => handleEdit(emp)} title="Edit">
                  <Pencil size={16} color="white" />
                </button>
                <button
                  onClick={() => {
                    setToDeleteId(emp.id);
                    setShowConfirm(true);
                  }}
                  title="Delete"
                >
                  <Trash2 size={16} color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <EmployeeDataEntryModal
          onClose={() => setShowModal(false)}
          mode={modalMode}
          initialData={selectedEmployee || undefined}
          onSave={(data) => {
            if (modalMode === "add") {
              setEmployees((prev) => [
                ...prev,
                { id: crypto.randomUUID(), ...data },
              ]);
            } else {
              setEmployees((prev) =>
                prev.map((emp) =>
                  emp.id === selectedEmployee?.id ? { ...emp, ...data } : emp
                )
              );
            }
            setShowModal(false);
          }}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this employee?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        type="delete"
        onConfirm={() => {
          if (toDeleteId) {
            setEmployees((prev) => prev.filter((emp) => emp.id !== toDeleteId));
            setToDeleteId(null);
          }
          setShowConfirm(false);
        }}
        onCancel={() => {
          setToDeleteId(null);
          setShowConfirm(false);
        }}
      />
    </div>
  );
}
