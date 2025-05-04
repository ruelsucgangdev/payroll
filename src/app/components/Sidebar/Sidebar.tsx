"use client";

import { useState } from "react";
import {
  Home,
  FileText,
  Users,
  Clock,
  Settings,
  Menu,
  Briefcase,
  ChevronDown,
  ChevronRight,
  FileCog,
  UserCog,
  ListChecks,
  ClipboardList,
} from "lucide-react";
import styles from "./Sidebar.module.scss";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  width: number;
  onToggle: () => void;
  onSelect: (key: string) => void;
  activeKey: string;
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <Home size={16} color="white" />,
  },
  {
    key: "payroll",
    label: "Payroll",
    icon: <FileText size={16} color="white" />,
    subItems: [
      {
        key: "generate-payroll",
        label: "Generate Payroll",
        icon: <FileText size={16} color="white" />,
      },
      {
        key: "payslip",
        label: "Payslip",
        icon: <FileText size={16} color="white" />,
      },
      {
        key: "payroll-reports",
        label: "Reports",
        icon: <FileText size={16} color="white" />,
      },
    ],
  },
  {
    key: "employee",
    label: "Employee",
    icon: <Users size={16} color="white" />,
    subItems: [
      {
        key: "employee-masterfile",
        label: "Masterfile",
        icon: <UserCog size={16} color="white" />,
      },
      {
        key: "employee-loans",
        label: "Loans",
        icon: <UserCog size={16} color="white" />,
      },
      {
        key: "employee-deductions",
        label: "Deductions",
        icon: <ListChecks size={16} color="white" />,
      },
      {
        key: "leave-management",
        label: "Leave Management",
        icon: <ClipboardList size={16} color="white" />,
      },
    ],
  },
  {
    key: "timekeeping",
    label: "Timekeeping",
    icon: <Clock size={16} color="white" />,
    subItems: [
      {
        key: "attendance",
        label: "Attendance",
        icon: <Clock size={16} color="white" />,
      },
      {
        key: "schedules",
        label: "Schedules",
        icon: <Clock size={16} color="white" />,
      },
    ],
  },
  {
    key: "system",
    label: "System",
    icon: <Settings size={16} color="white" />,
    subItems: [
      {
        key: "user-accounts",
        label: "User Accounts",
        icon: <Settings size={16} color="white" />,
      },
      {
        key: "deduction-settings",
        label: "Deduction Settings",
        icon: <FileCog size={16} color="white" />,
      },
    ],
  },
];

export default function Sidebar({
  collapsed,
  width,
  onToggle,
  onSelect,
  activeKey,
}: SidebarProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <aside
      className={styles.sidebar}
      style={{ width: collapsed ? "60px" : `${width}px` }}
    >
      {/* <div className={styles.sidebarHeader}>
        <button className={styles.toggleBtn} onClick={onToggle}>
          <Menu size={20} color="white" />
        </button>
        {!collapsed && (
          <div className={styles.brandWrapper}>
            <Briefcase
              size={20}
              color="white"
              style={{ marginRight: "10px", marginTop: "4px" }}
            />
            <span
              className={styles.brand}
              style={{ paddingTop: "4px", fontWeight: "bold" }}
            >
              Payroll Management System
            </span>
          </div>
        )}
      </div> */}

      <div
        className={styles.sidebarHeader}
        style={{
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          className={styles.toggleBtn}
          onClick={onToggle}
          style={{
            marginRight: "12px",
            background: "transparent",
            border: "none",
          }}
        >
          <Menu size={24} color="white" />
        </button>
        {!collapsed && (
          <div
            className={styles.brandWrapper}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Briefcase size={20} color="white" style={{ marginRight: "8px" }} />
            <span
              className={styles.brand}
              style={{ fontWeight: "bold", color: "white" }}
            >
              Payroll Management System
            </span>
          </div>
        )}
      </div>

      <hr className={styles.menuDivider} />

      {menuItems.map((item) => (
        <div key={item.key} className={styles.menuGroup}>
          {item.subItems ? (
            <>
              <div
                className={styles.menuParent}
                onClick={() => toggleOpen(item.key)}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
                {!collapsed &&
                  (openKeys.includes(item.key) ? (
                    <ChevronDown size={14} color="white" />
                  ) : (
                    <ChevronRight size={14} color="white" />
                  ))}
              </div>
              {!collapsed && openKeys.includes(item.key) && (
                <div className={styles.subMenu}>
                  {item.subItems.map((sub) => (
                    <div
                      key={sub.key}
                      className={`${styles.menuItem} ${
                        activeKey === sub.key ? styles.active : ""
                      }`}
                      onClick={() => onSelect(sub.key)}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              className={`${styles.menuItem} ${
                activeKey === item.key ? styles.active : ""
              }`}
              onClick={() => onSelect(item.key)}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
