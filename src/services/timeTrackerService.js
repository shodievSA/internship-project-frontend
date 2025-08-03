const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/timer`;

// --- Service functions ---
export async function startTimer(taskId) {
  const res = await fetch(`${BASE}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId }),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to start timer");
  }
  return await res.json();
}

export async function stopTimer() {
  const res = await fetch(`${BASE}/stop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to stop timer");
  }
  return await res.json();
}

export async function createManualEntry(taskId, startTime, endTime, note) {
  const res = await fetch(`${BASE}/manual-entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId, startTime, endTime, note }),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create manual time entry");
  }
  return await res.json();
}

export async function fetchTimerStatus() {
  const res = await fetch(`${BASE}/status`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch timer status");
  }
  return await res.json();
}

export async function fetchTimerStats(params) {
  let query = "";
  if (params) {
    const q = new URLSearchParams(params).toString();
    if (q) query = `?${q}`;
  }
  const res = await fetch(`${BASE}/stats${query}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch timer stats");
  }
  return await res.json();
}
