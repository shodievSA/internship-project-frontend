const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const teamMemberService = {
	// Get all team members for a project
	getTeamMembers: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load project members");
		}

		return response.json();
	},

	// Get specific team member detail
	getTeamMember: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load member details");
		}

		return response.json();
	},

	// Add team member to project (via invitation)
	inviteTeamMember: async (projectId, memberData) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(memberData),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to invite team member");
		}

		return response.json();
	},

	// Remove team member from project
	removeTeamMember: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message ||
					"Unexpected error occurred while removing the member"
			);
		}
	},

	// Change team member role (promotion/demotion)
	changeTeamMemberRole: async ({ projectId, memberId, newRole }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newRole: newRole }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to change member's role");
		}

		return response.json();
	},

	// Promote team member to manager
	promoteToManager: async (projectId, memberId) => {
		return teamMemberService.changeTeamMemberRole({
			projectId,
			memberId,
			newRole: "manager",
		});
	},

	// Demote team member to regular member
	demoteToMember: async (projectId, memberId) => {
		return teamMemberService.changeTeamMemberRole({
			projectId,
			memberId,
			newRole: "member",
		});
	},

	// Promote team member to admin
	promoteToAdmin: async (projectId, memberId) => {
		return teamMemberService.changeTeamMemberRole({
			projectId,
			memberId,
			newRole: "admin",
		});
	},

	// Update team member information
	updateTeamMember: async (projectId, memberId, memberData) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}`,
			{
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(memberData),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to update member information"
			);
		}

		return response.json();
	},

	// Get team member productivity data
	getTeamMemberProductivity: async (
		projectId,
		memberId,
		timeRange = "7d"
	) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/productivity?range=${timeRange}`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to load member productivity"
			);
		}

		return response.json();
	},

	// Get team member tasks
	getTeamMemberTasks: async (projectId, memberId, status = null) => {
		const url = status
			? `${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/tasks?status=${status}`
			: `${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/tasks`;

		const response = await fetch(url, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load member tasks");
		}

		return response.json();
	},

	// Get team member workload
	getTeamMemberWorkload: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/workload`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load member workload");
		}

		return response.json();
	},

	// Leave project (for current user)
	leaveProject: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/me`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Error occurred while leaving the project"
			);
		}
	},

	// Transfer project ownership
	transferOwnership: async (projectId, newOwnerId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/transfer-ownership`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newOwnerId: newOwnerId }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to transfer project ownership"
			);
		}

		return response.json();
	},

	// Get team member permissions
	getTeamMemberPermissions: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/permissions`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to load member permissions"
			);
		}

		return response.json();
	},

	// Update team member permissions
	updateTeamMemberPermissions: async (projectId, memberId, permissions) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/permissions`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ permissions: permissions }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to update member permissions"
			);
		}

		return response.json();
	},
};

export default teamMemberService;
