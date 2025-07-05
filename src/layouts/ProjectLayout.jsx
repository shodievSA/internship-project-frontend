import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import projectService from "../services/projectService";
import ProjectNavigation from "../components/ProjectNavigation";
import NewTaskModal from "../components/NewTaskModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import LeaveProjectModal from "../components/LeaveProjectModal";
import GroupEmailModal from "../components/GroupEmailModal";
import { statusColors } from "../utils/constant";
import { Plus, Settings, Mail, SquarePen, UserMinus, Trash2 } from "lucide-react";

function ProjectLayout() {

    const { state: { projectPreview } } = useLocation();

    const [basicProject, setBasicProject] = useState(projectPreview);
	const [fullProjectLoaded, setFullProjectLoaded] = useState(false);

    const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false);
    const [showGroupEmailModal, setShowGroupEmailModal] = useState(false);

	const [team, setTeam] = useState([]);
	const [invites, setInvites] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [currentMemberId, setCurrentMemberId] = useState();

    useEffect(() => {

        document.addEventListener('mousedown', closeSettingsModal);

        function closeSettingsModal(e) {

            if (settingsButtonClicked && !e.target.closest('#settings-modal')) {

                setSettingsButtonClicked(false);

            }

        }

        return () => {
            document.removeEventListener('mousedown', closeSettingsModal);
        }

    }, [settingsButtonClicked]);

    useEffect(() => {

		async function getProject() {

			try {

				const { projectDetails } = await projectService.getProject(basicProject.id);
				
				setTasks(projectDetails.tasks);
				setTeam(projectDetails.team);
				setInvites(projectDetails.invites);
				setCurrentMemberId(projectDetails.currentMemberId);

			} catch(err) {

				console.log('The following error while fetching project details: ' + err.message);
				
				setTasks(null);
				setTeam(null);
				setInvites(null);
				setCurrentMemberId(null);

			} finally {

				setFullProjectLoaded(true);

			}

		}

		getProject();

    }, [basicProject.id]);

	function onNewTaskCreated(newTask) {
		
		setTasks([newTask, ...tasks]);
		
	}

    return (
        <div className="flex flex-col h-full gap-y-6 px-6 pt-6 md:px-8 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-8">
                <div className="flex items-center justify-between md:justify-start gap-x-6">
                    <h1 className="text-xl md:text-2xl lg:text-[28px] font-bold">
						{basicProject.title}
					</h1>
                    <div className={`${statusColors[basicProject.status]} status-badge px-3 py-1 
					text-xs md:text-sm`}>
                        {basicProject.status}
                    </div>
                </div>
                <div className="md:justify-end flex items-center gap-x-5">
                    <div id="settings-modal" className="relative hidden md:block">
                        <button
                            className="dark:hover:bg-neutral-900 hover:bg-slate-50 px-2.5 py-2.5 rounded-md"
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
                    bg-neutral-900 hover:bg-neutral-900/90 flex justify-center items-center gap-x-3 px-4 py-2.5 rounded-md
                    grow md:grow-0 text-sm md:text-base"
                        onClick={() => setShowNewTaskModal(true)}>
                        <Plus className="w-4 h-4" />
                        <span className="font-medium">New Task</span>
                    </button>
                </div>
            </div>
            <ProjectNavigation projectState={projectPreview} />
            <Outlet 
				context={{ 
					tasks: tasks,
					setTasks: setTasks,
					invites: invites,
					setInvites: setInvites,
					team: team,
					setTeam: setTeam,
					currentMemberId: currentMemberId,
					projectLoaded: fullProjectLoaded 
				}} 
			/>
            {
                showNewTaskModal && (
                    <NewTaskModal
                        setShowNewTaskModal={setShowNewTaskModal}
                        teamMembers={team}
						projectId={basicProject.id}
						onNewTaskCreated={onNewTaskCreated}
						userProjectMemberId={currentMemberId}
                    />
                )
            }
            {
                showEditProjectModal && (
                    <EditProjectModal
                        projectId={basicProject.id}
                        currentProjectTitle={basicProject.title}
                        currentProjectStatus={basicProject.status}
                        showModal={setShowEditProjectModal}
                        onProjectUpdated={(updatedProject) => setBasicProject((prev) => ({ ...prev, ...updatedProject }))}
                    />
                )
            }
            {
                showDeleteProjectModal && (
                    <DeleteProjectModal
                        projectId={basicProject.id}
                        projectTitle={basicProject.title}
                        showModal={setShowDeleteProjectModal}
                    />
                )
            }
            {
                showLeaveProjectModal && (
                    <LeaveProjectModal
                        projectId={basicProject.id}
                        projectTitle={basicProject.title}
                        showModal={setShowLeaveProjectModal}
                    />
                )
            }
            {
                showGroupEmailModal && (
                    <GroupEmailModal
                        teamMembers={team}
                        showModal={setShowGroupEmailModal}
                    />
                )
            }
        </div>
    );

}

export default ProjectLayout;