import { Warehouse } from "@/generated/prisma/client";

export async function fetchWarehouses(): Promise<Warehouse[]> {
  const response = await fetch("/api/warehouses");
  if (!response.ok) {
    throw new Error("Failed to fetch warehouses");
  }
  return response.json();
}

export async function saveWarehouse(data: Warehouse): Promise<void> {
  const response = await fetch("/api/warehouses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save warehouse");
  }
}

export async function deleteWarehouse(id: string): Promise<void> {
  const response = await fetch(`/api/warehouses?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete warehouse");
  }
}
