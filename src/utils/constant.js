import { Calendar, CheckSquare, Clock } from "lucide-react"

export const getProgressColor = (progress) => {
    return "bg-blue-600 dark:bg-gray-300"
}


export const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border dark:border-green-500/20",
    paused: "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400 dark:border dark:border-orange-500/20",
    completed: "bg-gray-100 text-gray-800 dark:bg-slate-500/10 dark:text-slate-400 dark:border dark:border-slate-500/20"
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


export const features = [
    {
        icon: Calendar,
        title: "Daily Reports",
        description: "Receive comprehensive daily summaries of your tasks and progress",
        color: "blue",
        delay: 1
    },
    {
        icon: CheckSquare,
        title: "Task Management",
        description: "Smart task prioritization and completion tracking",
        color: "green",
        delay: 2
    },
    {
        icon: Clock,
        title: "Time Insights",
        description: "Analyze your productivity patterns and optimize your schedule",
        color: "purple",
        delay: 3
    }
]


export const colorMap = {
    blue: {
        bg: "bg-blue-100 dark:bg-blue-950/50",
        text: "text-blue-600 dark:text-blue-400",
        hover: "group-hover:text-blue-600 dark:group-hover:text-blue-400"
    },
    green: {
        bg: "bg-green-100 dark:bg-green-950/50",
        text: "text-green-600 dark:text-green-400",
        hover: "group-hover:text-green-600 dark:group-hover:text-green-400"
    },
    purple: {
        bg: "bg-purple-100 dark:bg-purple-950/50",
        text: "text-purple-600 dark:text-purple-400",
        hover: "group-hover:text-purple-600 dark:group-hover:text-purple-400"
    }
}




export const statusOptionsInviation = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
]

export const dateOptions = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
]


export const getAvatarUrl = (name) => {
    const encodedName = encodeURIComponent(name)
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=56`
}

