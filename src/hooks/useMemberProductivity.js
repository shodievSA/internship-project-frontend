import useSWR, { mutate } from "swr";
import { getMyProductivity } from "../services/memberProductivityService";

// --- SWR Hooks ---

/**
 * Hook for fetching member productivity data
 * @param {number} projectId - The project ID
 * @param {Object} filters - Optional filters for the request
 * @param {Object} filters.dateRange - Date range filter
 * @param {string} filters.dateRange.startDate - Start date in ISO format (YYYY-MM-DD)
 * @param {string} filters.dateRange.endDate - End date in ISO format (YYYY-MM-DD)
 * @param {string} filters.timeRange - Time range filter - 'day', 'week', 'month', 'all'
 * @param {Object} options - SWR options
 * @returns {Object} Member productivity data and loading states
 */
export function useMyProductivity(projectId, filters = {}, options = {}) {
  const key = projectId
    ? ["my-productivity", projectId, JSON.stringify(filters)]
    : null;

  return useSWR(key, () => getMyProductivity(projectId, filters), {
    refreshInterval: options.refreshInterval || 0,
    errorRetryCount: 0, // Disable retry to prevent infinite loop
    ...options,
  });
}

/**
 * Hook for refreshing member productivity data
 * @returns {Function} Function to refresh member productivity data
 */
export function useRefreshMemberProductivity() {
  return (projectId, filters = {}) => {
    if (projectId) {
      const key = ["my-productivity", projectId, JSON.stringify(filters)];
      mutate(key);
    }
  };
}
