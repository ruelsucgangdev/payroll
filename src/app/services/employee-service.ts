// // src/app/services/employee-service.ts
// export async function getEmployees() {
//   const res = await fetch("/api/employees");
//   if (!res.ok) throw new Error("Failed to load employees");
//   const raw: any[] = await res.json();
//   return raw.map((e) => ({
//     ...e,
//     employeeNo: e.employeeNumber, // copy employeeNumber into employeeNo
//   }));
// }

// export async function createEmployee(data: any) {
//   const res = await fetch("/api/employees", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to create employee");
//   return res.json();
// }

// export async function updateEmployee(id: string, data: any) {
//   const res = await fetch(`/api/employees/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to update employee");
//   return res.json();
// }

// export async function deleteEmployee(id: string) {
//   const res = await fetch(`/api/employees/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) throw new Error("Failed to delete employee");
//   return res.json();
// }

// src/app/services/employee-service.ts

type RawEmployee = {
  id: string;
  employeeNumber: string;
  lastName: string;
  firstName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  contactNumber: string;
  address: string;
  dateHired: string;
  sss: string;
  tin: string;
  pagibig: string;
  philhealth: string;
  status: string;
};

type Employee = RawEmployee & { employeeNo: string };

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch("/api/employees");
  if (!res.ok) throw new Error("Failed to load employees");
  const raw: RawEmployee[] = await res.json();
  return raw.map((e) => ({
    ...e,
    employeeNo: e.employeeNumber, // mirror for the UI
  }));
}

export async function createEmployee(data: any): Promise<Employee> {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  const e: RawEmployee = await res.json();
  return {
    ...e,
    employeeNo: e.employeeNumber,
  };
}

export async function updateEmployee(id: string, data: any): Promise<Employee> {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  const e: RawEmployee = await res.json();
  return {
    ...e,
    employeeNo: e.employeeNumber,
  };
}

export async function deleteEmployee(
  id: string
): Promise<{ success: boolean }> {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return res.json();
}
