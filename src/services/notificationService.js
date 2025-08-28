const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const notificationService = {
	getNotifications: async () => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/me/notifications`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error || error.message || "Failed to fetch notifications"
			);
		}

		const { notifications } = await response.json();
		return notifications;
	},
	async deleteNotifications(notificationIds) {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/me/notifications`,
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					notificationsToDelete: { notificationIds },
				}),
			}
		);
		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error || error.message || "Failed to delete notifications"
			);
		}
		return true;
	},
	async updateNotificationViewStatus(notificationIds, isViewed) {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/me/notifications`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					notificationViewUpdates: { notificationIds, isViewed },
				}),
			}
		);
		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				error.error ||
					error.message ||
					"Failed to update notification view status"
			);
		}
		return true;
	},
};

export default notificationService;
