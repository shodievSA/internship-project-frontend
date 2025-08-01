import useSWR, { mutate } from "swr";
import {
	getStatusOverview,
	getTeamWorkload,
	getProjectSummary,
	getSprintProgress,
	getPriorityBreakdown,
	getRecentActivity,
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
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
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
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
	);
}

/**
 * Hook for fetching sprint progress data
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Sprint progress data and loading states
 */
export function useSprintProgress(projectId, options) {
	return useSWR(
		projectId ? ["sprint-progress", projectId] : null,
		() => getSprintProgress(projectId),
		{
			refreshInterval:
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
	);
}

/**
 * Hook for fetching priority breakdown data
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Priority breakdown data and loading states
 */
export function usePriorityBreakdown(projectId, options) {
	return useSWR(
		projectId ? ["priority-breakdown", projectId] : null,
		() => getPriorityBreakdown(projectId),
		{
			refreshInterval:
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
	);
}

/**
 * Hook for fetching recent activity data
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Recent activity data and loading states
 */
export function useRecentActivity(projectId, options) {
	return useSWR(
		projectId ? ["recent-activity", projectId] : null,
		() => getRecentActivity(projectId),
		{
			refreshInterval:
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
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
				options && options.refreshInterval
					? options.refreshInterval
					: 0,
			...options,
		},
	);
}

/**
 * Hook for fetching status overview, team workload, sprint progress, priority breakdown, and recent activity
 * @param {number} projectId - The project ID
 * @param {Object} options - SWR options
 * @returns {Object} Combined summary data and loading states
 */
export function useSummary(projectId, options) {
	const statusOverview = useStatusOverview(projectId, options);
	const teamWorkload = useTeamWorkload(projectId, options);
	const sprintProgress = useSprintProgress(projectId, options);
	const priorityBreakdown = usePriorityBreakdown(projectId, options);
	const recentActivity = useRecentActivity(projectId, options);

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
	return (projectId) => {
		if (projectId) {
			mutate(["status-overview", projectId]);
			mutate(["team-workload", projectId]);
			mutate(["project-summary", projectId]);
			mutate(["sprint-progress", projectId]);
			mutate(["priority-breakdown", projectId]);
			mutate(["recent-activity", projectId]);
		}
	};
}
