const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

// --- Service functions ---

/**
 * Get status overview for a project
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Status overview data
 */
export async function getStatusOverview(projectId, sprintId = null) {
  const url = sprintId
    ? `${BASE}/${projectId}/summary/status-overview?sprintId=${sprintId}`
    : `${BASE}/${projectId}/summary/status-overview`;

  const res = await fetch(url, {
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
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Team workload data
 */
export async function getTeamWorkload(projectId, sprintId = null) {
  const url = sprintId
    ? `${BASE}/${projectId}/summary/team-workload?sprintId=${sprintId}`
    : `${BASE}/${projectId}/summary/team-workload`;

  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get team workload");
  }
  return await res.json();
}

/**
 * Get sprint progress for a project
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Sprint progress data
 */
export async function getSprintProgress(projectId, sprintId = null) {
  const url = sprintId
    ? `${BASE}/${projectId}/summary/sprint-progress?sprintId=${sprintId}`
    : `${BASE}/${projectId}/summary/sprint-progress`;

  const res = await fetch(url, {
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
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Priority breakdown data
 */
export async function getPriorityBreakdown(projectId, sprintId = null) {
  const url = sprintId
    ? `${BASE}/${projectId}/summary/priority-breakdown?sprintId=${sprintId}`
    : `${BASE}/${projectId}/summary/priority-breakdown`;

  const res = await fetch(url, {
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
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Recent activity data
 */
export async function getRecentActivity(projectId, sprintId = null) {
  const url = sprintId
    ? `${BASE}/${projectId}/summary/recent-activity?sprintId=${sprintId}`
    : `${BASE}/${projectId}/summary/recent-activity`;

  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get recent activity");
  }
  return await res.json();
}

/**
 * Get all sprints for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} All sprints data
 */
export async function getAllSprints(projectId) {
  const res = await fetch(`${BASE}/${projectId}/sprints`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get sprints");
  }
  return await res.json();
}

/**
 * Get default sprint for a project
 * @param {number} projectId - The project ID
 * @returns {Promise<Object>} Default sprint data
 */
export async function getDefaultSprint(projectId) {
  const res = await fetch(`${BASE}/${projectId}/sprints/default`, {
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get default sprint");
  }
  return await res.json();
}

/**
 * Get all summary data for a project (combines multiple endpoints)
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Combined summary data
 */
export async function getProjectSummary(projectId, sprintId = null) {
  try {
    const [
      statusOverview,
      teamWorkload,
      sprintProgress,
      priorityBreakdown,
      recentActivity,
    ] = await Promise.all([
      getStatusOverview(projectId, sprintId),
      getTeamWorkload(projectId, sprintId),
      getSprintProgress(projectId, sprintId),
      getPriorityBreakdown(projectId, sprintId),
      getRecentActivity(projectId, sprintId),
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
