"use client";
import styles from "./Dashboard.module.scss";
import {
  AlertCircle,
  Box,
  Megaphone,
  DollarSign,
  ShoppingCart,
  Clock,
  TrendingUp,
  Users,
  Package,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      {/* Page header */}
      <header className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Real‑time overview of inventory, orders & system alerts
        </p>
      </header>
      <div className={styles.dashboardContainer}></div>

      <div className={styles.dashboardContainer}>
        {/* Low Stock Alerts */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Box size={16} />
            <h2>Low Stock Alerts</h2>
          </div>
          <ul>
            <li>
              Item A - Qty: <span className={styles.flagged}>3</span> (Reorder
              level: 5)
            </li>
            <li>
              Item B - Qty: <span className={styles.flagged}>2</span> (Reorder
              level: 4)
            </li>
          </ul>
        </div>

        {/* Reorder Summary */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <AlertCircle size={16} />
            <h2>Reorder Summary</h2>
          </div>
          <p>2 items need immediate reordering.</p>
        </div>

        {/* Announcements */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Megaphone size={16} />
            <h2>Announcements</h2>
          </div>
          <ul>
            <li>System maintenance on Friday at 10PM.</li>
            <li>New item categories have been added.</li>
          </ul>
        </div>

        {/* Additional Info Cards */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Package size={16} />
            <h2>Total Items</h2>
          </div>
          <p>1,245 items in inventory.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>₱</span>
            <h2>Stock Value</h2>
          </div>
          <p>Total value: PHP 48,560.00</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <ShoppingCart size={16} />
            <h2>Sales Today</h2>
          </div>
          <p>34 transactions completed.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Clock size={16} />
            <h2>Pending Orders</h2>
          </div>
          <p>5 orders awaiting fulfillment.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TrendingUp size={16} />
            <h2>Top Selling Item</h2>
          </div>
          <p>Item C – 124 units sold this week.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Users size={16} />
            <h2>Active Users</h2>
          </div>
          <p>8 users currently logged in.</p>
        </div>
      </div>
    </>
  );
}
