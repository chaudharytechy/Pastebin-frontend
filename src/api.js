export const API_BASE = "http://localhost:4000";

export async function createPaste(data) {
  const res = await fetch(`${API_BASE}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchPaste(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
