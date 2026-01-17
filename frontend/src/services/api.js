const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function analyzeItem(file, itemType) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("item_type", itemType);

  const response = await fetch(`${BASE}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return response.json();
}


