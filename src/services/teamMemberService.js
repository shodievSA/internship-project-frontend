const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const teamMemberService = {
	// Get project team members
	getProjectTeam: async (projectId) => {
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

	// Get a specific team member
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
			throw new Error(error.message || "Failed to get team member");
		}

		return response.json();
	},

	// Change member role (promote/demote)
	changeMemberRole: async ({ projectId, memberId, newRole }) => {
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

	// Remove member from project
	removeMember: async (projectId, memberId) => {
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
					"Unexpected error occured while deleting the user"
			);
		}
	},

	// Leave project (current user)
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
			console.log(error);
			throw new Error(
				error.message || "Error occured while leaving the project."
			);
		}
	},

	// Invite new member to project
	inviteMember: async ({ projectId, email, role, message }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, role, message }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to send invitation");
		}

		return response.json();
	},

	// Get project invitations
	getProjectInvites: async (projectId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to load project invites");
		}

		return response.json();
	},

	// Cancel invitation
	cancelInvitation: async (projectId, inviteId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites/${inviteId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to cancel invitation");
		}
	},

	// Resend invitation
	resendInvitation: async (projectId, inviteId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites/${inviteId}/resend`,
			{
				method: "POST",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to resend invitation");
		}

		return response.json();
	},

	// Get member productivity
	getMemberProductivity: async (projectId, memberId, dateRange) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/productivity`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ dateRange }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(
				error.message || "Failed to get member productivity"
			);
		}

		return response.json();
	},

	// Get member workload
	getMemberWorkload: async (projectId, memberId) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/workload`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get member workload");
		}

		return response.json();
	},

	// Update member permissions
	updateMemberPermissions: async ({ projectId, memberId, permissions }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/permissions`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ permissions }),
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

	// Get member activity
	getMemberActivity: async (projectId, memberId, limit = 10) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/members/${memberId}/activity?limit=${limit}`,
			{
				method: "GET",
				credentials: "include",
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to get member activity");
		}

		return response.json();
	},

	// Bulk invite members
	bulkInviteMembers: async ({ projectId, invitations }) => {
		const response = await fetch(
			`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites/bulk`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ invitations }),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Failed to send bulk invitations");
		}

		return response.json();
	},
};

export default teamMemberService;
