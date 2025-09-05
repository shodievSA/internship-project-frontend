import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import { formatIsoDate } from "../utils/formatIsoDate";
import { taskPriorityColors, taskStatusColors } from "../utils/constant";
import TaskDetailsWithLogModal from "./TaskDetailsWithLogModal";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import SubmitTaskModal from "./SubmitTaskModal";
import { Flame, CircleDot, Clock, CircleCheckBig, MessageSquare } from "lucide-react";

function MyTask({ task, onTaskSubmit }) {

	const { id, title, priority, status, assignedBy, deadline } = task;

	const { projectId } = useParams();

	const navigate = useNavigate();

	const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
	const [showSubmitModal, setShowSubmitModal] = useState(false);

	async function submitTask(submissionNote) {

		const { updatedTask } = await taskService.changeTaskStatus({
			projectId: projectId,
			taskId: id,
			updateComment: submissionNote,
			updatedTaskStatus: "under review",
		});

		onTaskSubmit(id, updatedTask);
		
	}

	return (
		<>
			<div
				id={"task-" + task.id}
				className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
				dark:hover:bg-neutral-950 hover:bg-slate-50 border-[1px] p-4 rounded-lg 
				cursor-pointer"
				onClick={() => setShowTaskDetailsModal(true)}
			>
				<div>
					<h1 className="font-semibold truncate">{title}</h1>
				</div>
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-5 text-sm">
						<div className="flex gap-x-4">
							<div className={`flex items-center gap-x-2 ${taskPriorityColors[priority]} px-3 
							py-1.5 rounded-full`}>
								<Flame className="w-4 h-4" />
								<span className="text-xs font-medium">
									{priority} priority
								</span>
							</div>
							<div className={`flex items-center gap-x-2 ${taskStatusColors[status]} px-3 
							py-1 rounded-full`}>
								<CircleDot className="w-4 h-4" />
								<span className="text-xs font-medium">
									{status}
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<span className="text-xs">ASSIGNED BY</span>
							<div className="flex items-center gap-x-2">
								<img
									src={assignedBy.avatarUrl ?? userPlaceholder}
									className="w-6 h-6 rounded-full"
								/>
								<span className="dark:text-neutral-300 font-medium">
									{assignedBy.name}
								</span>
							</div>
						</div>
						<div className="dark:text-red-500 text-red-600 flex items-center gap-x-2">
							<Clock className="w-4 h-4" />
							<span>{formatIsoDate(deadline)}</span>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-3">
					{
						(shouldAllowToSubmit(status)) && (
							<Button
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									setShowSubmitModal(true);
								}}
							>
								<div className="flex justify-center items-center gap-x-2 text-sm">
									<CircleCheckBig className="w-4 h-4" />
									<span>Submit</span>
								</div>
							</Button>
						)
					}
					<Button
						variant="secondary"
						size="sm"
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/projects/${projectId}/${id}/comments`);
						}}
					>
						<div className="flex justify-center items-center gap-x-2 text-sm">
							<MessageSquare className="w-4 h-4" />
							<span>Comments</span>
						</div>
					</Button>
				</div>
			</div>
			{showTaskDetailsModal && (
				<TaskDetailsWithLogModal
					taskId={id}
					closeModal={() => setShowTaskDetailsModal(false)}
				/>
			)}
			{showSubmitModal && (
				<SubmitTaskModal 
					onTaskSubmit={submitTask}
					onClose={() => setShowSubmitModal(false)}
				/>
			)}
		</>
	);

}

function shouldAllowToSubmit(taskStatus) {

	return (taskStatus !== "under review" && taskStatus !== "closed");

}

export default MyTask;
