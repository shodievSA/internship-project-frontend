import { formatIsoDate } from "../utils/formatIsoDate";
import { Calendar, Flame, CircleDot, Clock } from "lucide-react";
import { taskPriorityColors, taskStatusColors } from "../utils/constant";
import userPlaceholder from "../assets/user-placeholder.png";

function RegularTask({ task }) {

	const {
		title,
		description,
		priority,
		status,
		assignedBy,
		assignedTo,
		createdAt,
		deadline
	} = task;

	return (
		<div className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
		border-[1px] p-5 rounded-md">
			<div className="flex flex-col gap-y-4">
				<div className="flex justify-between items-center">
					<h1 className="font-semibold md:text-lg">
						{ title }
					</h1>
					<div className="flex gap-x-6">
						<div className={`flex items-center gap-x-1.5 ${taskPriorityColors[priority]} px-3 
						py-1.5 rounded-full`}>
							<Flame className="w-4 h-4" />
							<span className="text-xs font-medium ">
								{ priority } priority
							</span>
						</div>
						<div className={`flex items-center gap-x-2 ${taskStatusColors[status]} px-3 
						py-1 rounded-full`}>
							<CircleDot className="w-4 h-4" />
							<span className="text-xs font-medium ">{ status }</span>
						</div>
					</div>
				</div>
				<p className="dark:text-neutral-400">{ description }</p>
			</div>
			<div className="flex gap-x-5">
				<div className="flex items-center gap-x-8 grow text-sm">
					<div className="flex items-center gap-x-5">
						<div className="flex items-center text-sm">
							<div className="flex gap-x-2 items-center">
								<span className="dark:text-neutral-300">By:</span>
								<img src={assignedBy.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
								<span className="dark:text-neutral-300 font-medium">
									{assignedBy.name}
								</span>
							</div>
						</div>
						<div className="flex items-center text-sm">
							<div className="flex gap-x-2 items-center">
								<span className="dark:text-neutral-300">To:</span>
								<img src={assignedTo.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
								<span className="dark:text-neutral-300 font-medium">
									{assignedTo.name}
								</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-x-5">
						<div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center 
						items-center gap-x-2">
							<div className="flex justify-center items-center w-8 h-8 rounded-full 
							bg-neutral-500/20 dark:bg-neutral-300/20">
								<Calendar className="w-4 h-4" />
							</div>
							<div>
								<span>Created: { formatIsoDate(createdAt) }</span>
							</div>
						</div>															
						<div className="text-sm dark:text-red-500 text-red-600 flex items-center 
						items-center gap-x-2">
							<div className="flex justify-center items-center w-8 h-8 rounded-full 
							bg-red-500/20 dark:bg-red-500/20">
								<Clock className="w-4 h-4" />
							</div>
							<div>
								<span>Due: { formatIsoDate(deadline) }</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default RegularTask;