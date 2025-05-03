"use client";

import styles from "./Dashboard.module.scss";
import {
  Users,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  LayoutDashboard,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      {/* Page header with icon */}
      <header className={styles.pageHeader}>
        <h1>
          <LayoutDashboard size={24} /> Dashboard
        </h1>
        <p className={styles.pageSubtitle}>
          Overview of payroll KPIs and pending tasks
        </p>
      </header>

      <div className={styles.dashboardContainer}>
        {/* Total Employees */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Users size={20} />
            <h2>Total Employees</h2>
          </div>
          <p className={styles.cardValue}>128</p>
        </div>

        {/* Gross Payroll This Period */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span style={{ fontSize: 20, lineHeight: 0 }}>₱</span>
            <h2>Gross Payroll</h2>
          </div>
          <p className={styles.cardValue}>₱ 3,452,000.00</p>
        </div>

        {/* Next Pay Date */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Calendar size={20} />
            <h2>Next Pay Date</h2>
          </div>
          <p className={styles.cardValue}>2025-05-15</p>
        </div>

        {/* Pending Approvals */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Clock size={20} />
            <h2>Pending Approvals</h2>
          </div>
          <p className={styles.cardValue}>5</p>
        </div>

        {/* Leave Requests */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FileText size={20} />
            <h2>Leave Requests</h2>
          </div>
          <p className={styles.cardValue}>12</p>
        </div>

        {/* Overdue Timesheets */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <AlertCircle size={20} />
            <h2>Overdue Timesheets</h2>
          </div>
          <p className={styles.cardValue}>3</p>
        </div>
      </div>
    </>
  );
}
