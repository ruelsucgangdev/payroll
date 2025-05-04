"use client";

import { ReactNode, useState, useRef, useCallback } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar/Sidebar";
import EmployeeMasterFile from "./EmployeeMasterFile/EmployeeMasterFile";
import DeductionSettingsTabs from "./DeductionSettingsTabs/DeductionSettingsTabs";
import TimekeepingEntry from "./EmployeeTimekeepingComponent/EmployeeTimekeepingComponent";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeKey, setActiveKey] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(284);
  const isResizing = useRef<boolean>(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(400, Math.max(200, e.clientX));
    setWidth(newWidth);
  }, []);

  const onMouseUp = useCallback(() => {
    isResizing.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar
        collapsed={collapsed}
        width={width}
        onToggle={() => setCollapsed((c) => !c)}
        onSelect={setActiveKey}
        activeKey={activeKey}
      />

      {!collapsed && (
        <div
          onMouseDown={startResize}
          style={{
            width: 4,
            cursor: "col-resize",
            background: "#ddd",
          }}
        />
      )}

      <main
        className="main-content"
        style={{
          flex: 1,
          overflow: "auto",
          backgroundColor: "#264d3d",
          padding: "1rem",
        }}
      >
        {activeKey === "dashboard" ? (
          <Dashboard />
        ) : activeKey === "employee-masterfile" ? (
          <EmployeeMasterFile />
        ) : activeKey === "deduction-settings" ? (
          <DeductionSettingsTabs />
        ) : activeKey === "attendance" ? (
          <TimekeepingEntry />
        ) : (
          children
        )}
      </main>
    </div>
  );
}
