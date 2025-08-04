import { useState } from "react";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { taskPriorityColors, taskStatusColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import {
	Flame,
	CircleDot,
	OctagonX,
	Clock,
	Check,
	X,
	CircleCheckBig,
} from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import AiEditor from "./AiEditor";
import projectService from "../services/projectService";
import { useToast } from "./ui/ToastProvider";
import TaskDetailsModal from "./TaskDetailsModal";

function ReviewTask({ task, onTaskApprove, onTaskReject }) {

	const { id, title, description, priority, status, assignedTo, deadline } = task;

	const { themeMode } = useThemeContext();
	const { projectId } = useParams();
	const { showToast } = useToast();

	const [taskBeingApproved, setTaskBeingApproved] = useState(false);
	const [taskBeingRejected, setTaskBeingRejected] = useState(false);

	const [showApproveTaskModal, setShowApproveTaskModal] = useState(false);
	const [showRejectTaskModal, setShowRejectTaskModal] = useState(false);

	const [approvalComment, setApprovalComment] = useState("");
	const [rejectionComment, setRejectionComment] = useState("");

	const [showTaskDetails, setShowTaskDetails] = useState(false);

	async function approveTask() {
		setTaskBeingApproved(true);

		try {
			const { updatedTask } = await projectService.changeTaskStatus({
				projectId: projectId,
				taskId: id,
				updatedTaskStatus: "closed",
				updateComment: approvalComment,
			});

			onTaskApprove(id, updatedTask);

			showToast({
				variant: "success",
				title: "Task closed!",
				message: "The task has been successfully closed!",
			});

			setShowApproveTaskModal(false);
		} catch (err) {
			console.log(
				"The following error occured while closing task: " +
					err.message,
			);
		} finally {
			setTaskBeingApproved(false);
		}
	}

	async function rejectTask() {
		setTaskBeingRejected(true);

		try {
			const { updatedTask } = await projectService.changeTaskStatus({
				projectId: projectId,
				taskId: id,
				updatedTaskStatus: "rejected",
				updateComment: rejectionComment,
			});

			onTaskReject(id, updatedTask);

			showToast({
				variant: "success",
				title: "Task rejected!",
				message: "The task has been successfully rejected!",
			});

			setShowRejectTaskModal(false);
		} catch (err) {
			console.log(
				"The following error occured while rejection task: " +
					err.message,
			);
		} finally {
			setTaskBeingRejected(false);
		}
	}

	return (
		<>
			<div
				id={"task-" + id}
				className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
				dark:hover:bg-neutral-950 hover:bg-slate-50 border-[1px] p-4 rounded-lg 
				cursor-pointer"
				onClick={() => setShowTaskDetails(true)}
			>
				<div className="flex flex-col gap-y-1">
					<div className="flex items-start">
						<h1 className="font-semibold">{title}</h1>
					</div>
					<ReactMarkdown 
						className={`${themeMode} text-neutral-700 dark:text-neutral-400 max-h-10 
						text-ellipsis overflow-hidden text-sm`}  
						rehypePlugins={[rehypeHighlight]}
					>
						{description}
					</ReactMarkdown>
				</div>
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-5 text-sm">
						<div className="flex gap-x-4">
							<div
								className={`flex items-center gap-x-2 ${taskPriorityColors[priority]} px-3 
							py-1.5 rounded-full`}
							>
								<Flame className="w-4 h-4" />
								<span className="text-xs font-medium">
									{priority} priority
								</span>
							</div>
							<div
								className={`flex items-center gap-x-2 ${taskStatusColors[status]} px-3 
							py-1 rounded-full`}
							>
								<CircleDot className="w-4 h-4" />
								<span className="text-xs font-medium">
									{status}
								</span>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							<span className="text-xs">SUBMITTED BY</span>
							<div className="flex items-center gap-x-2">
								<img
									src={
										assignedTo.avatarUrl ?? userPlaceholder
									}
									className="w-6 h-6 rounded-full"
								/>
								<span className="dark:text-neutral-300 font-medium">
									{assignedTo.name}
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
					<Button
						size="sm"
						variant="primary"
						onClick={(e) => {
							e.stopPropagation();
							setShowApproveTaskModal(true);
						}}
					>
						<div className="flex justify-center items-center gap-x-2 text-sm">
							<Check className="w-4 h-4" />
							<span>Approve</span>
						</div>
					</Button>
					<Button
						size="sm"
						variant="secondary"
						onClick={(e) => {
							e.stopPropagation();
							setShowRejectTaskModal(true);
						}}
					>
						<div className="flex justify-center items-center gap-x-2 text-sm">
							<X className="w-4 h-4" />
							<span>Reject</span>
						</div>
					</Button>
				</div>
			</div>
			{showTaskDetails && (
				<TaskDetailsModal
					task={task}
					projectId={projectId}
					closeModal={() => setShowTaskDetails(false)}
				/>
			)}
			{showApproveTaskModal && (
				<Modal
					title="Approve Submission"
					titleIcon={<CircleCheckBig />}
					size="lg"
					closeModal={() => setShowApproveTaskModal(false)}
				>
					<div className="flex flex-col px-7 pb-7 gap-y-5">
						<AiEditor
							label="Approval comment (optional)"
							placeholder="Add any feedback or comments..."
							value={approvalComment}
							setValue={setApprovalComment}
							rows={5}
						/>
						<div className="grid grid-cols-2 gap-4">
							<Button
								variant="secondary"
								size="md"
								onClick={() => setShowApproveTaskModal(false)}
								disabled={taskBeingApproved}
							>
								Cancel
							</Button>
							<Button
								size="md"
								onClick={approveTask}
								loading={taskBeingApproved}
								disabled={taskBeingApproved}
							>
								Approve Submission
							</Button>
						</div>
					</div>
				</Modal>
			)}
			{showRejectTaskModal && (
				<Modal
					title="Reject Submission"
					titleIcon={<OctagonX />}
					size="lg"
					closeModal={() => setShowRejectTaskModal(false)}
				>
					<div className="flex flex-col px-7 pb-7 gap-y-5">
						<AiEditor
							label="Rejection reason"
							placeholder="Explain what changes are needed..."
							value={rejectionComment}
							setValue={setRejectionComment}
							rows={5}
						/>
						<div className="grid grid-cols-2 gap-4">
							<Button
								variant="secondary"
								size="md"
								onClick={() => setShowRejectTaskModal(false)}
								disabled={taskBeingRejected}
							>
								Cancel
							</Button>
							<Button
								size="md"
								onClick={rejectTask}
								loading={taskBeingRejected}
								disabled={taskBeingRejected}
							>
								Request Changes
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

export default ReviewTask;
