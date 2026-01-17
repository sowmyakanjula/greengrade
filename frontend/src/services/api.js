export async function analyzePlant({ file, itemType }) {
  const formData = new FormData();
  formData.append("item_type", itemType);
  formData.append("image", file);

  const res = await fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("API failed");
  return res.json();
}
