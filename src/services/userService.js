const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userService = {
	logOut: async () => {
		const response = await fetch(`${SERVER_BASE_URL}/api/v1/auth/logout`, {
			method: "DELETE",
			credentials: "include",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to log you out");
		}

		return response;
	},

	getUserInvites: async () => {
		const response = await fetch(`${SERVER_BASE_URL}/api/v1/me/invites`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load your invites");
		}

		return response.json();
	},

	updateInviteStatus: async ({ updatedStatus, projectId, inviteId }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites/${inviteId}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: updatedStatus }),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to update invite status");
		}

		return response.json();
	},
};

export default userService;
