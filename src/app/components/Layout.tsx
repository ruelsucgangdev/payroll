"use client";

import { ReactNode, useState, useRef, useCallback } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar/Sidebar";
import Categories from "./Categories/Categories";
import UnitsOfMeasure from "./UnitsOfMeasure/UnitsOfMeasure";
import Items from "./Items/Items";
import Users from "./Users/Users";
import Inventory from "./Inventory/Inventory";
import ExchangeWrongItem from "./ExchangeWrongItem/ExchangeWrongItem";
import PhysicalCount from "./PhysicalCount/PhysicalCount";
import CashRefund from "./CashRefund/CashRefund";
import Warehouse from "./Warehouse/Warehouse";
import RegularDiscounts from "./PromoDiscounts/PromoDiscounts";
import AsIsItems from "./AsIsItems/AsIsItems";
import ItemListReport from "./ItemListReport/ItemListReport";
import ReturnItem from "./ReturnItem/ReturnItem";
import SkuManager from "./SkuManager/SkuManager";
import SalesManager from "./SalesManager/SalesManager";
import ReceivingItemsManager from "./Receive/ReceivingItemsManager";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // which screen to show
  const [activeKey, setActiveKey] = useState<string>("");
  // collapsed state
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // sidebar width (when expanded)
  const [width, setWidth] = useState<number>(284);

  // for tracking drag‐resize
  const isResizing = useRef<boolean>(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    // clamp width between 200 and 400px
    const newWidth = Math.min(400, Math.max(200, e.clientX));
    setWidth(newWidth);
  }, []);

  // on mouse up
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
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        width={width}
        onToggle={() => setCollapsed((c) => !c)}
        onSelect={setActiveKey}
        activeKey={activeKey}
      />

      {/* drag‐handle */}
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

      <main className="main-content" style={{ flex: 1, overflow: "auto" }}>
        {activeKey === "dashboard" ? (
          <Dashboard />
        ) : activeKey === "inventory" ? (
          <Inventory />
        ) : activeKey === "promo-discounts" ? (
          <RegularDiscounts />
        ) : activeKey === "as-is-items" ? (
          <AsIsItems />
        ) : activeKey === "receive-item" ? (
          <ReceivingItemsManager />
        ) : activeKey === "return-item" ? (
          <ReturnItem />
        ) : activeKey === "exchange" ? (
          <ExchangeWrongItem />
        ) : activeKey === "cash-refund" ? (
          <CashRefund />
        ) : activeKey === "warehouse" ? (
          <Warehouse />
        ) : activeKey === "sku-manager" ? (
          <SkuManager />
        ) : activeKey === "physical-count" ? (
          <PhysicalCount />
        ) : activeKey === "categories" ? (
          <Categories />
        ) : activeKey === "unit-of-measure" ? (
          <UnitsOfMeasure />
        ) : activeKey === "pos" ? (
          <SalesManager />
        ) : activeKey === "items" ? (
          <Items />
        ) : activeKey === "user-admin" ? (
          <Users />
        ) : activeKey === "item-list" ? (
          <ItemListReport />
        ) : (
          children
        )}
      </main>
    </div>
  );
}
