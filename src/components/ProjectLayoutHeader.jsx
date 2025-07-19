import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewTaskModal from "../components/NewTaskModal";
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
	UserPlus
} from "lucide-react";

function ProjectLayoutHeader({
	metaData,
	currentMemberId,
	team
}) {

	const navigate = useNavigate();

	const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
	const [showNewTaskModal, setShowNewTaskModal] = useState(false);
	const [showEditProjectModal, setShowEditProjectModal] = useState(false);
	const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
	const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false);
	const [showGroupEmailModal, setShowGroupEmailModal] = useState(false);

	useEffect(() => {

		document.addEventListener("mousedown", closeSettingsModal);

		function closeSettingsModal(e) {

			if (settingsButtonClicked && !e.target.closest("#settings-modal")) {

				setSettingsButtonClicked(false);

			}

		}

		return () => {
			document.removeEventListener("mousedown", closeSettingsModal);
		}

	}, [settingsButtonClicked]);

	return (
		<>
			<div className="flex justify-between items-center gap-y-6 gap-x-6">
				<div className="flex items-center gap-x-8">
					<div className="flex items-center justify-between md:justify-start gap-x-4">
						<h1 className="text-xl md:text-xl font-semibold">
							{ metaData.title }
						</h1>
						<div className={`${statusColors[metaData.status]} status-badge px-3 py-1 
						text-xs`}>
							{ metaData.status }
						</div>
					</div>
					<div className="flex gap-x-5">
						<div 
							className="flex items-center gap-x-2 hover:bg-slate-100 px-3 py-1 
							cursor-pointer rounded-md"
							onClick={() => navigate("team")}
						>
							<Users className="w-4 h-4" />
							<span>Team</span>
						</div>
						<div 
							className="flex items-center gap-x-2 hover:bg-slate-100 px-3 py-1 
							cursor-pointer rounded-md"
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
							className="dark:hover:bg-neutral-900 hover:bg-slate-50 px-2.5 
							py-2.5 rounded-md"
							onClick={() => setSettingsButtonClicked(true)}
						>
							<Settings className="w-5 h-5" />
						</button>
						<div className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md border-neutrals-200 border-[1px] 
						rounded-md flex flex-col absolute w-[200px] mt-3 left-0 ${settingsButtonClicked ? 'opacity-100' :
								'opacity-0 pointer-events-none'} transition-[opacity] duration-200 z-10`}>
							<div className="flex flex-col border-b-[1px] dark:border-neutral-800 border-neutral-200 p-1.5">
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
									<span className="text-orange-500">Leave Project</span>
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
									<span className="text-red-500">Delete Project</span>
								</button>
							</div>
						</div>
					</div>
					<button className="dark:bg-white dark:hover:bg-slate-200 dark:text-black text-white 
					bg-neutral-900 hover:bg-neutral-900/90 flex justify-center items-center gap-x-3 px-4 py-2 rounded-md
					grow md:grow-0 text-sm md:text-base"
						onClick={() => setShowNewTaskModal(true)}>
						<Plus className="w-4 h-4" />
						<span className="font-medium">New Task</span>
					</button>
				</div>
			</div>
			{
				showNewTaskModal && (
					<NewTaskModal
						projectId={metaData.id}
						teamMembers={team}
						currentMemberId={currentMemberId}
						closeModal={() => setShowNewTaskModal(false)}
					/>
				)
			}
			{
				showEditProjectModal && (
					<EditProjectModal
						projectId={metaData.id}
						currentProjectTitle={metaData.title}
						currentProjectStatus={metaData.status}
						closeModal={() => setShowEditProjectModal(false)}
					/>
				)
			}
			{
				showDeleteProjectModal && (
					<DeleteProjectModal
						projectId={metaData.id}
						projectTitle={metaData.title}
						closeModal={() => setShowDeleteProjectModal(false)}
					/>
				)
			}
			{
				showLeaveProjectModal && (
					<LeaveProjectModal
						projectId={metaData.id}
						projectTitle={metaData.title}
						closeModal={() => setShowLeaveProjectModal(false)}
					/>
				)
			}
			{
				showGroupEmailModal && (
					<GroupEmailModal
						teamMembers={team}
						closeModal={() => setShowGroupEmailModal(false)}
					/>
				)
			}
		</>
	)

}

export default ProjectLayoutHeader;