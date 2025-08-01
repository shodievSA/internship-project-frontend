const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const projectService = {
	createProject: async (title, userPosition) => {
		const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ title, userPosition }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create project");
		}

		return response.json();
	},

	updateProject: async (projectId, updatedProjectProps) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ updatedProjectProps }),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update project");
		}

		return response.json();
	},

	deleteProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}`,
			{
				method: "DELETE",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Error occured while deleting the project",
			);
		}
	},

	getProjects: async () => {
		const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to fetch projects");
		}

		const { projects } = await response.json();

		return projects;
	},

	getProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}`,
			{
				method: "GET",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message ||
					"Error occured while getting project's details",
			);
		}

		return response.json();
	},

	createTask: async (projectId, sprintId, formData) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}/tasks`,
			{
				method: "POST",
				credentials: "include",
				body: formData,
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create task");
		}

		return response.json();
	},

	leaveProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/me`,
			{
				method: "DELETE",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			console.log(error);
			throw new Error(
				error.message || "Error occured while deleting the project.",
			);
		}
	},

	deleteTask: async (projectId, taskId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "DELETE",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to delete task");
		}
	},

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
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update task");
		}

		return response.json();
	},

	updateTask: async ({ projectId, taskId, formData }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "PATCH",
				credentials: "include",
				body: formData,
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update the task");
		}

		return response.json();
	},

	changeMemberRole: async ({ projectId, memberId, newRole }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newRole: newRole }),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to change member's role");
		}

		return response.json();
	},

	removeMember: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "DELETE",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message ||
					"Unexpected error occured while deleting the user",
			);
		}
	},

	getProjectInvites: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites`,
			{
				method: "GET",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load project invites");
		}

		return response.json();
	},

	getProjectTeam: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members`,
			{
				method: "GET",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load project members");
		}

		return response.json();
	},
};

export default projectService;
