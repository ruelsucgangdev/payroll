export async function fetchItems() {
  const response = await fetch("/api/items");
  if (!response.ok) throw new Error("Failed to fetch items");
  return await response.json();
}

export async function saveItem(item: any) {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to save item");
  return await response.json();
}

export async function deleteItem(id: string) {
  const response = await fetch(`/api/items?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete item");

  return await response.json();
}
