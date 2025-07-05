const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const aiService = {

	enhanceText: async (text) => {

		const response = await fetch(`${SERVER_BASE_URL}/api/v1/ai/enhance`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text: text })
		});

		if (!response.ok) {

			const error = await response.json();
			throw new Error(error.message);

		} 

		return response.json();

	}

}

export default aiService;