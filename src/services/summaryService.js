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
 * Get all summary data for a project (combines multiple endpoints)
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Combined summary data
 */
export async function getProjectSummary(projectId) {
  try {
    const [
      statusOverview,
      teamWorkload,
      sprintProgress,
      priorityBreakdown,
      recentActivity,
    ] = await Promise.all([
      getStatusOverview(projectId),
      getTeamWorkload(projectId),
      getSprintProgress(projectId),
      getPriorityBreakdown(projectId),
      getRecentActivity(projectId),
    ]);

    return {
      statusOverview,
      teamWorkload,
      sprintProgress,
      priorityBreakdown,
      recentActivity,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to get project summary");
  }
}

/**
 * Get sprint progress for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Sprint progress data
 */
export async function getSprintProgress(projectId) {
  const res = await fetch(`${BASE}/${projectId}/summary/sprint-progress`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get sprint progress");
  }
  return await res.json();
}

/**
 * Get priority breakdown for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Priority breakdown data
 */
export async function getPriorityBreakdown(projectId) {
  const res = await fetch(`${BASE}/${projectId}/summary/priority-breakdown`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get priority breakdown");
  }
  return await res.json();
}

/**
 * Get recent activity for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Recent activity data
 */
export async function getRecentActivity(projectId) {
  const res = await fetch(`${BASE}/${projectId}/summary/recent-activity`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get recent activity");
  }
  return await res.json();
}
