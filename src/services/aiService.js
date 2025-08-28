const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const aiService = {
	enhanceText: async (text) => {
		const response = await fetch(`${SERVER_BASE_URL}/api/v1/ai/enhance`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: text }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to enhance text");
		}

		return response.json();
	},

	generateTaskTitle: async (taskDescription) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/ai/generate-task-title`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ taskDescription }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to generate task title");
		}

		return response.json();
	},
};

export default aiService;
