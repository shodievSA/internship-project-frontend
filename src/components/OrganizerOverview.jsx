import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Button from "./ui/Button";
import { taskPriorityColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import {
	Calendar,
	Bell,
	Clock,
	ChevronRight,
	Eye,
	CircleAlert,
	Sparkles,
} from "lucide-react";

function OrganizerOverview({
	summary,
	tasksDueToday,
	tasksDueTomorrow,
	tasksDueThisWeek,
	newNotifications,
	tasksForReview,
	changeTab,
}) {
	const navigate = useNavigate();

	function returnTask(task) {
		return (
			<div
				className="flex flex-col gap-y-2 border border-neutral-200 dark:border-neutral-800 
				p-4 rounded-md group/item cursor-pointer transition-[box-shadow] duration-300 
				dark:hover:border-neutral-700 hover:shadow-md dark:hover:shadow-none"
				onClick={() =>
					navigate(
						`/projects/${task.from.projectId}/my-tasks#task-${task.id}`,
					)
				}
			>
				<div className="flex justify-between">
					<span className="font-medium">{task.title}</span>
					<div className="flex items-center gap-x-5">
						<span
							className={`${taskPriorityColors[task.priority]} text-xs px-3 
						rounded-full py-0.5`}
						>
							{task.priority}
						</span>
						<div className="flex items-center gap-x-2">
							<Clock className="w-4 h-4" />
							<span className="text-sm mt-0.5">
								{formatIsoDate(task.deadline)}
							</span>
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-x-3 text-sm text-neutral-600 dark:text-neutral-400">
						<span>
							In:{" "}
							<span className="font-medium">
								{task.from.projectName}
							</span>
						</span>
						<span>
							By:{" "}
							<span className="font-medium">
								{task.assignedBy.name}
							</span>
						</span>
					</div>
					<div className="opacity-0 group-hover/item:opacity-100 transition-[opacity] duration-300">
						<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
					</div>
				</div>
			</div>
		);
	}

	function returnNotification(notification) {
		return (
			<div
				className="flex flex-col gap-y-1 p-3 border border-neutral-200 dark:border-neutral-800 
				rounded-md dark:text-neutral-300 group/item hover:shadow-md dark:hover:shadow-none 
				dark:hover:border-neutral-700 cursor-pointer transition-[box-shadow] duration-300"
				onClick={() =>
					navigate(`/notifications#notification-${notification.id}`)
				}
			>
				<p>{notification.message}</p>
				<div className="flex justify-between">
					<span className="text-sm">
						{formatIsoDate(notification.createdAt)}
					</span>
					<div
						className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
					duration-300"
					>
						<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
					</div>
				</div>
			</div>
		);
	}

	function returnTaskForReview(task) {
		return (
			<div
				className="flex flex-col gap-y-2 border border-neutral-200 dark:border-neutral-800 
				p-4 rounded-md group/item hover:shadow-md dark:hover:shadow-none dark:hover:border-neutral-700
				cursor-pointer transition-[bow-shadow] duration-300"
				onClick={() =>
					navigate(
						`/projects/${task.from.projectId}/review-tasks#task-${task.id}`,
					)
				}
			>
				<div className="flex justify-between">
					<span className="font-medium">{task.title}</span>
					<div className="flex items-center gap-x-5">
						<span
							className={`${taskPriorityColors[task.priority]} text-sm px-3 
						rounded-full py-0.5`}
						>
							{task.priority}
						</span>
						<div className="flex items-center gap-x-2">
							<Clock className="w-4 h-4" />
							<span>{formatIsoDate(task.deadline)}</span>
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex gap-x-3 text-sm">
						<span>
							In:{" "}
							<span className="font-medium">
								{task.from.projectName}
							</span>
						</span>
						<span>
							Submitted by:{" "}
							<span className="font-medium">
								{task.assignedTo.name}
							</span>
						</span>
					</div>
					<div
						className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
					duration-300"
					>
						<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-5">
			<div
				className="flex flex-col gap-y-5 border border-neutral-200 dark:border-neutral-800 
			p-5 rounded-md"
			>
				<div className="flex items-center gap-x-2">
					<div className="p-2 bg-fuchsia-500/10 dark:bg-fuchsia-500/30 rounded-full">
						<Sparkles className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-600" />
					</div>
					<h1 className="text-lg font-medium">AI summary</h1>
				</div>
				<div>
					<p className="text-neutral-700 dark:text-neutral-400">{summary}</p>
				</div>
			</div>
			<div
				className="flex flex-col gap-y-5 border border-neutral-200 dark:border-neutral-800 
			p-5 rounded-md"
			>
				<div className="flex items-center gap-x-2">
					<div className="p-2 bg-red-700/10 dark:bg-red-800/30 rounded-full">
						<CircleAlert className="w-5 h-5 text-red-700 dark:text-red-600" />
					</div>
					<h1 className="text-lg font-medium">Today</h1>
					<div className="text-sm px-3 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
						{tasksDueToday.length}
					</div>
				</div>
				{tasksDueToday.length > 0 ? (
					tasksDueToday.length > 3 ? (
						<div className="flex flex-col gap-y-3">
							<div className="flex flex-col gap-y-3">
								{tasksDueToday
									.slice(0, 3)
									.map((task) => returnTask(task))}
							</div>
							<Button
								size="md"
								variant="secondary"
								onClick={() => changeTab("tasks-due-today", 1)}
							>
								<div className="flex items-center justify-center gap-x-3">
									<span>View All</span>
									<ChevronRight className="w-5 h-5" />
								</div>
							</Button>
						</div>
					) : (
						<div className="flex flex-col gap-y-3">
							{tasksDueToday.map((task) => returnTask(task))}
						</div>
					)
				) : (
					<h1>No priority actions for today</h1>
				)}
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 auto-rows-auto items-start pb-8">
				<div
					className="flex flex-col gap-y-5 border border-neutral-200 
				dark:border-neutral-800 p-5 rounded-md"
				>
					<div className="flex items-center gap-x-3">
						<div className="p-2 bg-orange-600/10 dark:bg-orange-600/20 rounded-full">
							<Calendar className="w-5 h-5 text-orange-600 dark:text-orange-600" />
						</div>
						<h1 className="text-lg font-medium">Tomorrow</h1>
						<div className="text-sm px-3 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
							{tasksDueTomorrow.length}
						</div>
					</div>
					{tasksDueTomorrow.length > 0 ? (
						tasksDueTomorrow.length > 3 ? (
							<div className="flex flex-col gap-y-3">
								<div className="flex flex-col gap-y-3">
									{tasksDueTomorrow
										.slice(0, 3)
										.map((task) => returnTask(task))}
								</div>
								<Button
									size="md"
									variant="secondary"
									onClick={() =>
										changeTab("tasks-due-tomorrow", 2)
									}
								>
									<div className="flex items-center justify-center gap-x-3">
										<span>View All</span>
										<ChevronRight className="w-5 h-5" />
									</div>
								</Button>
							</div>
						) : (
							<div className="flex flex-col gap-y-3">
								{tasksDueTomorrow.map((task) =>
									returnTask(task),
								)}
							</div>
						)
					) : (
						<h1>No tasks due tomorrow</h1>
					)}
				</div>

				<div
					className="flex flex-col gap-y-5 border border-neutral-200 
				dark:border-neutral-800 p-5 rounded-md"
				>
					<div className="flex items-center gap-x-3">
						<div className="p-2 bg-green-700/10 dark:bg-green-800/30 rounded-full">
							<Calendar className="w-5 h-5 text-green-700 dark:text-green-600" />
						</div>
						<h1 className="text-lg font-medium">This week</h1>
						<div className="text-sm px-3 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
							{tasksDueThisWeek.length}
						</div>
					</div>
					{tasksDueThisWeek.length > 0 ? (
						tasksDueThisWeek.length > 3 ? (
							<div className="flex flex-col gap-y-3">
								<div className="flex flex-col gap-y-3">
									{tasksDueThisWeek
										.slice(0, 3)
										.map((task) => returnTask(task))}
								</div>
								<Button
									size="md"
									variant="secondary"
									onClick={() =>
										changeTab("tasks-due-this-week", 3)
									}
								>
									<div className="flex items-center justify-center gap-x-3">
										<span>View All</span>
										<ChevronRight className="w-5 h-5" />
									</div>
								</Button>
							</div>
						) : (
							<div className="flex flex-col gap-y-3">
								{tasksDueThisWeek.map((task) =>
									returnTask(task),
								)}
							</div>
						)
					) : (
						<h1>No tasks due this week</h1>
					)}
				</div>

				<div
					className="flex flex-col gap-y-5 border border-neutral-200 
				dark:border-neutral-800 p-5 rounded-md"
				>
					<div className="flex items-center gap-x-3">
						<div className="p-2 bg-blue-700/10 dark:bg-blue-800/30 rounded-full">
							<Eye className="w-5 h-5 text-blue-700 dark:text-blue-600" />
						</div>
						<h1 className="text-lg font-medium">Reviews</h1>
						<div className="text-sm px-3 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
							{tasksForReview.length}
						</div>
					</div>
					{tasksForReview.length > 0 ? (
						tasksForReview.length > 3 ? (
							<div className="flex flex-col gap-y-3">
								<div className="flex flex-col gap-y-3">
									{tasksForReview
										.slice(0, 3)
										.map((taskForReview) =>
											returnTaskForReview(taskForReview),
										)}
								</div>
								<Button
									size="md"
									variant="secondary"
									onClick={() => changeTab("reviews", 4)}
								>
									<div className="flex items-center justify-center gap-x-3">
										<span>View All</span>
										<ChevronRight className="w-5 h-5" />
									</div>
								</Button>
							</div>
						) : (
							<div className="flex flex-col gap-y-3">
								{tasksForReview.map((taskForReview) =>
									returnTaskForReview(taskForReview),
								)}
							</div>
						)
					) : (
						<h1>No tasks for review</h1>
					)}
				</div>

				<div
					className="flex flex-col gap-y-5 border border-neutral-200 
				dark:border-neutral-800 p-5 rounded-md"
				>
					<div className="flex items-center gap-x-3">
						<div className="p-2 bg-purple-700/10 dark:bg-purple-800/30 rounded-full">
							<Bell className="w-5 h-5 text-purple-700 text-purple-600" />
						</div>
						<h1 className="text-lg font-medium">Recent Updates</h1>
						<div className="text-sm px-3 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
							{newNotifications.length}
						</div>
					</div>
					{newNotifications.length > 0 ? (
						newNotifications.length > 3 ? (
							<div className="flex flex-col gap-y-3">
								<div className="flex flex-col gap-y-3">
									{newNotifications
										.slice(0, 3)
										.map((notification) =>
											returnNotification(notification),
										)}
								</div>
								<Button
									size="md"
									variant="secondary"
									onClick={() =>
										changeTab("notifications", 5)
									}
								>
									<div className="flex items-center justify-center gap-x-3">
										<span>View All</span>
										<ChevronRight className="w-5 h-5" />
									</div>
								</Button>
							</div>
						) : (
							<div className="flex flex-col gap-y-3">
								{newNotifications.map((notification) =>
									returnNotification(notification),
								)}
							</div>
						)
					) : (
						<h1>No recent updates</h1>
					)}
				</div>
			</div>
		</div>
	);
}

export default OrganizerOverview;
