import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { taskPriorityColors, taskStatusColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import { 
	Calendar, 
	Flame, 
	CircleDot, 
	ChevronRight, 
	History, 
	Clock, 
	CircleCheckBig, 
	MessageSquare
} from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import AiEditor from "./AiEditor";
import projectService from "../services/projectService";
import { useToast } from "./ui/ToastProvider";

function MyTask({ task, onTaskSubmit, currentMemberId }) {

	const {
		id,
		title,
		description,
		priority,
		status,
		assignedBy,
		assignedTo,
		createdAt,
		deadline,
		history
	} = task;

	const { projectId } = useParams();
	const { showToast } = useToast();

	const navigate = useNavigate();

	const [historyExpanded, setHistoryExpanded] = useState(false);
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
				className="flex flex-col gap-y-4 gap-x-5 dark:border-neutral-800 
				border-[1px] p-5 rounded-md"
			>
				<div className="flex flex-col gap-y-2">
					<div className="flex justify-between">
						<h1 className="font-semibold md:text-lg">
							{ title }
						</h1>
						<div className="flex gap-x-6">
							<div className={`flex items-center gap-x-1.5 ${taskPriorityColors[priority]} px-3 
							py-1 rounded-full`}>
								<Flame className="w-4 h-4" />
								<span className="text-xs font-medium">
									{ priority } priority
								</span>
							</div>
							<div className={`flex items-center gap-x-2 ${taskStatusColors[status]} px-3 
							py-1 rounded-full`}>
								<CircleDot className="w-4 h-4" />
								<span className="text-xs font-medium">
									{ status }
								</span>
							</div>
						</div>
					</div>
					<p className="dark:text-neutral-400">
						{ description }
					</p>
				</div>
					<div className="flex gap-x-5">
						<div className="flex items-center gap-x-8 grow text-sm">
							<div className="flex gap-x-5">
								<div className="flex items-center">
									<div className="flex gap-x-2 items-center">
										<span className="dark:text-neutral-300">By:</span>
										<img src={assignedBy.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
										<span className="dark:text-neutral-300 font-medium">{assignedBy.name}</span>
									</div>
								</div>
								<div className="flex items-center">
									<div className="flex gap-x-2 items-center">
										<span className="dark:text-neutral-300">To:</span>
										<img src={assignedTo.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
										<span className="dark:text-neutral-300 font-medium">{assignedTo.name}</span>
									</div>
								</div>
							</div>
							<div className="flex justify-between">									
								<div className="flex gap-x-5">
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
									<div className="dark:text-red-500 text-red-600 flex self-start items-center gap-x-2">
										<div className="p-2 rounded-full bg-red-500/20">
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
				<div className="flex flex-col gap-y-5">
					<div className="flex flex-col gap-y-3">
						<div className="flex items-center gap-x-2">
							<button onClick={() => setHistoryExpanded(!historyExpanded)}>
								<ChevronRight className={`w-5 h-5 ${historyExpanded ? "rotate-90" : "rotate-0"}
								transform-rotate duration-200`} />
							</button>
							<div className="flex gap-x-2 items-center text-sm">
								<History className="w-5 h-5" />
								<span className="font-medium">History</span> 
							</div>
						</div>
						{
							historyExpanded && (
								<div className="flex flex-col gap-y-3 pl-6 dark:text-neutral-300
								dark:text-neutral-300 border-l-[1px] dark:border-neutral-800 ml-2">
									{
										history.map((stage, index) => {
											
											const status = stage.status;

											if (status === "ongoing" || status === "overdue") {

												return (
													<div className="flex items-center gap-x-3">
														<span>{ history.length - index }.</span>
														<div className="flex items-center gap-x-2">
															<div className="text-sm dark:border-neutral-800 border-[1px] 
															rounded-full py-1 px-3 font-medium">
																{stage.status}
															</div> 
															-
															<span>
																{ formatIsoDate(stage.createdAt) }
															</span>
														</div>
													</div>
												);

											} else if (status === "rejected" || status === "closed" || status === "under review") {

												return (
													<div className="flex items-center gap-x-3">
														<div className="flex flex-col gap-y-3">
															<div className="flex items-center gap-x-2">
																<span>{ history.length - index }.</span>
																<div className="text-sm dark:border-neutral-800 border-[1px] 
																rounded-full py-1 px-3 font-medium">
																	{ stage.status }
																</div> 
																-
																<span>
																	{ formatIsoDate(stage.createdAt) }
																</span>
															</div>
															<div>
																{
																	stage.comment ? (
																		status === "rejected" ? (
																			<p>
																				<span className="font-medium">Rejection reason:</span> <span className="dark:text-neutral-400">{stage.comment}</span>
																			</p>
																		) : status === "under review" ? (
																			<p>
																				<span className="font-medium">Completion note:</span> <span className="dark:text-neutral-400">{stage.comment}</span>
																			</p>
																		) : (
																			<p>
																				<span className="font-medium">Approval note:</span> <span className="dark:text-neutral-400">{stage.comment}</span>
																			</p>
																		)
																	) : (
																		status === "rejected" ? (
																			<p>No rejection reason</p>
																		) : status === "under review" ? (
																			<p>No completion note</p>
																		) : (
																			<p>No approval note</p>
																		)
																	)
																}
															</div>
														</div>
													</div>
												)

											}

										})
									}
								</div>
							)
						}
					</div>
					<div className="flex gap-x-5">
						{
							(status === "ongoing" || status === "rejected") && (
								<Button 
									size="md"
									onClick={() => setShowSubmitModal(true)}
									loading={taskBeingSubmitted}
								>
									<div className="flex items-center gap-x-2 text-sm">
										<CircleCheckBig className="w-4 h-4" />
										<span>Complete</span>
									</div>
								</Button>
							)
						}
						<Button 
							variant="secondary" 
							size="md" 
							onClick={() => navigate(`${id}/comments`, {
								state: { 
									task: task,
									currentMemberId: currentMemberId
								}
							})}
						>
							<div className="flex items-center gap-x-2 text-sm">
								<MessageSquare className="w-4 h-4" />
								<span>Comments</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
			{
				showSubmitModal && (
					<Modal
						titleIcon={<CircleCheckBig />}
						title="Complete Task"
						size="lg"
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