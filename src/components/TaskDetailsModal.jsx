import Modal from "./ui/Modal";
import { taskStatusColors } from "../utils/constant";
import { taskPriorityColors } from "../utils/constant";
import { Calendar, Clock, RefreshCw } from "lucide-react";
import { formatIsoDate } from "../utils/formatIsoDate";

function TaskDetailsModal({ task, closeModal }) {

	const {
		title,
		description,
		priority,
		status,
		createdAt,
		updatedAt,
		deadline,
		history,
		assignedBy, 
		assignedTo
	} = task;

	return (
		<Modal size="lg" title={title} closeModal={closeModal}>
			<div className="flex flex-col gap-y-5 px-5 pb-5">
				<div className="flex gap-x-3">
					<div className={`px-4 py-1 rounded-full text-sm ${taskPriorityColors[task.priority]}`}>
						{priority}
					</div>
					<div className={`px-4 py-1 rounded-full text-sm ${taskStatusColors[task.status]}`}>
						{status}
					</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<h1 className="font-medium text-lg">Description:</h1>
					<p className="text-slate-500 dark:text-neutral-400">{ description }</p>
				</div>
				<div className="flex gap-x-20">
					<div className="flex flex-col gap-y-4">
						<h1 className="font-medium text-lg">Assignment</h1>
						<div className="flex flex-col gap-y-4 text-sm">
							<div className="flex flex-col gap-y-2">
								<h1 className="dark:text-neutral-300">Assigned To</h1>
								<div className="flex gap-x-2 items-center">
									<img src={assignedTo.avatarUrl} className="w-7 h-7 rounded-full" />
									<div className="flex flex-col">
										<h1 className="font-medium">{assignedTo.name}</h1>
										<h2>{assignedTo.email}</h2>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-y-2">
								<h1 className="dark:text-neutral-300">Assigned By</h1>
								<div className="flex gap-x-2 items-center">
									<img src={assignedBy.avatarUrl} className="w-7 h-7 rounded-full" />
									<div className="flex flex-col">
										<h1 className="font-medium">{assignedBy.name}</h1>
										<h2>{assignedBy.email}</h2>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-y-4">
						<h1 className="font-medium text-lg">Timeline</h1>
						<div className="flex flex-col gap-y-3 text-sm">
							<div className="flex flex-col gap-y-1">
								<h1 className="dark:text-neutral-300">Created:</h1>
								<div className="flex items-center gap-x-2">
									<Calendar className="text-neutral-500 dark:text-neutral-400 w-4 h-4" />								
									<span className="mt-0.5">{ formatIsoDate(createdAt) }</span>
								</div>				
							</div>
							<div className="flex flex-col gap-y-1">
								<h1 className="dark:text-neutral-300">Deadline:</h1>
								<div className="flex items-center gap-x-2">
									<div>
										<Clock className="dark:text-red-500 text-red-600 w-4 h-4" />
									</div>
									<span className="mt-0.5">{ formatIsoDate(deadline) }</span>
								</div>
							</div>
							<div className="flex flex-col gap-y-1">
								<h1 className="dark:text-neutral-300">Updated:</h1>
								<div className="flex items-center gap-x-2">
									<div>
										<RefreshCw className="text-neutral-500 dark:text-neutral-400 w-4 h-4" />
									</div>
									<span className="mt-0.5">{ formatIsoDate(updatedAt) }</span>
								</div>				
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<h1 className="font-medium text-lg">Activity History</h1>
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
												<div className={`text-sm dark:border-neutral-800 border-[1px] 
												rounded-full py-1 px-3 font-medium ${taskStatusColors[stage.status]}`}>
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
													<div className={`text-sm dark:border-neutral-800 border-[1px] 
													rounded-full py-1 px-3 font-medium ${taskStatusColors[stage.status]}`}>
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
				</div>
			</div>
		</Modal>
	)

}

export default TaskDetailsModal;