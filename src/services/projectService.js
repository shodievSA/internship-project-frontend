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
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error || error.message || "Failed to create project"
			);
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
			}
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error || error.message || "Failed to update project"
			);
		}

		return response.json();
	},

	deleteProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error ||
					error.message ||
					"Error occured while deleting the project"
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
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error || error.message || "Failed to fetch projects"
			);
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
			}
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error ||
					error.message ||
					"Error occured while getting project's details"
			);
		}

		return response.json();
	},

	leaveProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/me`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			console.log(error);
			throw new Error(
				error.error ||
					error.message ||
					"Error occured while deleting the project."
			);
		}
	},
};

export default projectService;
