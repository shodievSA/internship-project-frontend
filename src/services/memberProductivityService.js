const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

// --- Service functions ---

/**
 * Get productivity analytics for the current authenticated user in a project
 * @param {number} projectId - The project ID
 * @param {number} sprintId - Optional sprint ID to filter data
 * @returns {Promise<Object>} Member productivity data
 */
export async function getMyProductivity(projectId, sprintId = null) {
  // Ensure projectId is a valid number
  const validProjectId = parseInt(projectId);
  if (isNaN(validProjectId)) {
    throw new Error("Invalid project ID");
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (sprintId) {
    queryParams.append("sprintId", sprintId);
  }

  const url = `${BASE}/${validProjectId}/my-productivity${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    try {
      const error = await res.json();
      console.log("ERROR RESPONSE:", error);
      throw new Error(
        error.message ||
          error.error ||
          `Failed to get productivity data (${res.status})`
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
