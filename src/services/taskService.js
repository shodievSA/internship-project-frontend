const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const taskService = {
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

	// Get task details
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
			throw new Error(error.message || "Failed to load task details");
		}

		return response.json();
	},

	// Update task
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

	// Delete task
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
			throw new Error(error.message || "Failed to update task status");
		}

		return response.json();
	},

	// Get task files/attachments
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

	// Upload task file
	uploadTaskFile: async (projectId, taskId, formData) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/files`,
			{
				method: "POST",
				credentials: "include",
				body: formData,
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to upload file");
		}

		return response.json();
	},

	// Delete task file
	deleteTaskFile: async (projectId, taskId, fileId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/files/${fileId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to delete file");
		}
	},

	// Assign task to a team member
	assignTask: async (projectId, taskId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/assign`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ assignedTo: memberId }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to assign task");
		}

		return response.json();
	},

	// Get tasks by sprint
	getTasksBySprint: async (projectId, sprintId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}/tasks`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load sprint tasks");
		}

		return response.json();
	},

	// Get all tasks for a project
	getAllTasks: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load project tasks");
		}

		return response.json();
	},

	// Get tasks assigned to a specific member
	getTasksByMember: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/tasks`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load member tasks");
		}

		return response.json();
	},
};

export default taskService;
