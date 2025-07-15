const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const commentService = {

	getTaskComments: async (projectId, taskId) => {

		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/comments`,
			{
				method: "GET",
				credentials: "include"
			}
		);

		if (!response.ok) {

			const error = await response.json();
			throw new Error(error.message || "Failed to fetch all comments");

		}

		return response.json();

	}

}

export default commentService;