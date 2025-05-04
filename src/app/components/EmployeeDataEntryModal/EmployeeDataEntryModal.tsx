"use client";

import { useState, useEffect } from "react";
import { UserCog } from "lucide-react";
import ConfirmationModal from "../ConfirmationModal";
import styles from "./EmployeeDataEntryModal.module.scss";

import dayjs from "dayjs"; // ✅ ADD THIS
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

type Mode = "add" | "edit" | "view";

interface EmployeeData {
  employeeNo: string;
  lastName: string;
  firstName: string;
  middleName: string;
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
  isSSSMember: boolean;
  isPhilhealthMember: boolean;
  isPagibigMember: boolean;
  position: string;
  department: string;
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
  const isView = mode === "view";
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Date state with MM-DD-YYYY format
  const [dateOfBirth, setDateOfBirth] = useState(
    initialData.dateOfBirth
      ? dayjs(initialData.dateOfBirth).format("MM-DD-YYYY")
      : ""
  );
  const [dateHired, setDateHired] = useState(
    initialData.dateHired
      ? dayjs(initialData.dateHired).format("MM-DD-YYYY")
      : ""
  );

  const handleSubmit = () => {
    if (onSave) {
      const data: EmployeeData = {
        employeeNo: (document.getElementById("employeeNo") as HTMLInputElement)
          .value,
        lastName: (document.getElementById("lastName") as HTMLInputElement)
          .value,
        firstName: (document.getElementById("firstName") as HTMLInputElement)
          .value,
        middleName: (document.getElementById("middleName") as HTMLInputElement)
          .value,
        gender: (document.getElementById("gender") as HTMLSelectElement).value,
        dateOfBirth: dayjs(dateOfBirth, "MM-DD-YYYY").format("YYYY-MM-DD"),
        age: Number((document.getElementById("age") as HTMLInputElement).value),
        contactNumber: (
          document.getElementById("contactNumber") as HTMLInputElement
        ).value,
        address: (document.getElementById("address") as HTMLInputElement).value,
        dateHired: dayjs(dateHired, "MM-DD-YYYY").format("YYYY-MM-DD"),
        sss: (document.getElementById("sss") as HTMLInputElement).value,
        tin: (document.getElementById("tin") as HTMLInputElement).value,
        pagibig: (document.getElementById("pagibig") as HTMLInputElement).value,
        philhealth: (document.getElementById("philhealth") as HTMLInputElement)
          .value,
        isSSSMember: (
          document.getElementById("isSSSMember") as HTMLInputElement
        ).checked,
        isPhilhealthMember: (
          document.getElementById("isPhilhealthMember") as HTMLInputElement
        ).checked,
        isPagibigMember: (
          document.getElementById("isPagibigMember") as HTMLInputElement
        ).checked,
        status: (document.getElementById("status") as HTMLSelectElement).value,
        position: (document.getElementById("position") as HTMLInputElement)
          .value,
        department: (document.getElementById("department") as HTMLInputElement)
          .value,
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
          <label>
            Employee No.
            <input
              id="employeeNo"
              defaultValue={initialData.employeeNo || ""}
              disabled={isView}
            />
          </label>

          <div className={styles.row3}>
            <label>
              Last Name
              <input
                id="lastName"
                defaultValue={initialData.lastName || ""}
                disabled={isView}
              />
            </label>
            <label>
              First Name
              <input
                id="firstName"
                defaultValue={initialData.firstName || ""}
                disabled={isView}
              />
            </label>
            <label>
              Middle Name
              <input
                id="middleName"
                defaultValue={initialData.middleName || ""}
                disabled={isView}
              />
            </label>
          </div>

          <label>
            Gender
            <select
              id="gender"
              defaultValue={initialData.gender || ""}
              disabled={isView}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          {/* ✅ Replaced date input with CustomDatePicker */}
          <CustomDatePicker
            label="Date of Birth"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            disabled={isView}
          />

          <label>
            Age
            <input
              id="age"
              type="number"
              className={styles.smallAge}
              defaultValue={initialData.age?.toString() || "0"}
              disabled={isView}
              style={{ textAlign: "right" }}
            />
          </label>

          <label>
            Contact Number
            <input
              id="contactNumber"
              defaultValue={initialData.contactNumber || ""}
              disabled={isView}
            />
          </label>

          <label>
            Address
            <input
              id="address"
              defaultValue={initialData.address || ""}
              disabled={isView}
            />
          </label>

          <CustomDatePicker
            label="Date Hired"
            id="dateHired"
            value={dateHired}
            onChange={setDateHired}
            disabled={isView}
          />

          <label>
            SSS
            <input
              id="sss"
              defaultValue={initialData.sss || ""}
              disabled={isView}
            />
          </label>

          <label>
            TIN
            <input
              id="tin"
              defaultValue={initialData.tin || ""}
              disabled={isView}
            />
          </label>

          <label>
            Pag-IBIG
            <input
              id="pagibig"
              defaultValue={initialData.pagibig || ""}
              disabled={isView}
            />
          </label>

          <label>
            PhilHealth
            <input
              id="philhealth"
              defaultValue={initialData.philhealth || ""}
              disabled={isView}
            />
          </label>

          <label>
            Position
            <input
              id="position"
              defaultValue={initialData.position || ""}
              disabled={isView}
            />
          </label>

          <label>
            Department
            <input
              id="department"
              defaultValue={initialData.department || ""}
              disabled={isView}
            />
          </label>

          <label>
            Status
            <select
              id="status"
              defaultValue={initialData.status || "Active"}
              disabled={isView}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className={styles.checkGroup}>
          <label>
            <input
              type="checkbox"
              id="isSSSMember"
              defaultChecked={initialData.isSSSMember ?? true}
              disabled={isView}
            />
            SSS Member
          </label>

          <label>
            <input
              type="checkbox"
              id="isPhilhealthMember"
              defaultChecked={initialData.isPhilhealthMember ?? true}
              disabled={isView}
            />
            PhilHealth Member
          </label>

          <label>
            <input
              type="checkbox"
              id="isPagibigMember"
              defaultChecked={initialData.isPagibigMember ?? true}
              disabled={isView}
            />
            Pag-IBIG Member
          </label>
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
