import styles from "../styles/theme.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.wrapper}>
        <h1>Welcome to Payroll Management System (PMS)</h1>
        <p>
          Your all-in-one solution for managing employee records, tracking
          attendance, and automating payroll processing.
        </p>
        <p>Select a feature from the sidebar to begin.</p>
      </div>
    </div>
  );
}
