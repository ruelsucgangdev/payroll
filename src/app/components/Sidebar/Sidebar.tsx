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

// "use client";

// import { useState } from "react";
// import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
// import tokens from "../tokens";

// type MenuItem = {
//   key: string;
//   label: string;
//   subItems?: MenuItem[];
// };

// const menuItems: MenuItem[] = [
//   { key: "dashboard", label: "Dashboard" },
//   { key: "inventory", label: "Inventory" },
//   {
//     key: "discounts",
//     label: "Discounts",
//     subItems: [
//       { key: "regular-discounts", label: "Regular Discounts" },
//       { key: "as-is-items", label: "As‑Is Items" },
//     ],
//   },
//   {
//     key: "returns",
//     label: "Returns",
//     subItems: [
//       { key: "damaged-returns", label: "Damage Returns" },
//       { key: "exchange", label: "Exchange (Wrong Item)" },
//       { key: "cash-refund", label: "Cash Refund" },
//     ],
//   },
//   {
//     key: "adjustments",
//     label: "Adjustments",
//     subItems: [{ key: "physical-count", label: "Physical Count" }],
//   },
//   {
//     key: "master-files",
//     label: "Master Files",
//     subItems: [
//       { key: "categories", label: "Categories" },
//       { key: "unit-of-measure", label: "Unit of Measure" },
//       { key: "items", label: "Items" },
//       { key: "user-admin", label: "User Administration" },
//       { key: "warehouse", label: "Warehouse" },
//     ],
//   },
//   { key: "item-list", label: "Item List Report" },
// ];

// interface SidebarProps {
//   collapsed: boolean;
//   width: number;
//   onToggle: () => void;
//   onSelect: (key: string) => void;
//   activeKey: string;
// }

// export default function Sidebar({
//   collapsed,
//   width,
//   onToggle,
//   onSelect,
//   activeKey,
// }: SidebarProps) {
//   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

//   const toggleGroup = (key: string) => {
//     setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   if (collapsed) {
//     return (
//       <div
//         style={{
//           width: 48,
//           background: tokens.colors.bgSidebar,
//           borderRight: `1px solid ${tokens.colors.textPrimary}`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Menu size={24} onClick={onToggle} style={{ cursor: "pointer" }} />
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         width,
//         background: tokens.colors.bgSidebar,
//         borderRight: `1px solid ${tokens.colors.textPrimary}`,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header + collapse button */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: tokens.spacing.md,
//           background: tokens.colors.bgHeader,
//           borderBottom: `1px solid ${tokens.colors.textPrimary}`,
//         }}
//       >
//         <div>
//           <div
//             style={{
//               width: 40,
//               height: 40,
//               background: "#ccc",
//               borderRadius: "50%",
//               marginBottom: tokens.spacing.sm,
//             }}
//           />
//           <div style={{ fontWeight: "bold" }}>INVENTORY SYSTEM</div>
//           <div style={{ fontSize: "0.9em" }}>Inventory Encoder</div>
//         </div>
//         <X size={20} onClick={onToggle} style={{ cursor: "pointer" }} />
//       </div>

//       {/* Menu Items */}
//       <div style={{ flex: 1, overflowY: "auto" }}>
//         <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
//           {menuItems.map((item) => (
//             <li key={item.key}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
//                   cursor: "pointer",
//                   fontWeight: activeKey === item.key ? "bold" : "normal",
//                 }}
//                 onClick={() =>
//                   item.subItems ? toggleGroup(item.key) : onSelect(item.key)
//                 }
//               >
//                 <span>{item.label}</span>
//                 {item.subItems &&
//                   (openGroups[item.key] ? (
//                     <ChevronDown size={16} />
//                   ) : (
//                     <ChevronRight size={16} />
//                   ))}
//               </div>
//               {/* Submenu */}
//               {item.subItems && openGroups[item.key] && (
//                 <ul
//                   style={{
//                     listStyle: "none",
//                     margin: 0,
//                     paddingLeft: tokens.spacing.md,
//                   }}
//                 >
//                   {item.subItems.map((sub) => (
//                     <li key={sub.key}>
//                       <div
//                         style={{
//                           padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
//                           cursor: "pointer",
//                           fontWeight: activeKey === sub.key ? "bold" : "normal",
//                           fontSize: "0.9em",
//                         }}
//                         onClick={() => onSelect(sub.key)}
//                       >
//                         {sub.label}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { useState } from "react";
// // import styles from "./Sidebar.module.scss";

// // import {
// //   Home,
// //   Package,
// //   Tag,
// //   CornerUpLeft,
// //   Edit3,
// //   Database,
// //   FileText,
// //   Users,
// // } from "lucide-react";

// // type MenuItem = {
// //   key: string;
// //   label: string;
// //   icon?: React.ComponentType<{ size?: number }>;
// //   subItems?: MenuItem[];
// // };

// // const menuItems: MenuItem[] = [
// //   { key: "dashboard", label: "Dashboard", icon: Home },
// //   { key: "inventory", label: "Inventory", icon: Package },
// //   {
// //     key: "discounts",
// //     label: "Setup Discounts",
// //     icon: Tag,
// //     subItems: [
// //       { key: "regular-discounts", label: "Regular Discounts" },
// //       { key: "as-is-items", label: "As-Is Items" },
// //     ],
// //   },
// //   {
// //     key: "return",
// //     label: "Return Items",
// //     icon: CornerUpLeft,
// //     subItems: [
// //       { key: "damaged-returns", label: "Damaged Returns" },
// //       { key: "exchange", label: "Exchange (Wrong Item)" },
// //       { key: "cash-refund", label: "Cash Refund" },
// //     ],
// //   },
// //   {
// //     key: "adjustments",
// //     label: "Adjustments",
// //     icon: Edit3,
// //     subItems: [{ key: "physical-count", label: "Physical Count" }],
// //   },
// //   {
// //     key: "master-files",
// //     label: "Master Files",
// //     icon: Database,
// //     subItems: [
// //       { key: "categories", label: "Categories" },
// //       { key: "unit-of-measure", label: "Unit of Measure" },
// //       { key: "warehouse", label: "Warehouse/Bodega" },
// //       { key: "items", label: "Items" },
// //     ],
// //   },
// //   { key: "user-admin", label: "User Administration", icon: Users },
// //   {
// //     key: "reports",
// //     label: "Reports",
// //     icon: FileText,
// //     subItems: [{ key: "item-list", label: "Item List" }],
// //   },
// // ];

// // // interface SidebarProps {
// // //   onSelect: (key: string) => void;
// // //   activeKey: string;
// // // }
// // interface SidebarProps {
// //   collapsed: boolean;
// //   width: number;
// //   onToggle: () => void;
// //   onSelect: (key: string) => void;
// //   activeKey: string;
// // }

// // export default function Sidebar({ onSelect, activeKey }: SidebarProps) {
// //   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

// //   const toggleGroup = (key: string) =>
// //     setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

// //   return (
// //     <div className={styles.sidebar}>
// //       {/* HEADER */}
// //       <div className={styles.header}>
// //         {/* Logo placeholder: drop your real logo as /public/logo.png */}
// //         <img src="/logo.png" alt="Logo" className={styles.logo} />
// //         <div>
// //           <div className={styles.title}>SUCGANG GADGET STORE</div>
// //           <div className={styles.subtitle}>Inventory Management System</div>
// //         </div>
// //       </div>

// //       {/* MENU */}
// //       <ul className={styles.menuList}>
// //         {menuItems.map((item) => {
// //           const Icon = item.icon;
// //           return (
// //             <li key={item.key}>
// //               <div
// //                 className={`${styles.menuItem} ${
// //                   activeKey === item.key ? styles.menuItemActive : ""
// //                 }`}
// //                 onClick={() =>
// //                   item.subItems ? toggleGroup(item.key) : onSelect(item.key)
// //                 }
// //               >
// //                 {Icon && <Icon size={16} />}
// //                 {item.label}
// //               </div>

// //               {item.subItems && openGroups[item.key] && (
// //                 <ul className={styles.subMenu}>
// //                   {item.subItems.map((sub) => (
// //                     <li key={sub.key}>
// //                       <div
// //                         className={styles.subMenuItem}
// //                         onClick={() => onSelect(sub.key)}
// //                       >
// //                         {sub.label}
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // }
