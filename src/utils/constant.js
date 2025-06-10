export const getProgressColor = (progress) => {
    return "bg-blue-600 dark:bg-gray-300"
}

export const statusColors = {
    Active: "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border dark:border-green-500/20",
    Completed: "bg-gray-100 text-gray-800 dark:bg-slate-500/10 dark:text-slate-400 dark:border dark:border-slate-500/20",
    Paused: "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400 dark:border dark:border-orange-500/20"
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