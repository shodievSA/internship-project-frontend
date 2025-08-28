const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const taskService = {
	// Get task files
	getTaskFiles: async (projectId, taskId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/files`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load file attachments");
		}

		return response.json();
	},

	// Create a new task
	createTask: async (projectId, sprintId, formData) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}/tasks`,
			{
				method: "POST",
				credentials: "include",
				body: formData,
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create task");
		}

		return response.json();
	},

	// Update an existing task
	updateTask: async ({ projectId, taskId, formData }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "PATCH",
				credentials: "include",
				body: formData,
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update the task");
		}

		return response.json();
	},

	// Delete a task
	deleteTask: async (projectId, taskId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to delete task");
		}
	},

	// Change task status
	changeTaskStatus: async ({
		projectId,
		taskId,
		updatedTaskStatus,
		updateComment,
	}) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/status`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					updatedTaskStatus: updatedTaskStatus,
					comment: updateComment,
				}),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update task");
		}

		return response.json();
	},

	// Get a specific task
	getTask: async (projectId, taskId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get task");
		}

		return response.json();
	},

	// Get all tasks for a project
	getProjectTasks: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get project tasks");
		}

		return response.json();
	},

	// Get tasks for a specific sprint
	getSprintTasks: async (projectId, sprintId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}/tasks`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get sprint tasks");
		}

		return response.json();
	},

	// Assign task to a team member
	assignTask: async ({ projectId, taskId, assigneeId }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/assign`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ assigneeId }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to assign task");
		}

		return response.json();
	},

	// Update task priority
	updateTaskPriority: async ({ projectId, taskId, priority }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/priority`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ priority }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update task priority");
		}

		return response.json();
	},

	// Add comment to task
	addTaskComment: async ({ projectId, taskId, comment }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ comment }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to add comment");
		}

		return response.json();
	},

	// Get task comments
	getTaskComments: async (projectId, taskId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get task comments");
		}

		return response.json();
	},
};

export default taskService;
