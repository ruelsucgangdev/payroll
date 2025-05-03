"use client";

import { useState } from "react";
import styles from "./EmployeeDataEntryModal.module.scss";
import { UserCog } from "lucide-react";
import ConfirmationModal from "../ConfirmationModal";

type Props = {
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: any;
  onSave: (data: any) => void;
};

export default function EmployeeDataEntryModal({
  onClose,
  mode,
  initialData,
  onSave,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    const data = {
      employeeNo: (document.getElementById("employeeNo") as HTMLInputElement)
        .value,
      lastName: (document.getElementById("lastName") as HTMLInputElement).value,
      firstName: (document.getElementById("firstName") as HTMLInputElement)
        .value,
      gender: (document.getElementById("gender") as HTMLSelectElement).value,
      dateOfBirth: (document.getElementById("dateOfBirth") as HTMLInputElement)
        .value,
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
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <UserCog size={20} />{" "}
          {mode === "edit" ? "Edit Employee Information" : "Add Employee"}
        </h2>

        <div className={styles.formGrid}>
          <input
            id="employeeNo"
            placeholder="Employee No."
            defaultValue={initialData?.employeeNo || ""}
          />
          <input
            id="lastName"
            placeholder="Last Name"
            defaultValue={initialData?.lastName || ""}
          />
          <input
            id="firstName"
            placeholder="First Name"
            defaultValue={initialData?.firstName || ""}
          />
          <select id="gender" defaultValue={initialData?.gender || ""}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            id="dateOfBirth"
            type="date"
            defaultValue={initialData?.dateOfBirth || ""}
          />
          <input
            id="age"
            type="number"
            placeholder="Age"
            defaultValue={initialData?.age || ""}
          />
          <input
            id="contactNumber"
            placeholder="Contact Number"
            defaultValue={initialData?.contactNumber || ""}
          />
          <input
            id="address"
            placeholder="Address"
            defaultValue={initialData?.address || ""}
          />
          <input
            id="dateHired"
            type="date"
            defaultValue={initialData?.dateHired || ""}
          />
          <input
            id="sss"
            placeholder="SSS"
            defaultValue={initialData?.sss || ""}
          />
          <input
            id="tin"
            placeholder="TIN"
            defaultValue={initialData?.tin || ""}
          />
          <input
            id="pagibig"
            placeholder="Pag-IBIG"
            defaultValue={initialData?.pagibig || ""}
          />
          <input
            id="philhealth"
            placeholder="PhilHealth"
            defaultValue={initialData?.philhealth || ""}
          />
          <select id="status" defaultValue={initialData?.status || "Active"}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => setShowConfirm(true)}>
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>

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
      </div>
    </div>
  );
}
