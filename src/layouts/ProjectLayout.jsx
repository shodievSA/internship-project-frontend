import { useState, useEffect } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import NewTaskModal from "../components/NewTaskModal";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import LeaveProjectModal from "../components/LeaveProjectModal";
import GroupEmailModal from "../components/GroupEmailModal";
import { statusColors } from "../utils/constant";
import { Plus, Settings, Mail, SquarePen, UserMinus, Trash2 } from "lucide-react";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function ProjectLayout() {

    const location = useLocation();
    const { state: { projectPreview } } = location;

    const [projectInfo, setProjectInfo] = useState(projectPreview);
	const [fullProject, setFullProject] = useState(null);
    const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [showLeaveProjectModal, setShowLeaveProjectModal] = useState(false);
    const [showGroupEmailModal, setShowGroupEmailModal] = useState(false);

    const teamMembers = [
        {
            id: 0,
            fullName: "John Doe",
            position: "QA Engineer",
            email: "johndoe@gmail.com"
        },
        {
            id: 1,
            fullName: "John Doe 2",
            position: "Backend Developer",
            email: "johndoe@gmail.com"
        },
        {
            id: 2,
            fullName: "John Doe 3",
            position: "Frontend Developer",
            email: "johndoe@gmail.com"
        }
    ];

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

				const res = await fetch(`${SERVER_BASE_URL}/api/v1/projects/${projectPreview.id}`, {
					method: 'GET',
					credentials: 'include'
				});

				if (!res.ok) {

					throw new Error("Error occured while getting project's details");

				} else {

					const { projectDetails } = await res.json();

					setFullProject(projectDetails);

				}

			} catch(error) {

				console.log('The following error while fetching project detaisl: ' + error);

			}

		}

		getProject();

    }, [projectPreview.id]);


	console.log(fullProject);

    return (
        <div className="flex flex-col h-full gap-y-6 px-6 pt-6 md:px-8 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-8">
                <div className="flex items-center justify-between md:justify-start gap-x-6">
                    <h1 className="text-xl md:text-2xl lg:text-[28px] font-bold">
						{projectPreview.title}
					</h1>
                    <div className={`${statusColors[projectPreview.status]} status-badge px-3 py-1 text-xs md:text-sm`}>
                        {projectPreview.status}
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
            <ul className="dark:bg-neutral-900 bg-neutral-100 p-1.5 grid gap-y-2 grid-cols-[repeat(3,minmax(100px,1fr))] 
            xl:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>a]:text-center [&>a]:p-2 [&>a]:font-medium [&>a]:rounded-md 
            rounded-md">
                <NavLink
                    to='team'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Team
                </NavLink>
                <NavLink
                    to='all-tasks'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    All Tasks
                </NavLink>
                <NavLink
                    to='my-tasks'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    My Tasks
                </NavLink>
                <NavLink
                    to='assigned-tasks'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Assigned
                </NavLink>
                <NavLink
                    to='review-tasks'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Reviews
                </NavLink>
                <NavLink
                    to='project-invites'
                    state={{ projectPreview: projectPreview }}
                    className={({ isActive }) => `transition-[background-color] duration-300 text-sm md:text-base 
                        ${isActive ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`
                    }
                >
                    Invites
                </NavLink>
            </ul>
            <Outlet context={{ project: fullProject }} />
            {
                showNewTaskModal && (
                    <NewTaskModal
                        setShowNewTaskModal={setShowNewTaskModal}
                        teamMembers={teamMembers}
						projectId={projectPreview.id}
                    />
                )
            }
            {
                showEditProjectModal && (
                    <EditProjectModal
                        projectId={projectPreview.id}
                        currentProjectTitle={projectPreview.title}
                        currentProjectStatus={projectPreview.status}
                        showModal={setShowEditProjectModal}
                        onProjectUpdated={(updatedProject) => setProjectInfo((prev) => ({ ...prev, ...updatedProject }))}
                    />
                )
            }
            {
                showDeleteProjectModal && (
                    <DeleteProjectModal
                        projectId={projectPreview.id}
                        projectTitle={projectPreview.title}
                        showModal={setShowDeleteProjectModal}
                    />
                )
            }
            {
                showLeaveProjectModal && (
                    <LeaveProjectModal
                        projectId={projectPreview.id}
                        projectTitle={projectPreview.title}
                        showModal={setShowLeaveProjectModal}
                    />
                )
            }
            {
                showGroupEmailModal && (
                    <GroupEmailModal
                        teamMembers={teamMembers}
                        showModal={setShowGroupEmailModal}
                    />
                )
            }
        </div>
    );

}

export default ProjectLayout;