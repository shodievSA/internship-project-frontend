export const getProgressColor = (progress) => {
    return progress === 100 ? "bg-green-500 dark:bg-green-500" : "bg-gray-500 dark:bg-white"
}

export const statusColors = {
    active: "bg-green-600 text-green-100",
    paused: "bg-yellow-600 text-yellow-100",
    completed: "bg-purple-600 text-purple-100"
} 


