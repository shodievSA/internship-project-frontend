const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

// --- Service functions ---

/**
 * Get productivity analytics for the current authenticated user in a project
 * @param {number} projectId - The project ID
 * @param {Object} filters - Optional filters for the request
 * @param {Object} filters.dateRange - Date range filter
 * @param {string} filters.dateRange.startDate - Start date in ISO format (YYYY-MM-DD)
 * @param {string} filters.dateRange.endDate - End date in ISO format (YYYY-MM-DD)
 * @param {string} filters.timeRange - Time range filter - 'day', 'week', 'month', 'all'
 * @returns {Promise<Object>} Member productivity data
 */
export async function getMyProductivity(projectId, filters = {}) {
	console.log("PROJECT ID IN FRONTEND", projectId);
	console.log("FILTERS:", filters);

	// Ensure projectId is a valid number
	const validProjectId = parseInt(projectId);
	if (isNaN(validProjectId)) {
		throw new Error("Invalid project ID");
	}

	const queryParams = new URLSearchParams();

	if (filters.dateRange) {
		if (filters.dateRange.startDate) {
			queryParams.append(
				"dateRange.startDate",
				filters.dateRange.startDate,
			);
		}
		if (filters.dateRange.endDate) {
			queryParams.append("dateRange.endDate", filters.dateRange.endDate);
		}
	}

	if (filters.timeRange) {
		queryParams.append("timeRange", filters.timeRange);
	}

	const url = `${BASE}/${validProjectId}/my-productivity${
		queryParams.toString() ? `?${queryParams.toString()}` : ""
	}`;

	console.log("REQUEST URL:", url);

	const res = await fetch(url, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	console.log("RESPONSE STATUS:", res.status);
	console.log("RESPONSE OK:", res.ok);

	if (!res.ok) {
		try {
			const error = await res.json();
			console.log("ERROR RESPONSE:", error);
			throw new Error(
				error.message ||
					error.error ||
					`Failed to get productivity data (${res.status})`,
			);
		} catch (parseError) {
			console.log("ERROR PARSING RESPONSE:", parseError);
			throw new Error(`Failed to get productivity data (${res.status})`);
		}
	}

	const data = await res.json();
	console.log("SUCCESS RESPONSE:", data);
	return data;
}
