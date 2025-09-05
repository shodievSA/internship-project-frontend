const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BASE = `${SERVER_BASE_URL}/api/v1/projects`;

export async function getTaskComments(projectId, taskId) {

	const res = await fetch(`${BASE}/${projectId}/tasks/${taskId}/comments`, {
		credentials: "include",
	});

	if (!res.ok) {

		const error = await res.json().catch(() => ({}));

		throw new Error(
			error.error || error.message || "Failed to get task comments"
		);
		
	}

	return await res.json();

}

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

		throw new Error(
			error.error || error.message || "Failed to create comment"
		);

	}

	return await res.json();

}

export async function updateTaskComment(
	projectId,
	taskId,
	commentId,
	commentData
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
		}
	);

	if (!res.ok) {

		const error = await res.json().catch(() => ({}));

		throw new Error(
			error.error || error.message || "Failed to update comment"
		);

	}

	return await res.json();

}

export async function deleteTaskComment(projectId, taskId, commentId) {

	const res = await fetch(
		`${BASE}/${projectId}/tasks/${taskId}/comments/${commentId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (!res.ok) {

		const error = await res.json().catch(() => ({}));

		throw new Error(
			error.error || error.message || "Failed to delete comment"
		);

	}

	return await res.json();

}

const commentService = {
	getTaskComments,
	createTaskComment,
	updateTaskComment,
	deleteTaskComment,
};

export default commentService;
