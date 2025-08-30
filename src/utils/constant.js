import { Calendar, CheckSquare, Clock } from "lucide-react";

export const getProgressColor = (progress) => {
	return "bg-blue-600 dark:bg-gray-300";
};

export const statusColors = {
	active: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400 dark:border dark:border-green-500/30",
	paused: "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400 dark:border dark:border-orange-500/30",
	completed:
		"bg-gray-100 text-gray-800 dark:bg-slate-500/20 dark:text-slate-400 dark:border dark:border-slate-500/30",
};

export const sprintStatusColors = {
	active: "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border dark:border-green-500/20",
	completed:
		"bg-gray-100 text-gray-800 dark:bg-slate-500/10 dark:text-slate-400 dark:border dark:border-slate-500/20",
	planned:
		"bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-400 dark:border dark:border-fuchsia-500/30",
};

export const taskStatusColors = {
	ongoing:
		"bg-blue-200/80 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300",
	"under review":
		"bg-purple-200/80 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300",
	closed: "bg-green-200/80 dark:bg-green-800/50 text-green-700 dark:text-green-300",
	rejected: "bg-red-200/80 dark:bg-red-800/50 text-red-700 dark:text-red-300",
	overdue:
		"bg-orange-200/80 dark:bg-orange-800/50 text-orange-700 dark:text-orange-300",
};

export const taskPriorityColors = {
	high: "bg-red-200/80 dark:bg-red-800/50 text-red-700 dark:text-red-300",
	middle: "bg-amber-200/80 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300",
	low: "bg-green-200/80 dark:bg-green-800/50 text-green-700 dark:text-green-300",
};

export const statusOptions = [
	{ label: "All Status", value: "all" },
	{ label: "Active", value: "active" },
	{ label: "Completed", value: "completed" },
	{ label: "Paused", value: "paused" },
];

export const ownerOptions = [
	{ label: "All Projects", value: "all" },
	{ label: "Owner", value: "owner" },
	{ label: "Member", value: "member" },
];

export const taskPriorityOptions = [
	{ label: "High", value: "high" },
	{ label: "Middle", value: "middle" },
	{ label: "Low", value: "low" },
];

export const projectStatusOptions = [
	{ label: "Active", value: "active" },
	{ label: "Paused", value: "paused" },
	{ label: "Completed", value: "completed" },
];

export const features = [
	{
		icon: Calendar,
		title: "Daily Reports",
		description:
			"Receive comprehensive daily summaries of your tasks and progress",
		color: "blue",
		delay: 1,
	},
	{
		icon: CheckSquare,
		title: "Task Management",
		description: "Smart task prioritization and completion tracking",
		color: "green",
		delay: 2,
	},
	{
		icon: Clock,
		title: "Time Insights",
		description:
			"Analyze your productivity patterns and optimize your schedule",
		color: "purple",
		delay: 3,
	},
];

export const colorMap = {
	blue: {
		bg: "bg-blue-100 dark:bg-blue-950/50",
		text: "text-blue-600 dark:text-blue-400",
		hover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
	},
	green: {
		bg: "bg-green-100 dark:bg-green-950/50",
		text: "text-green-600 dark:text-green-400",
		hover: "group-hover:text-green-600 dark:group-hover:text-green-400",
	},
	purple: {
		bg: "bg-purple-100 dark:bg-purple-950/50",
		text: "text-purple-600 dark:text-purple-400",
		hover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
	},
};

export const statusOptionsInviation = [
	{ value: "all", label: "All Status" },
	{ value: "pending", label: "Pending" },
	{ value: "accepted", label: "Accepted" },
	{ value: "rejected", label: "Rejected" },
];

export const taskStatusOptions = [
	{ value: "all", label: "All Status" },
	{ value: "ongoing", label: "Ongoing" },
	{ value: "closed", label: "Closed" },
	{ value: "under review", label: "Under Review" },
	{ value: "rejected", label: "Rejected" },
	{ value: "overdue", label: "Overdue" },
];

export const sprintStatusFilters = [
	{ value: "all", label: "All Status" },
	{ value: "active", label: "Active" },
	{ value: "planned", label: "Planned" },
	{ value: "completed", label: "Completed" },
	{ value: "overdue", label: "Overdue" },
];

export const dateOptions = [
	{ value: "all", label: "All Dates" },
	{ value: "today", label: "Today" },
	{ value: "week", label: "This Week" },
	{ value: "month", label: "This Month" },
];

export const sprintStatusOptions = [
	{ value: "active", label: "Active" },
	{ value: "planned", label: "Planned" },
	{ value: "completed", label: "Completed" },
];

export const getAvatarUrl = (name) => {
	const encodedName = encodeURIComponent(name);
	return `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=56`;
};
