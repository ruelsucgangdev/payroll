"use client";

import { useState } from "react";
import { Home, Package, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./Sidebar.module.scss";

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <Home size={16} />,
  },
  {
    key: "payroll",
    label: "Payroll",
    icon: <Package size={16} />,
    subItems: [
      {
        key: "generate-payroll",
        label: "Generate Payroll",
        icon: <Package size={16} />,
      },
      { key: "payslip", label: "Payslip", icon: <Package size={16} /> },
      { key: "payroll-reports", label: "Reports", icon: <Package size={16} /> },
    ],
  },
  {
    key: "employee",
    label: "Employee",
    icon: <Package size={16} />,
    subItems: [
      {
        key: "employee-masterfile",
        label: "Masterfile",
        icon: <Package size={16} />,
      },
      { key: "employee-loans", label: "Loans", icon: <Package size={16} /> },
      {
        key: "employee-deductions",
        label: "Deductions",
        icon: <Package size={16} />,
      },
      {
        key: "leave-management",
        label: "Leave Management",
        icon: <Package size={16} />,
      },
    ],
  },
  {
    key: "timekeeping",
    label: "Timekeeping",
    icon: <Package size={16} />,
    subItems: [
      { key: "attendance", label: "Attendance", icon: <Package size={16} /> },
      { key: "schedules", label: "Schedules", icon: <Package size={16} /> },
    ],
  },
  {
    key: "system",
    label: "System",
    icon: <Package size={16} />,
    subItems: [
      {
        key: "user-accounts",
        label: "User Accounts",
        icon: <Package size={16} />,
      },
      { key: "settings", label: "Settings", icon: <Package size={16} /> },
    ],
  },
];

interface SidebarProps {
  onSelect: (key: string) => void;
  activeKey: string;
}

function Sidebar({ onSelect, activeKey }: SidebarProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderMenu = () =>
    menuItems.map((item) => {
      const isActive = activeKey === item.key;
      return (
        <div key={item.key} className={styles.menuGroup}>
          {item.subItems ? (
            <>
              <div
                className={styles.menuParent}
                onClick={() => toggleOpen(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
                {openKeys.includes(item.key) ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </div>
              {openKeys.includes(item.key) && (
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
              className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
              onClick={() => onSelect(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          )}
        </div>
      );
    });

  return <aside className={styles.sidebar}>{renderMenu()}</aside>;
}

export default Sidebar;
