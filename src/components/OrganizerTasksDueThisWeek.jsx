import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import { taskPriorityColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import { ChevronRight, Clock } from "lucide-react";

function OrganizerTasksDueThisWeek({ tasksDueThisWeek }) {

	const navigate = useNavigate();

	if (tasksDueThisWeek.length === 0) return <EmptyState message={"You're off the hook - this week’s task list is empty!"} />

	return (
		<div className="grow pb-8">
			<div className="flex flex-col gap-y-5">
				<div>
					<h1>
						You have {tasksDueThisWeek.length} {tasksDueThisWeek.length > 1 ? "tasks" : "task"} due this week
					</h1>
				</div>
				<div className="flex flex-col gap-y-5">
					{
						tasksDueThisWeek.map((task) => {
							return (
								<div 
									key={task.id}
									className="flex flex-col gap-y-2 border border-neutral-200 dark:border-neutral-800 
									p-5 rounded-md dark:hover:border-neutral-700 cursor-pointer hover:shadow-md dark:hover:shadow-none
									group/item transition-[box-shadow] duration-300"
									onClick={() => navigate(`/projects/${task.from.projectId}/my-tasks#task-${task.id}`)}
								>
									<div className="flex justify-between">
										<span className="font-medium text-lg">{ task.title }</span>
										<div className="flex items-center gap-x-5">
											<span className={`${taskPriorityColors[task.priority]} text-sm px-3 
											rounded-full py-0.5`}>
												{ task.priority }
											</span>
											<div className="flex items-center gap-x-2">
												<Clock className="w-4 h-4" />
												<span>{ formatIsoDate(task.deadline) }</span>
											</div>
										</div>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex gap-x-3">
											<span>In: <span className="font-medium">{ task.from.projectName }</span></span>
											<span>Assigned by: <span className="font-medium">{ task.assignedBy.name }</span></span>
										</div>
										<div className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
										duration-300">
											<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)

}

export default OrganizerTasksDueThisWeek;