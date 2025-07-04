const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const projectService = {

    createProject: async (title, userPosition) => {

        const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ title, userPosition })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create project');
        }

        return response.json();

    },
    getProjects: async () => {

        const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch projects');
        }

        const { projects } = await response.json();

		return projects;

    },
	createTask: async (projectId, task) => {

		const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ task: task })
		});

		if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create task');
        }

        return response.json();

	},
	deleteTask: async (projectId, taskId) => {

		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}`,
			{
				method: "DELETE",
				credentials: "include"
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Failed to delete task');
		}

		return response.json();

	}

};

export default projectService; 