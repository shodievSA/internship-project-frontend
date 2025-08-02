import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { useProjectsContext } from "../context/ProjectsContext";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import LeaveProjectModal from "../components/LeaveProjectModal";
import GroupEmailModal from "../components/GroupEmailModal";
import { statusColors } from "../utils/constant";
import {
	Plus,
	Settings,
	Mail,
	SquarePen,
	UserMinus,
	Trash2,
	Users,
	UserPlus,
	TrendingUp,
} from "lucide-react";
import NewSprintModal from "./NewSprintModal";
import Button from "./ui/Button";

function ProjectLayoutHeader() {

	const { metaData, setMetaData, currentMemberId, team } = useProject();
	const { setProjects } = useProjectsContext();

	const navigate = useNavigate();

	const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
	const [showNewSprintModal, setShowNewSprintModal] = useState(false);
	const [showEditProjectModal, setShowEditProjectModal] = useState(false);
	const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
	const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false);
	const [showGroupEmailModal, setShowGroupEmailModal] = useState(false);

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
			<div className="flex justify-between items-center gap-y-6 gap-x-6">
				<div className="flex items-center gap-x-8">
					<div className="flex items-center justify-between md:justify-start gap-x-4">
						<h1 className="text-xl md:text-xl font-semibold">
							{metaData.title}
						</h1>
						<div className={`${statusColors[metaData.status]} status-badge px-3 py-1 text-xs`}>
							{metaData.status}
						</div>
					</div>
					<div className="flex text-sm gap-x-5">
						<div className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
						hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md"
							onClick={() => navigate("summary")}
						>
							<TrendingUp className="w-4 h-4" />
							<span>Analytics</span>
						</div>
						<div
							className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
							hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md"
							onClick={() => navigate("team")}
						>
							<Users className="w-4 h-4" />
							<span>Team</span>
						</div>
						<div
							className="flex items-center gap-x-2 dark:hover:bg-neutral-900 
							hover:bg-slate-100 px-4 py-1.5 cursor-pointer rounded-md"
							onClick={() => navigate("invites")}
						>
							<UserPlus className="w-4 h-4" />
							<span>Invites</span>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-x-5">
					<div id="settings-modal" className="relative hidden md:block">
						<button
							className="dark:hover:bg-neutral-900 hover:bg-slate-50 
							p-2.5 rounded-lg"
							onClick={() => setSettingsButtonClicked(true)}
						>
							<Settings className="w-5 h-5" />
						</button>
						<div className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md 
						border-neutrals-200 border-[1px] rounded-md flex flex-col absolute w-[200px] 
						mt-3 left-0 ${settingsButtonClicked ? "opacity-100" : "opacity-0 pointer-events-none"} 
						transition-[opacity] duration-200 z-20`}>
							<div className="flex flex-col border-b-[1px] dark:border-neutral-800 
							border-neutral-200 p-1.5">
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex 
									items-center gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowEditProjectModal(true);
									}}
								>
									<SquarePen className="w-4 h-4" />
									<span>Edit Project</span>
								</button>
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
									gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowGroupEmailModal(true);
									}}
								>
									<Mail className="w-4 h-4" />
									<span>Send Email</span>
								</button>
							</div>
							<div className="flex flex-col p-1.5">
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
									gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowLeaveProjectModal(true);
									}}
								>
									<UserMinus className="w-4 h-4 text-orange-500" />
									<span className="text-orange-500">
										Leave Project
									</span>
								</button>
								<button
									className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
									gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200"
									onClick={() => {
										setSettingsButtonClicked(false);
										setShowDeleteProjectModal(true);
									}}
								>
									<Trash2 className="w-4 h-4 text-red-500" />
									<span className="text-red-500">
										Delete Project
									</span>
								</button>
							</div>
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
			</div>
			{showNewSprintModal && (
				<NewSprintModal
					projectId={metaData.id}
					currentMemberId={currentMemberId}
					closeModal={() => setShowNewSprintModal(false)}
				/>
			)}
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
					closeModal={() => setShowLeaveProjectModal(false)}
				/>
			)}
			{showGroupEmailModal && (
				<GroupEmailModal
					teamMembers={team}
					closeModal={() => setShowGroupEmailModal(false)}
				/>
			)}
		</>
	);
}

export default ProjectLayoutHeader;
