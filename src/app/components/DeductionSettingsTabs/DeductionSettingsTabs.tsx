"use client";

import { Tabs } from "@mui/material";
import { TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import SSSMatrixSettings from "../SSSMatrix/SSSMatrix";

// Uncomment these when components are ready
// import PagibigMatrixSettings from "./PagibigMatrix";
// import PhilhealthMatrixSettings from "./PhilhealthMatrix";
// import TaxMatrixSettings from "./TaxMatrix";

export default function DeductionSettingsTabs() {
  return (
    <div className="p-4 bg-[#14342b] text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <span className="text-white">Deduction Matrix Settings</span>
      </h2>
      <p className="text-sm text-[#c0e4d6] mb-4">
        Configure each matrix according to company deduction rules
      </p>

      <Tabs defaultValue="sss" className="w-full">
        <TabsList className="bg-[#1a4733] border border-[#2c7055]">
          <TabsTrigger value="sss">SSS</TabsTrigger>
          <TabsTrigger value="pagibig" disabled>
            Pag-IBIG
          </TabsTrigger>
          <TabsTrigger value="philhealth" disabled>
            PhilHealth
          </TabsTrigger>
          <TabsTrigger value="tax" disabled>
            Tax
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sss">
          <SSSMatrixSettings />
        </TabsContent>

        {/* <TabsContent value="pagibig">
          <PagibigMatrixSettings />
        </TabsContent>
        <TabsContent value="philhealth">
          <PhilhealthMatrixSettings />
        </TabsContent>
        <TabsContent value="tax">
          <TaxMatrixSettings />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
