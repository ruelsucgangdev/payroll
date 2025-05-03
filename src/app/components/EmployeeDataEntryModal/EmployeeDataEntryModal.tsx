"use client";

import { useState } from "react";
import { UserCog } from "lucide-react";
import ConfirmationModal from "../ConfirmationModal";
import styles from "./EmployeeDataEntryModal.module.scss";

type Mode = "add" | "edit" | "view";

interface EmployeeData {
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
}

interface Props {
  mode: Mode;
  initialData?: Partial<EmployeeData>;
  onSave?: (data: EmployeeData) => void;
  onClose: () => void;
}

export default function EmployeeDataEntryModal({
  mode,
  initialData = {},
  onSave,
  onClose,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isView = mode === "view";

  // helper: extract YYYY-MM-DD from ISO string
  const formatDate = (iso?: string) => (iso ? iso.split("T")[0] : "");

  const handleSubmit = () => {
    if (onSave) {
      const data: EmployeeData = {
        employeeNo: (document.getElementById("employeeNo") as HTMLInputElement)
          .value,
        lastName: (document.getElementById("lastName") as HTMLInputElement)
          .value,
        firstName: (document.getElementById("firstName") as HTMLInputElement)
          .value,
        gender: (document.getElementById("gender") as HTMLSelectElement).value,
        dateOfBirth: (
          document.getElementById("dateOfBirth") as HTMLInputElement
        ).value,
        age: Number((document.getElementById("age") as HTMLInputElement).value),
        contactNumber: (
          document.getElementById("contactNumber") as HTMLInputElement
        ).value,
        address: (document.getElementById("address") as HTMLInputElement).value,
        dateHired: (document.getElementById("dateHired") as HTMLInputElement)
          .value,
        sss: (document.getElementById("sss") as HTMLInputElement).value,
        tin: (document.getElementById("tin") as HTMLInputElement).value,
        pagibig: (document.getElementById("pagibig") as HTMLInputElement).value,
        philhealth: (document.getElementById("philhealth") as HTMLInputElement)
          .value,
        status: (document.getElementById("status") as HTMLSelectElement).value,
      };
      onSave(data);
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalHeader}>
          <UserCog size={20} />
          {isView
            ? "View Employee Details"
            : mode === "edit"
            ? "Edit Employee Information"
            : "Add New Employee"}
        </h2>

        <div className={styles.formGrid}>
          <input
            id="employeeNo"
            placeholder="Employee No."
            defaultValue={initialData.employeeNo || ""}
            disabled={isView}
          />
          <input
            id="lastName"
            placeholder="Last Name"
            defaultValue={initialData.lastName || ""}
            disabled={isView}
          />
          <input
            id="firstName"
            placeholder="First Name"
            defaultValue={initialData.firstName || ""}
            disabled={isView}
          />

          <select
            id="gender"
            defaultValue={initialData.gender || ""}
            disabled={isView}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            id="dateOfBirth"
            type="date"
            defaultValue={formatDate(initialData.dateOfBirth)}
            disabled={isView}
          />

          <input
            id="age"
            type="number"
            placeholder="Age"
            defaultValue={initialData.age?.toString() || ""}
            disabled={isView}
          />

          <input
            id="contactNumber"
            placeholder="Contact Number"
            defaultValue={initialData.contactNumber || ""}
            disabled={isView}
          />
          <input
            id="address"
            placeholder="Address"
            defaultValue={initialData.address || ""}
            disabled={isView}
          />

          <input
            id="dateHired"
            type="date"
            defaultValue={formatDate(initialData.dateHired)}
            disabled={isView}
          />

          <input
            id="sss"
            placeholder="SSS"
            defaultValue={initialData.sss || ""}
            disabled={isView}
          />
          <input
            id="tin"
            placeholder="TIN"
            defaultValue={initialData.tin || ""}
            disabled={isView}
          />
          <input
            id="pagibig"
            placeholder="Pag-IBIG"
            defaultValue={initialData.pagibig || ""}
            disabled={isView}
          />
          <input
            id="philhealth"
            placeholder="PhilHealth"
            defaultValue={initialData.philhealth || ""}
            disabled={isView}
          />

          <select
            id="status"
            defaultValue={initialData.status || "Active"}
            disabled={isView}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.modalActions}>
          {!isView && (
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          )}
          <button
            className={styles.primaryBtn}
            onClick={() => (isView ? onClose() : setShowConfirm(true))}
          >
            {isView ? "Close" : mode === "edit" ? "Update" : "Save"}
          </button>
        </div>

        {!isView && (
          <ConfirmationModal
            isOpen={showConfirm}
            title={mode === "edit" ? "Confirm Update" : "Confirm Save"}
            message={
              mode === "edit"
                ? "Are you sure you want to update this record?"
                : "Are you sure you want to save this record?"
            }
            confirmLabel={mode === "edit" ? "Update" : "Save"}
            cancelLabel="Cancel"
            type={mode === "edit" ? "update" : "save"}
            onConfirm={handleSubmit}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
