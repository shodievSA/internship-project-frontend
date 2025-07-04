import { useState } from "react";
import { formatIsoDate } from "../utils/formatIsoDate";
import { Calendar, Flame, CircleDot, ChevronRight, History, Clock, List } from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";

function RegularTask({ task }) {

	const {
		title,
		description,
		priority,
		status,
		assignedBy,
		assignedTo,
		subtasks,
		createdAt,
		deadline,
		history
	} = task;

	const [subtasksExpanded, setSubtasksExpanded] = useState(false);
	const [historyExpanded, setHistoryExpanded] = useState(false);

	return (
		<div className="flex flex-col gap-y-8 gap-x-5 dark:border-neutral-800 
		border-[1px] p-6 rounded-md">
			<div className="flex flex-col gap-y-4">
				<h1 className="font-semibold md:text-lg">
					{ title }
				</h1>
				<p className="dark:text-neutral-300 md:text-lg">{ description }</p>
			</div>
				<div className="flex gap-x-5">
					<div className={`flex items-center gap-x-2 ${getPriorityBadge(priority)} px-3 
					py-1 rounded-full`}>
						<Flame className="w-4 h-4" />
						<span className="text-sm font-medium">
							{ priority } priority
						</span>
					</div>
					<div className={`flex items-center gap-x-2 ${getStatusBadge(status)} px-3 
					py-1 rounded-full`}>
						<CircleDot className="w-4 h-4" />
						<span className="text-sm font-medium">{ status }</span>
					</div>
					<div className="flex items-center gap-x-5 grow">
						<div className="flex items-center">
							<div className="flex gap-x-3 items-center">
								<span className="dark:text-neutral-300 font-semibold">Assigned by:</span>
								<img src={assignedBy.avatarUrl ?? userPlaceholder} className="w-8 h-8 rounded-full" /> 
								<span className="dark:text-neutral-300">{assignedBy.name}</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex gap-x-3 items-center">
								<span className="dark:text-neutral-300 font-semibold">Assigned to:</span>
								<img src={assignedTo.avatarUrl ?? userPlaceholder} className="w-8 h-8 rounded-full" /> 
								<span className="dark:text-neutral-300">{assignedTo.name}</span>
							</div>
						</div>
					</div>
				</div>
			<div className="flex flex-col gap-y-5">
				<div className="flex justify-between">									
					{
						subtasks.length > 0 && (
							<div className="flex flex-col gap-y-3">
								<div className="flex items-center gap-x-2">
									<button onClick={() => setSubtasksExpanded(!subtasksExpanded)}>
										<ChevronRight className={`w-5 h-5 ${subtasksExpanded ? "rotate-90" : "rotate-0"}
										transform-rotate duration-200`} />
									</button>
									<List className="w-5 h-5" />
									<div className="flex gap-x-2 items-center">
										<span className="font-medium">Subtasks</span> 
										<div className="flex items-center justify-center w-8 h-8 bg-gray-400/20 
										rounded-full text-sm">
											{subtasks.length}
										</div>
									</div>
								</div>
								{
									subtasksExpanded && (
										<ul className="flex flex-col gap-y-3 pl-10 list-disc dark:text-neutral-300
										border-l-[1px] dark:border-neutral-800 ml-2">
											{
												subtasks.map((subtask) => {
													return (
														<li>{subtask.title}</li>
													)
												})
											}
										</ul>
									)
								}
							</div>
						)
					}
					<div className="flex gap-x-12">
						<div className="dark:text-neutral-300 text-red-600 flex self-start items-center gap-x-2">
							<div className="p-2 rounded-full bg-gray-400/20">
								<Calendar className="w-4 h-4" />
							</div>
							<span>Created:</span>
							{ formatIsoDate(createdAt) }
						</div>															
						<div className="dark:text-red-500 text-red-600 flex self-start items-center gap-x-2">
							<div className="p-2 rounded-full bg-red-500/20">
								<Clock className="w-4 h-4" />
							</div>
							<span>Due:</span>
							{ formatIsoDate(deadline) }
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-y-3">
					<div className="flex items-center gap-x-2">
						<button onClick={() => setHistoryExpanded(!historyExpanded)}>
							<ChevronRight className={`w-5 h-5 ${historyExpanded ? "rotate-90" : "rotate-0"}
							transform-rotate duration-200`} />
						</button>
						<History className="w-5 h-5" />
						<div className="flex gap-x-2 items-center">
							<span className="font-medium">History</span> 
							<div className="flex items-center justify-center w-8 h-8 bg-gray-400/20 
							rounded-full text-sm">
								{history.length}
							</div>
						</div>
					</div>
					{
						historyExpanded && (
							<div className="flex flex-col gap-y-3 pl-6 dark:text-neutral-300
							dark:text-neutral-300 border-l-[1px] dark:border-neutral-800 ml-2">
								{
									history.map((stage, index) => {
										return (
											<div className="flex items-center gap-x-3">
												<span>{ index + 1 }.</span>
												<div className="flex items-center gap-x-2">
													<div className="text-sm dark:border-neutral-800 border-[1px] rounded-full py-2 px-4
													font-medium">
														{stage.status}
													</div> 
													-
													<span className="font-semibold">
														{formatIsoDate(stage.createdAt)}
													</span>
												</div>
											</div>
										)
									})
								}
							</div>
						)
					}
				</div>
			</div>
		</div>
	);

}

function getPriorityBadge(priority) {

	switch(priority) {

		case "high":
			return "bg-red-500 dark:bg-red-800 text-white dark:text-red-50"
		case "middle":
			return "bg-amber-500 dark:bg-amber-800 text-white dark:text-amber-50"
		case "low":
			return "bg-emerald-500 dark:bg-emerald-800 text-white dark:text-emerald-50"

	}

}

function getStatusBadge(status) {

	switch(status) {

		case "ongoing":
			return "bg-blue-500 dark:bg-blue-800 text-white dark:text-blue-50"
		case "under review":
			return "bg-purple-500 dark:bg-purple-800 text-white dark:text-purple-50"
		case "closed":
			return "bg-green-500 dark:bg-green-800 text-white dark:text-green-50"
		case "rejected":
			return "bg-red-500 dark:bg-red-800 text-white dark:text-red-50"
		case "overdue":
			return "bg-orange-500 dark:bg-orange-800 text-white dark:text-orange-50"

	}

}

export default RegularTask;