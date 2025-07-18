import { useState } from "react";
import { formatIsoDate } from "../utils/formatIsoDate";
import TaskDetailsModal from "./TaskDetailsModal";
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

	const [showTaskDetailsModal, setShowTaskDetailsModal] = useState();

	return (
		<>
			<div 
				className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
				dark:hover:bg-neutral-950 hover:bg-slate-100 border-[1px] p-4 rounded-md 
				cursor-pointer"
				onClick={() => setShowTaskDetailsModal(true)}
			>
				<div className="flex flex-col gap-y-2">
					<div className="flex items-start">
						<h1 className="font-semibold md:text-lg">
							{ title }
						</h1>
					</div>
					<p className="dark:text-neutral-400 max-h-11 text-ellipsis overflow-hidden">{ description }</p>
				</div>
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-5 text-sm">
						<div className="flex gap-x-4">
							<div className={`flex items-center gap-x-2 ${taskPriorityColors[priority]} px-3 
							py-1.5 rounded-full`}>
								<Flame className="w-4 h-4" />
								<span className="text-xs font-medium">
									{ priority } priority
								</span>
							</div>
							<div className={`flex items-center gap-x-2 ${taskStatusColors[status]} px-3 
							py-1 rounded-full`}>
								<CircleDot className="w-4 h-4" />
								<span className="text-xs font-medium">{ status }</span>
							</div>
						</div>
						<div className="flex flex-col gap-y-3">
							<div className="flex flex-col gap-y-2">
								<span className="text-xs">ASSIGNED BY</span>
								<div className="flex items-center gap-x-2">
									<img src={assignedBy.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
									<span className="dark:text-neutral-300 font-medium">{assignedBy.name}</span>
								</div>
							</div>		
							<div className="flex flex-col gap-y-2">
								<span className="text-xs">ASSIGNED TO</span>
								<div className="flex items-center gap-x-2">
									<img src={assignedTo.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
									<span className="dark:text-neutral-300 font-medium">{assignedTo.name}</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<div className="text-neutral-500 dark:text-neutral-400 flex items-start 
							items-center gap-x-2">
								<div>
									<Calendar className="w-4 h-4" />
								</div>
								<span>Created:</span>
								{ formatIsoDate(createdAt) }
							</div>															
							<div className="dark:text-red-500 text-red-600 flex items-center gap-x-2">
								<div>
									<Clock className="w-4 h-4" />
								</div>
								<span>Due:</span>
								{ formatIsoDate(deadline) }
							</div>
						</div>
					</div>
				</div>
			</div>
			{
				showTaskDetailsModal && (
					<TaskDetailsModal 
						task={task} 
						closeModal={() => setShowTaskDetailsModal(false)}
					/>
				)
			}
		</>
	);

}

export default RegularTask;