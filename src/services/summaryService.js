const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

// --- Service functions ---

/**
 * Get status overview for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Status overview data
 */
export async function getStatusOverview(projectId) {
  const res = await fetch(`${BASE}/${projectId}/summary/status-overview`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get status overview");
  }
  return await res.json();
}

/**
 * Get team workload for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Team workload data
 */
export async function getTeamWorkload(projectId) {
  const res = await fetch(`${BASE}/${projectId}/summary/team-workload`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get team workload");
  }
  return await res.json();
}

/**
 * Get all summary data for a project (combines both endpoints)
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Combined summary data
 */
export async function getProjectSummary(projectId) {
  try {
    const [statusOverview, teamWorkload] = await Promise.all([
      getStatusOverview(projectId),
      getTeamWorkload(projectId),
    ]);

    return {
      statusOverview,
      teamWorkload,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to get project summary");
  }
}
