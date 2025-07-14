const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const organizerService = {

	getDailyReport: async () => {

		const response = await fetch(`${SERVER_BASE_URL}/api/v1/me/daily-report`, {
			method: "GET",
			credentials: "include"
		});

		if (!response.ok) {

			const error = await response.json();
			throw new Error(error.message || "Failed to get user's daily report");

		}

		return response.json();

	}

}