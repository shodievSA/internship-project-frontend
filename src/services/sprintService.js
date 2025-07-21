const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const sprintService = {

	createSprint: async (projectId, sprint) => {

		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/sprints`,
			{
				method: "POST",
				credentials: "include",
				body: JSON.stringify({ sprint })
			}
		);

		if (!response.ok) {

			const error = await response.json();
			throw new Error(error.message || "Failed to create new sprint");

		}

		return response.json();

	}

}

export default sprintService;