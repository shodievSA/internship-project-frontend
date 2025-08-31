import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import EditSprintModal from "./EditSprintModal";
import DeleteSprintModal from "./DeleteSprintModal";
import NewTaskModal from "./NewTaskModal";
import Button from "./ui/Button";
import { ArrowLeft, Settings, SquarePen, Trash2, Plus } from "lucide-react";

function ProjectSprintHeader({ 
	projectId, 
	sprintId, 
	sprintMetaData,
	setSprintMetaData, 
	sprintTasks,
	setSprintTasks
}) {

	const { refetchProject, setSprints } = useProject();

	const [showDeleteSprintModal, setShowDeleteSprintModal] = useState(false);
	const [showEditSprintModal, setShowEditSprintModal] = useState(false);
	const [showNewTaskModal, setShowNewTaskModal] = useState(false);
	const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);

	const navigate = useNavigate();

	const settingsMenuRef = useRef(null);

	function onSprintUpdate(updatedSprint) {

		setSprintMetaData(updatedSprint);

	}

	function onNewTaskCreated(newTask) {

		setSprintTasks([newTask, ...sprintTasks]);

	}

	function onSprintDelete(deletedSprintId) {

		setSprints((prevSprints) => prevSprints.filter((sprint) => {
			return sprint.id != deletedSprintId;
		}));

	}

	useEffect(() => {
	
		function handleClickOutside(event) {

			if (
				settingsButtonClicked &&
				!settingsMenuRef.current.contains(event.target)
			) {
				setSettingsButtonClicked(false);
			}

		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	
	}, [settingsButtonClicked]);

	useEffect(() => {

		refetchProject();

	}, [sprintTasks, sprintMetaData]);

	return (
		<>
			<header className="flex items-center justify-between">
				<div className="flex gap-x-4 items-center">
					<Button
						size="sm"
						variant="secondary"
						onClick={() => navigate(-1)}
					>
						<div className="flex items-center gap-x-2">
							<ArrowLeft className="w-4 h-4" />
							<span>Back to project</span>
						</div>
					</Button>
					<div className="flex flex-col">
						<h1 className="font-semibold truncate">
							{sprintMetaData.title}
						</h1>
						<div className="flex text-sm text-slate-500 dark:text-neutral-500 gap-x-2">
							<h3>Sprint #{sprintMetaData.sprintNumber}</h3>
							<h3>{sprintTasks.length} tickets</h3>
						</div>
					</div>
				</div>
				<div className="flex gap-x-5">
					<div ref={settingsMenuRef} className="relative">
						<button
							className="p-2 hover:bg-slate-50 dark:hover:bg-neutral-900 rounded-lg"
							onClick={() => setSettingsButtonClicked(true)}
						>
							<Settings className="w-5 h-5" />
						</button>
						<div
							className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md border-neutrals-200 border-[1px] 
							rounded-md flex flex-col absolute w-[150px] mt-3 left-0 ${settingsButtonClicked
								? "opacity-100"
								: "opacity-0 pointer-events-none"
							} transition-[opacity] duration-200 z-20 text-sm`}
						>
							<div className="flex flex-col border-b-[1px] dark:border-neutral-800 border-neutral-200 p-1">
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex 
									items-center gap-x-2 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowEditSprintModal(true);
									}}
								>
									<SquarePen className="w-3.5 h-3.5" />
									<span>Edit Sprint</span>
								</button>
							</div>
							<div className="flex flex-col p-1.5">
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
									gap-x-2 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowDeleteSprintModal(true);
									}}
								>
									<Trash2 className="w-3.5 h-3.5 text-red-500" />
									<span className="text-red-500">
										Delete Sprint
									</span>
								</button>
							</div>
						</div>
					</div>
					<Button
						size="sm"
						onClick={() => setShowNewTaskModal(true)}
					>
						<div className="flex items-center gap-x-2">
							<Plus className="w-4 h-4" />
							<span>New Ticket</span>
						</div>
					</Button>
				</div>
			</header>
			{showEditSprintModal && (
				<EditSprintModal
					projectId={projectId}
					sprintId={sprintId}
					sprint={sprintMetaData}
					onSprintUpdate={onSprintUpdate}
					closeModal={() => setShowEditSprintModal(false)}
				/>
			)}
			{showDeleteSprintModal && (
				<DeleteSprintModal
					projectId={projectId}
					sprintId={sprintId}
					sprint={sprintMetaData}
					onSprintDelete={onSprintDelete}
					closeModal={() => setShowDeleteSprintModal(false)}
				/>
			)}
			{showNewTaskModal && (
				<NewTaskModal
					projectId={projectId}
					sprintId={sprintId}
					onNewTaskCreated={onNewTaskCreated}
					closeModal={() => setShowNewTaskModal(false)}
				/>
			)}
		</>
	);

};

export default ProjectSprintHeader;