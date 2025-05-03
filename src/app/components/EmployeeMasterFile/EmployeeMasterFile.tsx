"use client";

import { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employee-service";
import { Pencil, Trash2, Plus, UserCircle } from "lucide-react";
import styles from "./EmployeeMasterFile.module.scss";
import EmployeeDataEntryModal from "./EmployeeDataEntryModal";
import ConfirmationModal from "../ConfirmationModal";

type Employee = {
  id: string;
  employeeNumber: string;
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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  // load on mount
  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.error);
  }, []);

  const openAdd = () => {
    setModalMode("add");
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const openEdit = (emp: Employee) => {
    setModalMode("edit");
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === "add") {
      createEmployee(data).then((newEmp) => {
        setEmployees((prev) => [...prev, newEmp]);
      });
    } else if (modalMode === "edit" && selectedEmployee) {
      updateEmployee(selectedEmployee.id, data).then((upd) => {
        setEmployees((prev) => prev.map((e) => (e.id === upd.id ? upd : e)));
      });
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (!toDeleteId) return;
    deleteEmployee(toDeleteId).then(() => {
      setEmployees((prev) => prev.filter((e) => e.id !== toDeleteId));
      setToDeleteId(null);
      setShowConfirm(false);
    });
  };

  const filtered = employees.filter(
    (emp) =>
      emp.employeeNumber.toLowerCase().includes(search.toLowerCase()) ||
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <UserCircle size={24} /> Employee Master File
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

      <button onClick={openAdd} className={styles.addButton}>
        <Plus size={16} /> Add Employee
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
              <td>{emp.employeeNumber}</td>
              <td>{emp.lastName}</td>
              <td>{emp.firstName}</td>
              <td>{emp.dateHired}</td>
              <td>{emp.tin}</td>
              <td className={styles.actionsCell}>
                <button onClick={() => openEdit(emp)} title="Edit">
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
          mode={modalMode}
          initialData={selectedEmployee || undefined}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title="Confirm Delete"
          message="Are you sure you want to delete this employee?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          type="delete"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
