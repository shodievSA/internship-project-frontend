import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatIsoDate } from "../utils/formatIsoDate";
import { taskStatusColors } from "../utils/constant";
import { taskPriorityColors } from "../utils/constant";
import { 
	Calendar, 
	Flame, 
	CircleDot, 
	ChevronRight, 
	History, 
	Clock, 
	EllipsisVertical, 
	MessageSquare, 
	SquarePen, 
	Trash2
} from "lucide-react";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import TaskDeleteModal from "./TaskDeleteModal";
import UpdateTaskModal from "./UpdateTaskModal";

function AssignedTask({ projectId, task, team }) {

	const {
		id,
		title,
		description,
		priority,
		status,
		assignedTo,
		createdAt,
		deadline,
		history
	} = task;

	const navigate = useNavigate();

	const [historyExpanded, setHistoryExpanded] = useState(false);
	const [editButtonClicked, setEditButtonClicked] = useState(false);
	const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
	const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);

	const dropDownMenuRef = useRef();

	useEffect(() => {

		function handleClickOutside(e) {

			if (editButtonClicked && !dropDownMenuRef.current.contains(e.target)) {
				setEditButtonClicked(false);
			}
			
		}

		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
		
	}, [editButtonClicked]);

	console.log(history)

	return (
		<>
			<div className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
			border-[1px] p-5 rounded-md">
				<div className="flex flex-col gap-y-4">
					<div className="flex items-center justify-between">
						<h1 className="font-semibold md:text-lg">
							{ title }
						</h1>
						<div className="flex gap-x-6">
							<div className="flex gap-x-6">
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
							<div className="relative" ref={dropDownMenuRef}>
								<button 
									className="px-1 py-1.5 dark:hover:bg-neutral-900 rounded-md"
									onClick={() => setEditButtonClicked(!editButtonClicked)}
								>
									{ <EllipsisVertical className="w-5 h-5" /> }
								</button>
								{
									editButtonClicked && (
										<ul className="absolute flex flex-col bg-white dark:bg-neutral-950 w-max 
										rounded-md dark:border-neutral-800 border-[1px] right-0 mt-2 shadow-md">
											<li className="flex items-center p-1.5 border-b-[1px] dark:border-neutral-800
											cursor-pointer">
												<div 
													className="px-2 py-1.5 flex items-center gap-x-2 rounded-md dark:hover:bg-neutral-900
													hover:bg-slate-100 w-full"
													onClick={() => {
														setShowUpdateTaskModal(true);
														setEditButtonClicked(false);
													}}
												>
													<SquarePen className="w-4 h-4" />
													<span>Edit Task</span>
												</div>
											</li>
											<li className="flex items-center p-1.5 text-red-700 cursor-pointer">
												<div 
													className="px-2 py-1.5 flex items-center gap-x-2 rounded-md dark:hover:bg-neutral-900
													hover:bg-slate-100 w-full"
													onClick={() => {
														setShowDeleteTaskModal(true);
														setEditButtonClicked(false);
													}}
												>
													<Trash2 className="w-4 h-4" />
													<span>Delete Task</span>
												</div>
											</li>
										</ul>
									)
								}
							</div>
						</div>
					</div>
					<p className="dark:text-neutral-400">{ description }</p>
				</div>
				<div className="flex gap-x-5">
					<div className="flex items-center gap-x-5 grow">
						<div className="flex items-center">
							<div className="flex gap-x-6 items-center text-sm">
								<div className="flex">
									<div className="flex items-center gap-x-2">
										<span className="dark:text-neutral-300">To:</span>
										<img src={assignedTo.avatarUrl ?? userPlaceholder} className="w-6 h-6 rounded-full" /> 
										<span className="dark:text-neutral-300 font-medium">{assignedTo.name}</span>
									</div>
								</div>
								<div className="flex gap-x-5">
									<div className="text-neutral-500 dark:text-neutral-400 flex items-start 
									items-center gap-x-2">
										<div className="p-2 rounded-full bg-gray-400/20">
											<Calendar className="w-4 h-4" />
										</div>
										<span>Created:</span>
										{ formatIsoDate(createdAt) }
									</div>															
									<div className="dark:text-red-500 text-red-600 flex items-center gap-x-2">
										<div className="p-2 rounded-full bg-red-500/20">
											<Clock className="w-4 h-4" />
										</div>
										<span>Due:</span>
										{ formatIsoDate(deadline) }
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
								<div className="flex flex-col gap-y-5 pl-6 dark:text-neutral-300
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
						<Button 
							variant="secondary" 
							size="md"
							onClick={() => navigate(`${id}/comments`, {
								state: {
									taskTitle: title
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
				showDeleteTaskModal && (
					<TaskDeleteModal 
						projectId={projectId}
						taskId={id}
						taskTitle={title} 
						closeModal={() => setShowDeleteTaskModal(false)}
					/>
				)
			}
			{
				showUpdateTaskModal && (
					<UpdateTaskModal 
						projectId={projectId}
						task={task} 
						team={team} 
						closeModal={() => setShowUpdateTaskModal(false)}
					/>
				)
			}
		</>
	);

}

export default AssignedTask;