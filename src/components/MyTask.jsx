import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import { formatIsoDate } from "../utils/formatIsoDate";
import { taskPriorityColors, taskStatusColors } from "../utils/constant";
import TaskDetailsModal from "./TaskDetailsModal";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import AiEditor from "./AiEditor";
import { Flame, CircleDot, Clock, CircleCheckBig, MessageSquare } from "lucide-react";

function MyTask({ task, onTaskSubmit, currentMemberId }) {

	const {
		id,
		title,
		description,
		priority,
		status,
		assignedBy,
		deadline
	} = task;

	const { projectId } = useParams();
	const { showToast } = useToast();

	const navigate = useNavigate();

	const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
	const [showSubmitModal, setShowSubmitModal] = useState(false);
	const [completionNote, setCompletionNote] = useState('');
	const [taskBeingSubmitted, setTaskBeingSubmitted] = useState(false);

	async function submitTask() {

		setTaskBeingSubmitted(true);

		try {

			const { updatedTask } = await projectService.changeTaskStatus(
				{
					projectId: projectId,
					taskId: id,
					updateComment: completionNote,
					updatedTaskStatus: "under review"
				}
			);

			onTaskSubmit(id, updatedTask);

			showToast({
				variant: "success",
				title: "Task submitted for review!",
				message: "Your task has been successfully submitted for review"
			});

			setShowSubmitModal(false);

		} catch(err) {

			console.log("The following error occured while submitting task: " + err.message);

		} finally {

			setTaskBeingSubmitted(false);

		}

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
				<div className="flex flex-col gap-y-1">
					<div className="flex items-start">
						<h1 className="font-semibold">
							{ title }
						</h1>
					</div>
					<p className="dark:text-neutral-400 max-h-12 text-ellipsis overflow-hidden">
						{ description }
					</p>
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
						<div className="flex flex-col gap-y-2">
							<span className="text-xs">ASSIGNED BY</span>
							<div className="flex items-center gap-x-2">
								<img src={assignedBy.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
								<span className="dark:text-neutral-300 font-medium">{assignedBy.name}</span>
							</div>
						</div>		
						<div className="dark:text-red-500 text-red-600 flex items-center gap-x-2">
							<Clock className="w-4 h-4" />
							<span>{ formatIsoDate(deadline) }</span>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-3">
					{
						(status === "ongoing" || status === "rejected" || status === "overdue") && (
							<Button 
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									setShowSubmitModal(true)
								}}
								loading={taskBeingSubmitted}
							>
								<div className="flex justify-center items-center gap-x-2 text-sm">
									<CircleCheckBig className="w-4 h-4" />
									<span>Complete</span>
								</div>
							</Button>
						)
					}
					<Button 
						variant="secondary" 
						size="sm" 
						onClick={(e) => {
							e.stopPropagation();
							navigate(`${id}/comments`, {
								state: { 
									task: task,
									currentMemberId: currentMemberId
								}
							})}
						}
					>
						<div className="flex justify-center items-center gap-x-2 text-sm">
							<MessageSquare className="w-4 h-4" />
							<span>Comments</span>
						</div>
					</Button>
				</div>
			</div>
			{
				showTaskDetailsModal && (
					<TaskDetailsModal 
						task={task} 
						projectId={projectId}
						closeModal={() => setShowTaskDetailsModal(false)} 
					/>
				)
			}
			{
				showSubmitModal && (
					<Modal
						titleIcon={<CircleCheckBig />}
						title="Complete Task"
						size="lg"
						closeModal={() => setShowSubmitModal(false)}
					>
						<div className="flex flex-col gap-y-8 px-7 pb-7">
							<AiEditor 
								label="Completion note (optional)"
								placeholder="Describe how you completed this task..."
								rows={7}
								value={completionNote}
								setValue={setCompletionNote}
								disabled={taskBeingSubmitted}
							/>
							<div className="grid grid-cols-2 gap-4">
								<Button
									variant="secondary"
									onClick={() => setShowSubmitModal(false)}
									disabled={taskBeingSubmitted}
								>
									Cancel
								</Button>
								<Button
									variant="primary"
									onClick={submitTask}
									loading={taskBeingSubmitted}
									disabled={taskBeingSubmitted}
								>
									Complete Task
								</Button>
							</div>
						</div>
					</Modal>
				)
			}
		</>
	);

}

export default MyTask;