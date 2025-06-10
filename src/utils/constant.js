export const getProgressColor = (progress) => {
    return "bg-blue-600 dark:bg-gray-300"
}

export const statusColors = {
    Active: "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border dark:border-green-500/20",
    Completed: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 dark:border dark:border-blue-500/20",
    Paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border dark:border-yellow-500/20"
} 



export const statusOptions = [
    "All Status",
    "Active",
    "Completed",
    "Paused"
];

export const ownerOptions = [
    "All Projects",
    "Owner",
    "Member"
];

export const timeOptions = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 3 Months",
    "Last Year"
];