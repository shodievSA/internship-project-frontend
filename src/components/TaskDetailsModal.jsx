import { useState, useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";
import taskService from "../services/taskService";
import { formatIsoDate } from "../utils/formatIsoDate";
import { taskStatusColors, taskPriorityColors } from "../utils/constant";
import Modal from "./ui/Modal";
import { 
	Calendar, 
	Clock, 
	Download, 
	File, 
	RefreshCw, 
	Text, 
	User, 
	Paperclip, 
	Flame,
	CircleDot,
	History
} from "lucide-react";
// Add import for TimeTrackingTab (to be implemented)
// import TimeTrackingTab from "./TimeTrackingTab";
import TimeTracking from "./TimeTracking";
import TaskDetailsSkeleton from "./TaskDetailsSkeleton";
import TimeTrackingSkeleton from "./TimeTrackingSkeleton";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function TaskDetailsModal({ task, projectId, closeModal }) {

	const {
		id: taskId,
		title,
		description,
		priority,
		status,
		createdAt,
		updatedAt,
		deadline,
		history,
		assignedBy,
		assignedTo,
	} = task;

	const { themeMode } = useThemeContext();

	const [fileUrls, setFileUrls] = useState([]);
	const [fileUrlsLoaded, setFileUrlsLoaded] = useState(false);
	const [activeTab, setActiveTab] = useState("details");
	const [isLoading, setIsLoading] = useState(true);
	const [timeTabLoaded, setTimeTabLoaded] = useState(false);

	useEffect(() => {

		async function getTaskFiles() {

			try {

				const { fileUrls } = await taskService.getTaskFiles(projectId, taskId);

				setFileUrls(fileUrls);

			} catch (err) {

				console.log(err);

			} finally {

				setTimeout(() => {
					setFileUrlsLoaded(true);
					setIsLoading(false);
				}, 400);

			}

		}

		getTaskFiles();

	}, []);

	// Handle tab switching for Time Log tab
	const handleTabChange = (tab) => {

		setActiveTab(tab);

		if (tab === "time" && !timeTabLoaded) {
			// Show skeleton for 400ms when switching to time tab
			setTimeout(() => {
				setTimeTabLoaded(true);
			}, 400);
		}

	};

	function downloadFile(file) {

		const link = document.createElement("a");

		link.href = file.url;
		link.target = "_blank";
		link.download = file.fileName;

		document.body.appendChild(link);

		link.click();
		link.remove();

	}

	return (
		<Modal 
			size="lg" 
			title={title} 
			closeModal={closeModal}
		>
			<div className="flex flex-col gap-y-5 px-5 overflow-y-auto scrollbar-thin 
			dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800">
				{/* Tab Switcher */}
				<div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1 mb-4">
					<button
						className={`flex items-center gap-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
							activeTab === "details"
								? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm"
								: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
						}`}
						onClick={() => handleTabChange("details")}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
						Details
					</button>
					<button
						className={`flex items-center gap-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
							activeTab === "time"
								? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm"
								: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
						}`}
						onClick={() => handleTabChange("time")}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Time Log
					</button>
				</div>

				{activeTab === "details" && (
					<div className="max-h-[500px]">
						{!fileUrlsLoaded ? (
							<TaskDetailsSkeleton />
						) : (
							<div className="flex flex-col gap-y-5 pb-5">
								<div className="flex gap-x-3">
									<div className={`flex items-center gap-x-2 px-4 py-1.5 rounded-full 
									text-xs ${taskPriorityColors[task.priority]}`}>
										<Flame className="w-4 h-4" />
										{priority} priority
									</div>
									<div className={`flex items-center gap-x-2 px-4 py-1.5 rounded-full 
									text-xs ${taskStatusColors[task.status]}`}>
										<CircleDot className="w-4 h-4" />
										{status}
									</div>
								</div>
								<div className="flex flex-col gap-y-2 border dark:border-neutral-700 p-3 rounded-lg">
									<div className="flex items-center gap-x-2">
										<Text className="w-4 h-4" />
										<h1 className="font-medium">Description:</h1>
									</div>
									<ReactMarkdown 
										className={`${themeMode} text-neutral-700 dark:text-neutral-400 text-sm`} 
										rehypePlugins={[rehypeHighlight]}
									>
										{ description }
									</ReactMarkdown>
								</div>
								<div className="grid grid-cols-2 gap-x-5">
									<div className="flex flex-col gap-y-4 border dark:border-neutral-700 p-3 rounded-lg">
										<div className="flex items-center gap-x-2">
											<User className="w-4 h-4" />
											<h1 className="font-medium">Assignment</h1>
										</div>
										<div className="flex flex-col gap-y-4 text-sm">
											<div className="flex flex-col gap-y-2">
												<h1 className="dark:text-neutral-300">
													Assigned To
												</h1>
												<div className="flex gap-x-2 items-center">
													<img
														src={
															assignedTo.avatarUrl
														}
														className="w-7 h-7 rounded-full"
													/>
													<div className="flex flex-col">
														<h1 className="font-medium">
															{assignedTo.name}
														</h1>
														<h2>
															{assignedTo.email}
														</h2>
													</div>
												</div>
											</div>
											<div className="flex flex-col gap-y-2">
												<h1 className="dark:text-neutral-300">
													Assigned By
												</h1>
												<div className="flex gap-x-2 items-center">
													<img
														src={
															assignedBy.avatarUrl
														}
														className="w-7 h-7 rounded-full"
													/>
													<div className="flex flex-col">
														<h1 className="font-medium">
															{assignedBy.name}
														</h1>
														<h2>
															{assignedBy.email}
														</h2>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col gap-y-4 border dark:border-neutral-700 p-3 rounded-lg">
										<div className="flex items-center gap-x-2">
											<Calendar className="w-4 h-4" />
											<h1 className="font-medium">Timeline</h1>
										</div>
										<div className="flex flex-col gap-y-3 text-sm">
											<div className="flex flex-col gap-y-1">
												<h1 className="dark:text-neutral-300">Created</h1>
												<div className="flex items-center gap-x-2">
													<Calendar className="text-neutral-500 dark:text-neutral-400 w-4 h-4" />
													<span className="mt-0.5">{ formatIsoDate(createdAt) }</span>
												</div>
											</div>
											<div className="flex flex-col gap-y-1">
												<h1 className="dark:text-neutral-300">Deadline</h1>
												<div className="flex items-center gap-x-2">
													<Clock className="text-neutral-500 dark:text-neutral-400 w-4 h-4" />
													<span className="mt-0.5">{ formatIsoDate(deadline) }</span>
												</div>
											</div>
											<div className="flex flex-col gap-y-1">
												<h1 className="dark:text-neutral-300">Updated</h1>
												<div className="flex items-center gap-x-2">													
													<RefreshCw className="text-neutral-500 dark:text-neutral-400 w-4 h-4" />
													<span className="mt-0.5">{ formatIsoDate(updatedAt) }</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-y-2 border dark:border-neutral-700 p-3 rounded-lg">
									<div className="flex items-center gap-x-2">
										<Paperclip className="w-4 h-4" />
										<h1 className="font-medium">Attachments</h1>
									</div>
									{fileUrlsLoaded &&
										(fileUrls.length > 0 ? (
											<div className="flex flex-col gap-y-2">
												{fileUrls.map((file) => {
													return (
														<div
															key={file.fileName}
															className="flex py-2 px-4 rounded-lg gap-x-3 border border-neutral-200
															dark:border-neutral-800"
														>
															<div className="flex items-center">
																<File className="w-5 h-5" />
															</div>
															<div className="flex flex-col">
																<span className="text-sm">{ file.fileName }</span>
																<div className="flex gap-x-2 text-xs">
																	<span>{file.size}{" "}MB</span>
																</div>
															</div>
															<div
																onClick={() => downloadFile(file)}
																className="flex items-center ml-auto px-2 py-1 rounded-lg hover:bg-neutral-100 
																hover:dark:bg-neutral-900 cursor-pointer"
															>
																<Download className="w-5 h-5" />
															</div>
														</div>
													);
												})}
											</div>
										) : (
											<div className="text-sm text-neutral-500 dark:text-neutral-400">
												<h1>No file attachments</h1>
											</div>
										))}
								</div>
								<div className="flex flex-col gap-y-5 border dark:border-neutral-700 p-3 rounded-lg">
									<div className="flex items-center gap-x-2">
										<History className="w-4 h-4" />
										<h1 className="font-medium">Activity History</h1>
									</div>
									<div className="flex flex-col gap-y-5 pl-6 dark:text-neutral-300 dark:text-neutral-300 
									border-l-[1px] dark:border-neutral-800 ml-2">
										{history.map((stage, index) => {
											const status = stage.status;
											if (status === "ongoing" || status === "overdue") {

												return (
													<div key={index} className="flex items-center gap-x-3">
														<span>{history.length - index}.</span>
														<div className="flex items-center gap-x-2">
															<div className={`text-xs dark:border-neutral-800 border-[1px] 
															rounded-full py-1 px-2 font-medium ${taskStatusColors[stage.status]}`}>
																{stage.status}
															</div>
															-
															<span className="text-xs">{ formatIsoDate(stage.createdAt) }</span>
														</div>
													</div>
												);

											} else if (status === "rejected" || status === "closed" || status === "under review") {

												return (
													<div
														key={index}
														className="flex items-center gap-x-3"
													>
														<div className="flex flex-col gap-y-3">
															<div className="flex items-center gap-x-2">
																<span>{history.length - index}.</span>
																<div className={`text-xs dark:border-neutral-800 border-[1px] 
																rounded-full py-1 px-2 font-medium ${taskStatusColors[stage.status]}`}>
																	{ stage.status }
																</div>
																-
																<span className="text-xs">{formatIsoDate(stage.createdAt)}</span>
															</div>
															<div className="text-sm">
																{stage.comment ? (
																	status === "rejected" ? (
																		<p>
																			<span className="font-medium">
																				Rejection reason:
																			</span>{" "}
																			<span className="dark:text-neutral-400">
																				{ stage.comment }
																			</span>
																		</p>
																	) : status === "under review" ? (
																		<p>
																			<span className="font-medium">
																				Completion note:
																			</span>{" "}
																			<span className="dark:text-neutral-400">
																				{ stage.comment }
																			</span>
																		</p>
																	) : (
																		<p>
																			<span className="font-medium">
																				Approval note:
																			</span>{" "}
																			<span className="dark:text-neutral-400">
																				{
																					stage.comment
																				}
																			</span>
																		</p>
																	)
																) : status === "rejected" ? (
																	<p>No rejection reason</p>
																) : status === "under review" ? (
																	<p>No completion note</p>
																) : (
																	<p>No approval note</p>
																)}
															</div>
														</div>
													</div>
												);

											}
											return null;
										})}
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{activeTab === "time" && (
					<div className="min-h-[500px]">
						{!timeTabLoaded ? (
							<TimeTrackingSkeleton />
						) : (
							<TimeTracking
								taskTitle={title}
								taskStatus={status}
								taskPriority={priority}
								taskId={taskId}
								projectId={projectId}
							/>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
}

export default TaskDetailsModal;
