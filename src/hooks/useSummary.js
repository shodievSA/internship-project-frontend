import useSWR, { mutate } from "swr";
import {
  getStatusOverview,
  getTeamWorkload,
  getProjectSummary,
  getSprintProgress,
  getPriorityBreakdown,
  getRecentActivity,
  getAllSprints,
  getDefaultSprint,
} from "../services/summaryService";

// --- SWR Hooks ---

/**
 * Hook for fetching status overview data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Status overview data and loading states
 */
export function useStatusOverview(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["status-overview", projectId, sprintId] : null,
    () => getStatusOverview(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching team workload data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Team workload data and loading states
 */
export function useTeamWorkload(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["team-workload", projectId, sprintId] : null,
    () => getTeamWorkload(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching sprint progress data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Sprint progress data and loading states
 */
export function useSprintProgress(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["sprint-progress", projectId, sprintId] : null,
    () => getSprintProgress(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching priority breakdown data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Priority breakdown data and loading states
 */
export function usePriorityBreakdown(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["priority-breakdown", projectId, sprintId] : null,
    () => getPriorityBreakdown(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching recent activity data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Recent activity data and loading states
 */
export function useRecentActivity(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["recent-activity", projectId, sprintId] : null,
    () => getRecentActivity(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching all sprints
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} All sprints data and loading states
 */
export function useAllSprints(projectId, options) {
  return useSWR(
    projectId ? ["all-sprints", projectId] : null,
    () => getAllSprints(projectId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching default sprint
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Default sprint data and loading states
 */
export function useDefaultSprint(projectId, options) {
  return useSWR(
    projectId ? ["default-sprint", projectId] : null,
    () => getDefaultSprint(projectId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching all summary data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} All summary data and loading states
 */
export function useProjectSummary(projectId, sprintId = null, options) {
  return useSWR(
    projectId ? ["project-summary", projectId, sprintId] : null,
    () => getProjectSummary(projectId, sprintId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching status overview, team workload, sprint progress, priority breakdown, and recent activity
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Combined summary data and loading states
 */
export function useSummary(projectId, sprintId = null, options) {
  const statusOverview = useStatusOverview(projectId, sprintId, options);
  const teamWorkload = useTeamWorkload(projectId, sprintId, options);
  const sprintProgress = useSprintProgress(projectId, sprintId, options);
  const priorityBreakdown = usePriorityBreakdown(projectId, sprintId, options);
  const recentActivity = useRecentActivity(projectId, sprintId, options);

	return {
		data: {
			statusOverview: statusOverview.data,
			teamWorkload: teamWorkload.data,
			sprintProgress: sprintProgress.data,
			priorityBreakdown: priorityBreakdown.data,
			recentActivity: recentActivity.data,
		},
		loading:
			statusOverview.isLoading ||
			teamWorkload.isLoading ||
			sprintProgress.isLoading ||
			priorityBreakdown.isLoading ||
			recentActivity.isLoading,
		error:
			statusOverview.error ||
			teamWorkload.error ||
			sprintProgress.error ||
			priorityBreakdown.error ||
			recentActivity.error,
		mutate: () => {
			statusOverview.mutate();
			teamWorkload.mutate();
			sprintProgress.mutate();
			priorityBreakdown.mutate();
			recentActivity.mutate();
		},
		isValidating:
			statusOverview.isValidating ||
			teamWorkload.isValidating ||
			sprintProgress.isValidating ||
			priorityBreakdown.isValidating ||
			recentActivity.isValidating,
	};
}

/**
 * Hook for refreshing summary data
 * @returns {Function} Function to refresh summary data
 */
export function useRefreshSummary() {
  return (projectId, sprintId = null) => {
    if (projectId) {
      mutate(["status-overview", projectId, sprintId]);
      mutate(["team-workload", projectId, sprintId]);
      mutate(["project-summary", projectId, sprintId]);
      mutate(["sprint-progress", projectId, sprintId]);
      mutate(["priority-breakdown", projectId, sprintId]);
      mutate(["recent-activity", projectId, sprintId]);
    }
  };
}

/**
 * Hook for refreshing sprint data
 * @returns {Function} Function to refresh sprint data
 */
export function useRefreshSprints() {
  return (projectId) => {
    if (projectId) {
      mutate(["all-sprints", projectId]);
      mutate(["default-sprint", projectId]);
    }
  };
}
