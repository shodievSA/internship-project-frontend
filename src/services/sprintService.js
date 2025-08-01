const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const sprintService = {
	createSprint: async (projectId, sprint) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ sprint }),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to create new sprint");
		}

		return response.json();
	},

	updateSprint: async (projectId, sprintId, updatedSprintProps) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ updatedSprintProps }),
			},
		);

		if (!response.ok) {
			const error = response.json();
			throw new Error(error.message || "Failed to update sprint");
		}

		return response.json();
	},

	deleteSprint: async (projectId, sprintId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}`,
			{
				method: "DELETE",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to delete the sprint");
		}

		return response;
	},

	getTasks: async (projectId, sprintId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints/${sprintId}`,
			{
				method: "GET",
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load sprint tasks!");
		}

		return response.json();
	},
};

export default sprintService;
