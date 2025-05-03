export async function getEmployees() {
  const res = await fetch("/api/employees");
  if (!res.ok) throw new Error("Failed to load employees");
  const raw: any[] = await res.json();
  return raw.map((e) => ({
    ...e,
    employeeNo: e.employeeNumber,
  }));
}

export async function createEmployee(data: any) {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
}

export async function updateEmployee(id: string, data: any) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return res.json();
}
