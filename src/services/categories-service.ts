"use client";

export async function fetchCategories() {
  const response = await fetch("/api/categories");
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
}

export async function saveCategory(category: {
  id: string;
  code: string;
  name: string;
  description: string;
}) {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error("Failed to save category");
  return await response.json();
}

export async function deleteCategory(id: string) {
  const response = await fetch(`/api/categories?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete category");
  return await response.json();
}
