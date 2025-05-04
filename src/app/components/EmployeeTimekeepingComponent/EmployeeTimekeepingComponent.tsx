// components/EmployeeTimekeepingComponent.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./employee-timekeeping.module.scss";
import { Pencil, Save, Trash2, XCircle, ListPlus, Eye } from "lucide-react";

interface ChildLog {
  id: string;
  date: string;
  timeIn: string;
  timeOut: string;
  source: "FIXED" | "ROLE-BASED";
  role: string;
  rate: number;
  rateType: string;
  hoursWorked: number;
}

interface TimekeepingEntry {
  id: string;
  employeeId: string;
  employeeNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  basicSalary: number;
  workSchedule: string;
  payrollPeriod: string;
  remarks?: string;
  childLogs: ChildLog[];
  isExpanded?: boolean;
}

const sampleEmployees = [
  {
    employeeId: "emp001",
    employeeNumber: "111",
    lastName: "Dela Cruz",
    firstName: "Juan",
    middleName: "M.",
    basicSalary: 12312,
    workSchedule: "8am to 5pm",
  },
  {
    employeeId: "emp002",
    employeeNumber: "112",
    lastName: "Reyes",
    firstName: "Ana",
    middleName: "L.",
    basicSalary: 15000,
    workSchedule: "6am to 3:30pm",
  },
  {
    employeeId: "emp003",
    employeeNumber: "113",
    lastName: "Garcia",
    firstName: "Pedro",
    middleName: "G.",
    basicSalary: 18000,
    workSchedule: "7pm to 4am",
  },
  {
    employeeId: "emp004",
    employeeNumber: "114",
    lastName: "Santos",
    firstName: "Maria",
    middleName: "C.",
    basicSalary: 17500,
    workSchedule: "8am to 5pm",
  },
  {
    employeeId: "emp005",
    employeeNumber: "115",
    lastName: "Torres",
    firstName: "Luis",
    middleName: "D.",
    basicSalary: 16000,
    workSchedule: "6am to 3:30pm",
  },
];

function computeHours(timeIn: string, timeOut: string): number {
  if (!timeIn || !timeOut) return 0;
  const [inH, inM] = timeIn.split(":").map(Number);
  const [outH, outM] = timeOut.split(":").map(Number);
  let start = inH * 60 + inM;
  let end = outH * 60 + outM;
  if (end < start) end += 24 * 60;
  return parseFloat(((end - start) / 60).toFixed(2));
}

export default function EmployeeTimekeepingComponent() {
  const [entries, setEntries] = useState<TimekeepingEntry[]>([]);

  const handleAdd = () => {
    const newEntry: TimekeepingEntry = {
      id: crypto.randomUUID(),
      employeeId: "",
      employeeNumber: "",
      lastName: "",
      firstName: "",
      middleName: "",
      basicSalary: 0,
      workSchedule: "",
      payrollPeriod: "",
      remarks: "",
      childLogs: [
        {
          id: crypto.randomUUID(),
          date: "",
          timeIn: "",
          timeOut: "",
          source: "FIXED",
          role: "",
          rate: 0,
          rateType: "PER_HOUR",
          hoursWorked: 0,
        },
      ],
      isExpanded: false,
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleFieldChange = (
    index: number,
    field: keyof TimekeepingEntry,
    value: string | number
  ) => {
    const updated = [...entries];

    if (field === "employeeNumber") {
      (updated[index] as any)[field] = value;
      const match = sampleEmployees.find((emp) => emp.employeeNumber === value);
      if (match) {
        updated[index] = {
          ...updated[index],
          employeeId: match.employeeId,
          employeeNumber: match.employeeNumber,
          lastName: match.lastName,
          firstName: match.firstName,
          middleName: match.middleName,
          basicSalary: match.basicSalary,
          workSchedule: match.workSchedule,
        };
      }
    } else {
      (updated[index] as any)[field] = value;
    }

    setEntries(updated);
  };

  const handleDeleteChildLog = (parentIndex: number, childIndex: number) => {
    const updated = [...entries];
    updated[parentIndex].childLogs.splice(childIndex, 1);
    setEntries(updated);
  };

  const handleRoleChange = (
    parentIndex: number,
    childIndex: number,
    role: string
  ) => {
    const updated = [...entries];
    updated[parentIndex].childLogs[childIndex].role = role;

    // Auto-populate rate based on role
    let rate = 0;
    switch (role) {
      case "Clerk":
        rate = 200;
        break;
      case "Supervisor":
        rate = 350;
        break;
      case "Manager":
        rate = 500;
        break;
      default:
        rate = 0;
    }
    updated[parentIndex].childLogs[childIndex].rate = rate;

    setEntries(updated);
  };

  const handleChildChange = (
    parentIndex: number,
    childIndex: number,
    field: keyof ChildLog,
    value: string | number
  ) => {
    const updated = [...entries];
    (updated[parentIndex].childLogs[childIndex] as any)[field] = value;

    const child = updated[parentIndex].childLogs[childIndex];
    if (field === "timeIn" || field === "timeOut") {
      child.hoursWorked = computeHours(child.timeIn, child.timeOut);
    }

    setEntries(updated);
  };

  const toggleExpand = (index: number) => {
    const updated = [...entries];
    updated[index].isExpanded = !updated[index].isExpanded;
    setEntries(updated);
  };

  const handleAddChildLog = (parentIndex: number) => {
    const updated = [...entries];
    if (!updated[parentIndex].isExpanded) {
      updated[parentIndex].isExpanded = true;
    }
    updated[parentIndex].childLogs.push({
      id: crypto.randomUUID(),
      date: "",
      timeIn: "",
      timeOut: "",
      source: "FIXED",
      role: "",
      rate: 0,
      rateType: "PER_HOUR",
      hoursWorked: 0,
    });
    setEntries(updated);
  };

  const handleSave = (index: number) => {
    const entry = entries[index];
    console.log("Saving full entry:", entry);
  };

  const formatNumber = (num: number) =>
    num.toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <ListPlus size={24} color="white" /> Employee Timekeeping
        </h1>
      </header>

      <button onClick={handleAdd} className={styles.addButton}>
        <ListPlus size={16} /> Add Timekeeping Entry
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee No.</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Basic Salary</th>
            <th>Work Schedule</th>
            <th>Payroll Period</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <>
              <tr key={entry.id}>
                <td>
                  <input
                    list="empList"
                    value={entry.employeeNumber}
                    onChange={(e) =>
                      handleFieldChange(i, "employeeNumber", e.target.value)
                    }
                    disabled={entry.isExpanded}
                    style={{ color: entry.isExpanded ? "white" : undefined }}
                  />
                  <datalist id="empList">
                    {sampleEmployees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeNumber} />
                    ))}
                  </datalist>
                </td>
                <td>
                  <input
                    value={entry.lastName}
                    disabled
                    style={{ color: "white" }}
                  />
                </td>
                <td>
                  <input
                    value={entry.firstName}
                    disabled
                    style={{ color: "white" }}
                  />
                </td>
                <td>
                  <input
                    value={entry.middleName}
                    disabled
                    style={{ color: "white" }}
                  />
                </td>
                <td>
                  <input
                    value={formatNumber(entry.basicSalary)}
                    readOnly
                    style={{ textAlign: "right", color: "white" }}
                  />
                </td>
                <td>
                  <input
                    value={entry.workSchedule}
                    disabled
                    style={{ color: "white" }}
                  />
                </td>
                <td>
                  <input
                    value={entry.payrollPeriod}
                    disabled={entry.isExpanded}
                    onChange={(e) =>
                      handleFieldChange(i, "payrollPeriod", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={entry.remarks}
                    disabled={entry.isExpanded}
                    onChange={(e) =>
                      handleFieldChange(i, "remarks", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleAddChildLog(i)}>
                    <ListPlus size={16} color="white" />
                  </button>
                </td>
              </tr>
              {entry.isExpanded && (
                <tr>
                  <td colSpan={9}>
                    <table className={styles.childTable}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Time In</th>
                          <th>Time Out</th>
                          <th>Source</th>
                          <th>Role</th>
                          <th>Rate</th>
                          <th>Rate Type</th>
                          <th>Hours Worked</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.childLogs.map((log, j) => (
                          <tr key={log.id}>
                            <td>
                              <input
                                type="date"
                                value={log.date}
                                onChange={(e) =>
                                  handleChildChange(
                                    i,
                                    j,
                                    "date",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="time"
                                value={log.timeIn}
                                onChange={(e) =>
                                  handleChildChange(
                                    i,
                                    j,
                                    "timeIn",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="time"
                                value={log.timeOut}
                                onChange={(e) =>
                                  handleChildChange(
                                    i,
                                    j,
                                    "timeOut",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <select
                                value={log.source}
                                onChange={(e) =>
                                  handleChildChange(
                                    i,
                                    j,
                                    "source",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="FIXED">FIXED</option>
                                <option value="ROLE-BASED">ROLE-BASED</option>
                              </select>
                            </td>
                            <td>
                              <select
                                value={log.role}
                                onChange={(e) =>
                                  handleRoleChange(i, j, e.target.value)
                                }
                              >
                                <option value="">Select Role</option>
                                <option value="Clerk">Clerk</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Manager">Manager</option>
                              </select>
                            </td>
                            <td>
                              <span className={styles.rateLabel}>
                                {formatNumber(log.rate)}
                              </span>
                            </td>
                            <td>{log.rateType}</td>
                            <td>
                              <span className={styles.hoursLabel}>
                                {formatNumber(log.hoursWorked)}
                              </span>
                            </td>

                            <td>
                              <button
                                onClick={() => handleDeleteChildLog(i, j)}
                              >
                                <Trash2 size={14} color="white" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className={styles.childActions}>
                      <button onClick={() => handleSave(i)}>
                        <Save size={14} /> Save Entry
                      </button>
                      <button onClick={() => toggleExpand(i)}>
                        <XCircle size={14} /> Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
