export function StatusBadge({ status }) {
	if (status === "admin") {
		return (
			<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-black">
				admin
			</span>
		);
	}

	if (status === "manager") {
		return (
			<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20">
				manager
			</span>
		);
	}

	return (
		<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
			member
		</span>
	);
}
