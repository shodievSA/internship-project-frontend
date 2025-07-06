const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const notificationService = {
  getNotifications: async () => {
    const response = await fetch(`${SERVER_BASE_URL}/api/v1/me/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch notifications");
    }

    const { notifications } = await response.json();
    return notifications;
  },
};

export default notificationService;
