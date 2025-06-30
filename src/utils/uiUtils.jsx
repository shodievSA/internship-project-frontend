export const getStatusBadge = (status) => {

    switch (status) {
        case "pending":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
                    Pending
                </span>
            );
        case "accepted":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    Accepted
                </span>
            );
        case "rejected":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900 text-white dark:bg-red-900 dark:text-white">
                    Rejected
                </span>
            );
        default:
            return null;
    }
	
}; 