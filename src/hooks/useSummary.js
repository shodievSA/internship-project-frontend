import useSWR, { mutate } from "swr";
import {
  getStatusOverview,
  getTeamWorkload,
  getProjectSummary,
} from "../services/summaryService";

// --- SWR Hooks ---

/**
 * Hook for fetching status overview data
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Status overview data and loading states
 */
export function useStatusOverview(projectId, options) {
  return useSWR(
    projectId ? ["status-overview", projectId] : null,
    () => getStatusOverview(projectId),
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
 * @param {Object} options - SWR options
 * @returns {Object} Team workload data and loading states
 */
export function useTeamWorkload(projectId, options) {
  return useSWR(
    projectId ? ["team-workload", projectId] : null,
    () => getTeamWorkload(projectId),
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
 * @param {Object} options - SWR options
 * @returns {Object} All summary data and loading states
 */
export function useProjectSummary(projectId, options) {
  return useSWR(
    projectId ? ["project-summary", projectId] : null,
    () => getProjectSummary(projectId),
    {
      refreshInterval:
        options && options.refreshInterval ? options.refreshInterval : 0,
      ...options,
    }
  );
}

/**
 * Hook for fetching both status overview and team workload
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Combined summary data and loading states
 */
export function useSummary(projectId, options) {
  const statusOverview = useStatusOverview(projectId, options);
  const teamWorkload = useTeamWorkload(projectId, options);

  return {
    data: {
      statusOverview: statusOverview.data,
      teamWorkload: teamWorkload.data,
    },
    loading: statusOverview.isLoading || teamWorkload.isLoading,
    error: statusOverview.error || teamWorkload.error,
    mutate: () => {
      statusOverview.mutate();
      teamWorkload.mutate();
    },
    isValidating: statusOverview.isValidating || teamWorkload.isValidating,
  };
}

/**
 * Hook for refreshing summary data
 * @returns {Function} Function to refresh summary data
 */
export function useRefreshSummary() {
  return (projectId) => {
    if (projectId) {
      mutate(["status-overview", projectId]);
      mutate(["team-workload", projectId]);
      mutate(["project-summary", projectId]);
    }
  };
}
