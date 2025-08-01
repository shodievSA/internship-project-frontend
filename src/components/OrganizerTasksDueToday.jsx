import { useNavigate } from "react-router-dom";
import { taskPriorityColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import { ChevronRight, Clock } from "lucide-react";
import EmptyState from "./EmptyState";

function OrganizerTasksDueToday({ tasksDueToday }) {

	const navigate = useNavigate();

	if (tasksDueToday.length === 0) return <EmptyState message="Nothing on your plate today - enjoy the calm!" />

	return (
		<div className="pb-8">
			<div className="flex flex-col gap-y-5">
				<div>
					<h1>
						You have {tasksDueToday.length} {tasksDueToday.length > 1 ? "tasks" : "task"} due today
					</h1>
				</div>
				<div className="flex flex-col gap-y-5">
					{
						tasksDueToday.map((task) => {
							return (
								<div 
									key={task.id}
									className="flex flex-col gap-y-2 border border-neutral-200 dark:border-neutral-800 
									p-5 rounded-md dark:hover:border-neutral-700 cursor-pointer hover:shadow-md 
									dark:hover:shadow-none group/item transition-[box-shadow] duration-300"
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

export default OrganizerTasksDueToday;