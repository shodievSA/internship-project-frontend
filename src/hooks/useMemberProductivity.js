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
	// Check if we should fetch data (for conditional fetching)
	const shouldFetch = options.shouldFetch !== false;

	const key =
		projectId && shouldFetch
			? ["my-productivity", projectId, JSON.stringify(filters)]
			: null;

	const { data, error, isLoading, isValidating, mutate } = useSWR(
		key,
		() => getMyProductivity(projectId, filters),
		{
			refreshInterval: options.refreshInterval || 0,
			errorRetryCount: 0, // Disable retry to prevent infinite loop
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			...options,
		},
	);

	// Show loading state when data is being fetched or when key changes
	const loading = isLoading || isValidating;

	return {
		data,
		error,
		loading,
		mutate,
	};
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
