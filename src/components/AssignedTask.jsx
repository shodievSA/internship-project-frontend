import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatIsoDate } from "../utils/formatIsoDate";
import { taskStatusColors } from "../utils/constant";
import { taskPriorityColors } from "../utils/constant";
import userPlaceholder from "../assets/user-placeholder.png";
import Button from "./ui/Button";
import TaskDeleteModal from "./TaskDeleteModal";
import UpdateTaskModal from "./UpdateTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import {
	Flame,
	CircleDot,
	Clock,
	EllipsisVertical,
	MessageSquare,
	SquarePen,
	Trash2,
} from "lucide-react";

function AssignedTask({ task, team, currentMemberId }) {
	const { id, title, description, priority, status, assignedTo, deadline } =
		task;

	const { projectId } = useParams();
	const navigate = useNavigate();

	const [editButtonClicked, setEditButtonClicked] = useState(false);
	const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
	const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
	const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

	const dropDownMenuRef = useRef();

	useEffect(() => {
		function handleClickOutside(e) {
			if (
				editButtonClicked &&
				!dropDownMenuRef.current.contains(e.target)
			) {
				setEditButtonClicked(false);
			}
		}

		document.addEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, [editButtonClicked]);

	return (
		<>
			<div
				className="flex flex-col gap-y-5 gap-x-5 dark:border-neutral-800 
				dark:hover:bg-neutral-950 hover:bg-slate-50 border-[1px] p-4 rounded-lg 
				cursor-pointer"
				onClick={() => setShowTaskDetailsModal(true)}
			>
				<div className="flex flex-col">
					<div className="flex items-start justify-between gap-x-3 gap-y-1">
						<h1 className="font-semibold truncate">{title}</h1>
						<div className="flex items-start">
							<div className="relative" ref={dropDownMenuRef}>
								<button
									className="px-1 py-1.5 hover:bg-slate-200 dark:hover:bg-neutral-900 
									rounded-md"
									onClick={(e) => {
										e.stopPropagation();
										setEditButtonClicked(
											!editButtonClicked,
										);
									}}
								>
									{<EllipsisVertical className="w-4 h-4" />}
								</button>
								{editButtonClicked && (
									<ul
										className="absolute flex flex-col bg-white dark:bg-neutral-950 w-max 
										rounded-md dark:border-neutral-800 border-[1px] right-0 mt-2 shadow-md
										text-sm"
									>
										<li
											className="flex items-center p-1 border-b-[1px] dark:border-neutral-800
											cursor-pointer"
										>
											<div
												className="px-2 py-1.5 flex items-center gap-x-2 rounded-md dark:hover:bg-neutral-900
													hover:bg-slate-100 w-full"
												onClick={(e) => {
													e.stopPropagation();
													setShowUpdateTaskModal(
														true,
													);
													setEditButtonClicked(false);
												}}
											>
												<SquarePen className="w-3.5 h-3.5" />
												<span>Edit Task</span>
											</div>
										</li>
										<li className="flex items-center p-1.5 text-red-700 cursor-pointer">
											<div
												className="px-2 py-1.5 flex items-center gap-x-2 rounded-md dark:hover:bg-neutral-900
													hover:bg-slate-100 w-full"
												onClick={(e) => {
													e.stopPropagation();
													setShowDeleteTaskModal(
														true,
													);
													setEditButtonClicked(false);
												}}
											>
												<Trash2 className="w-3.5 h-3.5" />
												<span>Delete Task</span>
											</div>
										</li>
									</ul>
								)}
							</div>
						</div>
					</div>
					<p className="dark:text-neutral-400 max-h-12 text-ellipsis overflow-hidden">
						{description}
					</p>
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
							<span className="text-xs">ASSIGNED TO</span>
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
					<div>
						<Button
							variant="secondary"
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								navigate(`${id}/comments`, {
									state: {
										task: task,
										currentMemberId: currentMemberId,
									},
								});
							}}
						>
							<div className="flex items-center gap-x-2 text-sm">
								<MessageSquare className="w-4 h-4" />
								<span>Comments</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
			{showTaskDetailsModal && (
				<TaskDetailsModal
					task={task}
					projectId={projectId}
					closeModal={() => setShowTaskDetailsModal(false)}
				/>
			)}
			{showDeleteTaskModal && (
				<TaskDeleteModal
					projectId={projectId}
					taskId={id}
					taskTitle={title}
					closeModal={() => setShowDeleteTaskModal(false)}
				/>
			)}
			{showUpdateTaskModal && (
				<UpdateTaskModal
					projectId={projectId}
					task={task}
					team={team}
					closeModal={() => setShowUpdateTaskModal(false)}
				/>
			)}
		</>
	);
}

export default AssignedTask;
