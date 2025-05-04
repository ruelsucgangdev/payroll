"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Settings } from "lucide-react";
import SSSMatrixSettings from "../SSSMatrix/SSSMatrix";
import styles from "./deduction-settings-tabs.module.scss";

// Uncomment these when ready:
// import PagibigMatrixSettings from "./PagibigMatrix";
// import PhilhealthMatrixSettings from "./PhilhealthMatrix";
// import TaxMatrixSettings from "./TaxMatrix";

export default function DeductionSettingsTabs() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Settings size={24} />
          Deduction Matrix Settings
        </h1>
        <p className={styles.subtitle}>
          Configure each matrix according to company deduction rules
        </p>
      </header>

      <Tabs.Root defaultValue="sss" className={styles.tabsRoot}>
        <Tabs.List className={styles.tabsList}>
          <Tabs.Trigger value="sss" className={styles.tab}>
            SSS
          </Tabs.Trigger>
          <Tabs.Trigger value="pagibig" className={styles.tab} disabled>
            Pag-IBIG
          </Tabs.Trigger>
          <Tabs.Trigger value="philhealth" className={styles.tab} disabled>
            PhilHealth
          </Tabs.Trigger>
          <Tabs.Trigger value="tax" className={styles.tab} disabled>
            Tax
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="sss" className={styles.tabContent}>
          <SSSMatrixSettings />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
