import { useState, useEffect } from "react";
import { useProjectsContext } from "../context/ProjectsContext";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import LeaveProjectModal from "./LeaveProjectModal";
import NewSprintModal from "./NewSprintModal";
import Button from "./ui/Button";
import { SquarePen, UserMinus, Trash2, Plus, Settings } from "lucide-react";

function ProjectActions({ 
	currentMemberId,
	currentMemberRole, 
	metaData,
	setMetaData,
}) {

	const { setProjects } = useProjectsContext();

	const [showEditProjectModal, setShowEditProjectModal] = useState(false);
	const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
	const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false);
	const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
	const [showNewSprintModal, setShowNewSprintModal] = useState(false);

	function deleteProject(projectIdToDelete) {

		setProjects((prevProjects) => prevProjects.filter((project) => 
			project.id !== projectIdToDelete
		));

	}

	function updateProject(updatedProject) {

		setMetaData(() => ({ ...metaData, ...updatedProject }));
		setProjects((prevProjects) => prevProjects.map((project) => {
			return project.id === updatedProject.id ? { ...project, ...updatedProject } : project;
		}));

	}

	useEffect(() => {

		document.addEventListener("mousedown", closeSettingsModal);

		function closeSettingsModal(e) {

			if (settingsButtonClicked && !e.target.closest("#settings-modal")) {
				setSettingsButtonClicked(false);
			}
			
		}

		return () => {
			document.removeEventListener("mousedown", closeSettingsModal);
		};

	}, [settingsButtonClicked]);

	return (
		<>
			<div className="flex gap-x-5">
				<div id="settings-modal" className="relative hidden md:block">
					<button
						className="p-2 dark:hover:bg-neutral-900 hover:bg-slate-50 rounded-lg"
						onClick={() => setSettingsButtonClicked(true)}
					>
						<Settings className="w-5 h-5" />
					</button>
					<div className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md 
					border-neutrals-200 border-[1px] rounded-md flex flex-col absolute w-[160px] 
					mt-3 left-0 ${settingsButtonClicked ? "opacity-100" : "opacity-0 pointer-events-none"} 
					transition-[opacity] duration-200 z-20`}>
						{ currentMemberRole === "admin" ? (
							<>
								<div className="flex flex-col border-b-[1px] dark:border-neutral-800 
								border-neutral-200 p-1.5">
									<button
										className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex 
										items-center gap-x-3 px-2.5 py-1.5 transition[background-color] duration-200"
										onClick={() => {
											setSettingsButtonClicked(false);
											setShowEditProjectModal(true);
										}}
									>
										<SquarePen className="w-4 h-4" />
										<span className="text-sm">Edit Project</span>
									</button>
								</div>
								<div className="flex flex-col p-1.5">
									<button
										className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
										px-2.5 py-1.5 gap-x-3 transition[background-color] duration-200"
										onClick={() => {
											setSettingsButtonClicked(false);
											setShowDeleteProjectModal(true);
										}}
									>
										<Trash2 className="w-4 h-4 text-red-500" />
										<span className="text-red-500 text-sm">
											Delete Project
										</span>
									</button>
								</div>
							</>
						) : (
							<div className="flex flex-col p-1.5">
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
									gap-x-3 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowLeaveProjectModal(true);
									}}
								>
									<UserMinus className="w-4 h-4 text-orange-500" />
									<span className="text-orange-500 text-sm">
										Leave Project
									</span>
								</button>
							</div>
						)}
					</div>
				</div>
				<Button
					size="sm"
					onClick={() => setShowNewSprintModal(true)}
				>
					<div className="flex items-center gap-x-2">
						<Plus className="w-4 h-4" />
						<span>New Sprint</span>
					</div>
				</Button>
			</div>
			{showEditProjectModal && (
				<EditProjectModal
					projectId={metaData.id}
					currentProjectTitle={metaData.title}
					currentProjectStatus={metaData.status}
					onProjectUpdate={updateProject}
					closeModal={() => setShowEditProjectModal(false)}
				/>
			)}
			{showDeleteProjectModal && (
				<DeleteProjectModal
					projectId={metaData.id}
					projectTitle={metaData.title}
					onProjectDelete={deleteProject}
					closeModal={() => setShowDeleteProjectModal(false)}
				/>
			)}
			{showLeaveProjectModal && (
				<LeaveProjectModal
					projectId={metaData.id}
					projectTitle={metaData.title}
					onProjectLeave={deleteProject}
					closeModal={() => setShowLeaveProjectModal(false)}
				/>
			)}
			{showNewSprintModal && (
				<NewSprintModal
					projectId={metaData.id}
					currentMemberId={currentMemberId}
					closeModal={() => setShowNewSprintModal(false)}
				/>
			)}
		</>
	);

}

export default ProjectActions;