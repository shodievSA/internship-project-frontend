import { useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import { taskPriorityColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import { ChevronRight, Clock } from "lucide-react";

function OrganizerTasksForReview({ tasksForReviews }) {
	const navigate = useNavigate();

	if (tasksForReviews.length === 0)
		return (
			<EmptyState
				message={
					"All clear! No submissions begging for your feedback today!"
				}
			/>
		);

	return (
		<div className="grow pb-8">
			<div className="flex flex-col gap-y-5">
				<div>
					<h1>
						You have {tasksForReviews.length}{" "}
						{tasksForReviews.length > 1 ? "tasks" : "task"} to
						review
					</h1>
				</div>
				<div className="flex flex-col gap-y-5">
					{tasksForReviews.map((task) => {
						return (
							<div
								className="flex flex-col gap-y-2 border border-neutral-200 hover:shadow-md 
									dark:hover:shadow-none dark:border-neutral-800 dark:hover:border-neutral-700 
									p-5 rounded-md group/item cursor-pointer"
								onClick={() =>
									navigate(
										`/projects/${task.from.projectId}/review-tasks#task-${task.id}`,
									)
								}
							>
								<div className="flex justify-between">
									<span className="font-medium text-lg">
										{task.title}
									</span>
									<div className="flex items-center gap-x-5">
										<span
											className={`${taskPriorityColors[task.priority]} text-sm px-3 
											rounded-full py-0.5`}
										>
											{task.priority}
										</span>
										<div className="flex items-center gap-x-2">
											<Clock className="w-4 h-4" />
											<span>
												{formatIsoDate(task.deadline)}
											</span>
										</div>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="flex gap-x-3">
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
									<div className="opacity-0 group-hover/item:opacity-100">
										<ChevronRight className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default OrganizerTasksForReview;
