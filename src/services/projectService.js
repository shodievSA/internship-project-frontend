const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const projectService = {
    createProject: async (userId, title, userPosition) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/v1/new-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ userId, title, userPosition })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create project');
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }
};

export default projectService; 