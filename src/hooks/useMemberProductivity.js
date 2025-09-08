import useSWR, { mutate } from "swr";
import {
	getMyProductivity,
	getMemberProductivity,
} from "../services/memberProductivityService";

// --- SWR Hooks ---

/**
 * Hook for fetching member productivity data
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Member productivity data and loading states
 */
export function useMyProductivity(projectId, sprintId = null, options = {}) {
	// Check if we should fetch data (for conditional fetching)
	const shouldFetch = options.shouldFetch !== false;

	const key =
		projectId && shouldFetch
			? ["my-productivity", projectId, sprintId]
			: null;

	const { data, error, isLoading, isValidating, mutate } = useSWR(
		key,
		() => getMyProductivity(projectId, sprintId),
		{
			refreshInterval: options.refreshInterval || 0,
			errorRetryCount: 0, // Disable retry to prevent infinite loop
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			...options,
		}
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
 * Hook for fetching productivity data for a specific team member (admin/manager only)
 * @param {number} projectId - The project ID
 * @param {number} memberId - The member ID to get productivity for
 * @param {number} sprintId - Optional sprint ID to filter data
 * @param {Object} options - SWR options
 * @returns {Object} Member productivity data and loading states
 */
export function useMemberProductivity(
	projectId,
	memberId,
	sprintId = null,
	options = {}
) {
	// Check if we should fetch data (for conditional fetching)
	const shouldFetch = options.shouldFetch !== false;

	const key =
		projectId && memberId && shouldFetch
			? ["member-productivity", projectId, memberId, sprintId]
			: null;

	const { data, error, isLoading, isValidating, mutate } = useSWR(
		key,
		() => getMemberProductivity(projectId, memberId, sprintId),
		{
			refreshInterval: options.refreshInterval || 0,
			errorRetryCount: 0, // Disable retry to prevent infinite loop
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			...options,
		}
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
	return (projectId, sprintId = null) => {
		if (projectId) {
			const key = ["my-productivity", projectId, sprintId];
			mutate(key);
		}
	};
}
