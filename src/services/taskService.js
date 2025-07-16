// @ts-ignore (if you use TypeScript elsewhere, otherwise this line is harmless in JS)
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// Helper fetcher
const fetcher = async (url, options) => {
    const res = await fetch(url, { credentials: 'include', ...options });
    if (!res.ok) {
        let error;
        try {
            error = await res.json();
        } catch {
            error = { message: res.statusText };
        }
        throw new Error(error.message || 'API error');
    }
    if (res.status === 204) return null;
    return res.json();
};

// Service to update task status (no SWR)
export async function updateTaskStatusService({ projectId, taskId, updatedTaskStatus, comment = '' }) {
    const allowedStatuses = [
        'ongoing',
        'closed',
        'rejected',
        'under review',
    ];
    if (!allowedStatuses.includes(updatedTaskStatus)) {
        throw new Error('Invalid status value');
    }
    const response = await fetcher(
        `${SERVER_BASE_URL}/api/v1/projects/${projectId}/tasks/${taskId}/status`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ updatedTaskStatus, comment }),
        }
    );
    return response.updatedTask;
} 