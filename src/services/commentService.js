const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

// --- Service functions ---

/**
 * Get comments for a specific task
 * @param {number} projectId - The project ID
 * @param {number} taskId - The task ID
 * @returns {Promise<Object>} Comments data
 */
export async function getTaskComments(projectId, taskId) {
	const res = await fetch(`${BASE}/${projectId}/tasks/${taskId}/comments`, {
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Failed to get task comments");
	}
	return await res.json();
}

/**
 * Create a new comment for a task
 * @param {number} projectId - The project ID
 * @param {number} taskId - The task ID
 * @param {Object} commentData - The comment data
 * @param {string} commentData.message - The comment message
 * @returns {Promise<Object>} Created comment data
 */
export async function createTaskComment(projectId, taskId, commentData) {
	const res = await fetch(`${BASE}/${projectId}/tasks/${taskId}/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(commentData),
	});
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Failed to create comment");
	}
	return await res.json();
}

/**
 * Update an existing comment
 * @param {number} projectId - The project ID
 * @param {number} taskId - The task ID
 * @param {number} commentId - The comment ID
 * @param {Object} commentData - The updated comment data
 * @param {string} commentData.message - The updated comment message
 * @returns {Promise<Object>} Updated comment data
 */
export async function updateTaskComment(
	projectId,
	taskId,
	commentId,
	commentData,
) {
	const res = await fetch(
		`${BASE}/${projectId}/tasks/${taskId}/comments/${commentId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(commentData),
		},
	);
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Failed to update comment");
	}
	return await res.json();
}

/**
 * Delete a comment
 * @param {number} projectId - The project ID
 * @param {number} taskId - The task ID
 * @param {number} commentId - The comment ID
 * @returns {Promise<Object>} Deletion response
 */
export async function deleteTaskComment(projectId, taskId, commentId) {
	const res = await fetch(
		`${BASE}/${projectId}/tasks/${taskId}/comments/${commentId}`,
		{
			method: "DELETE",
			credentials: "include",
		},
	);
	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || "Failed to delete comment");
	}
	return await res.json();
}

// Default export for backward compatibility
const commentService = {
	getTaskComments,
	createTaskComment,
	updateTaskComment,
	deleteTaskComment,
};

export default commentService;
