"use client";

import { JSX, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Package,
  Tag,
  Gift,
  Archive,
  Sliders,
  Database,
  FileText,
} from "lucide-react";
import tokens from "../tokens";

type MenuItem = {
  key: string;
  label: string;
  icon: JSX.Element;
  subItems?: Omit<MenuItem, "subItems">[];
};

const menuItems: MenuItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <Home size={16} /> },
  { key: "inventory", label: "Inventory", icon: <Package size={16} /> },
  {
    key: "discounts",
    label: "Discounts",
    icon: <Tag size={16} />,
    subItems: [
      {
        key: "regular-discounts",
        label: "Regular Discounts",
        icon: <Tag size={16} />,
      },
      { key: "as-is-items", label: "As‑Is Items", icon: <Gift size={16} /> },
    ],
  },
  {
    key: "returns",
    label: "Returns",
    icon: <Archive size={16} />,
    subItems: [
      {
        key: "damaged-returns",
        label: "Damage Returns",
        icon: <Archive size={16} />,
      },
      {
        key: "exchange",
        label: "Exchange (Wrong Item)",
        icon: <Sliders size={16} />,
      },
      { key: "cash-refund", label: "Cash Refund", icon: <Archive size={16} /> },
    ],
  },
  {
    key: "adjustments",
    label: "Adjustments",
    icon: <Sliders size={16} />,
    subItems: [
      {
        key: "physical-count",
        label: "Physical Count",
        icon: <Sliders size={16} />,
      },
    ],
  },
  {
    key: "master-files",
    label: "Master Files",
    icon: <Database size={16} />,
    subItems: [
      { key: "categories", label: "Categories", icon: <Database size={16} /> },
      {
        key: "unit-of-measure",
        label: "Unit of Measure",
        icon: <Database size={16} />,
      },
      { key: "items", label: "Item Setup", icon: <Database size={16} /> },
      {
        key: "user-admin",
        label: "User Administration",
        icon: <Database size={16} />,
      },
      { key: "warehouse", label: "Warehouse", icon: <Database size={16} /> },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    icon: <FileText size={16} />,
    subItems: [
      {
        key: "item-list",
        label: "Item List Report",
        icon: <FileText size={16} />,
      },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  width: number;
  onToggle: () => void;
  onSelect: (key: string) => void;
  activeKey: string;
}

export default function Sidebar({
  collapsed,
  width,
  onToggle,
  onSelect,
  activeKey,
}: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (collapsed) {
    return (
      <div
        style={{
          width: 48,
          background: tokens.colors.bgSidebar,
          borderRight: `1px solid ${tokens.colors.textPrimary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu size={24} onClick={onToggle} style={{ cursor: "pointer" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        background: tokens.colors.bgSidebar,
        borderRight: `1px solid ${tokens.colors.textPrimary}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header + collapse button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: tokens.spacing.md,
          background: tokens.colors.bgHeader,
          borderBottom: `1px solid ${tokens.colors.textPrimary}`,
        }}
      >
        <div>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#ccc",
              borderRadius: "50%",
              marginBottom: tokens.spacing.sm,
            }}
          />
          <div style={{ fontWeight: "bold" }}>INVENTORY SYSTEM</div>
          <div style={{ fontSize: "0.9em" }}>Inventory Encoder</div>
        </div>
        <X size={20} onClick={onToggle} style={{ cursor: "pointer" }} />
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.key}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                  cursor: "pointer",
                  fontWeight: activeKey === item.key ? "bold" : "normal",
                }}
                onClick={() =>
                  item.subItems ? toggleGroup(item.key) : onSelect(item.key)
                }
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: tokens.spacing.sm,
                  }}
                >
                  {item.icon}
                  {item.label}
                </span>
                {item.subItems &&
                  (openGroups[item.key] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>
              {/* Submenu */}
              {item.subItems && openGroups[item.key] && (
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    paddingLeft: tokens.spacing.md,
                  }}
                >
                  {item.subItems.map((sub) => (
                    <li key={sub.key}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: tokens.spacing.sm,
                          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                          cursor: "pointer",
                          fontWeight: activeKey === sub.key ? "bold" : "normal",
                          fontSize: "0.9em",
                        }}
                        onClick={() => onSelect(sub.key)}
                      >
                        {sub.icon}
                        {sub.label}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
