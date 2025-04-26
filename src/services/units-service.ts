"use client";

export async function fetchUnits() {
  const response = await fetch("/api/units");
  if (!response.ok) throw new Error("Failed to fetch units");
  return await response.json();
}

export async function saveUnit(unit: {
  id: string;
  name: string;
  abbreviation: string;
}) {
  const response = await fetch("/api/units", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unit),
  });
  if (!response.ok) throw new Error("Failed to save unit");
  return await response.json();
}

export async function deleteUnit(id: string) {
  const response = await fetch(`/api/units?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete unit");
  return await response.json();
}
