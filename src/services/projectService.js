const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const projectService = {
  createProject: async (title, userPosition) => {
    const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, userPosition }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create project");
    }

    return response.json();
  },

  getProjects: async () => {
    const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch projects");
    }

    const { projects } = await response.json();

    return projects;
  },
	getProject: async (projectId) => {

		const response = await fetch(`${SERVER_BASE_URL}/api/v1/projects/${projectId}`, {
			method: 'GET',
			credentials: 'include'
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Error occured while getting project's details");
		} 

		return response.json();

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

	},
	changeTaskStatus: async ({ projectId, taskId, updatedTaskStatus, updateComment }) => {

		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/status`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					updatedTaskStatus: updatedTaskStatus,
					comment: updateComment
				})
			}
		);

		if (!response.ok) {

			const error = await response.json();
			throw new Error(error.message || "Failed to update task");

		}

		return response.json();

	}
};

export default projectService;
