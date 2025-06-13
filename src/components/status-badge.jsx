export function StatusBadge({ status }) {
    if (status === "admin") {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-black">
                admin
            </span>
        )
    }

    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            member
        </span>
    )
}
