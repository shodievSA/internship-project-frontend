import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NewTaskModal from "../components/NewTaskModal";
import { statusColors } from "../utils/constant";
import { Plus, Settings, Mail, SquarePen, UserMinus, Trash2 } from "lucide-react";

function ProjectDetailsLayout() {

    const location = useLocation();
    const { state: { projectInfo, section = 'team' } } = location;

    const [selectedSection, setSelectionSection] = useState(section);
    const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);

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

    const teamMembers = [
        {
            id: 0,
            fullName: "John Doe",
            position: "QA Engineer"
        },
        {
            id: 1,
            fullName: "John Doe 2",
            position: "Backend Developer"
        },
        {
            id: 2,
            fullName: "John Doe 3",
            position: "Frontend Developer"
        }
    ];

    return (
        <div className="flex flex-col h-full px-6 pt-6 md:px-8 md:pt-8">
            {
                showNewTaskModal && (
                    <NewTaskModal setShowNewTaskModal={setShowNewTaskModal} teamMembers={teamMembers} />  
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 md:gap-8 md:pb-8">
                <div className="flex items-center justify-between md:justify-start gap-x-6">
                    <h1 className="text-xl md:text-2xl lg:text-[28px] font-bold">{ projectInfo.name }</h1>
                    <div className={`${statusColors[projectInfo.status]} status-badge px-3 py-1 text-xs md:text-sm`}>
                        { projectInfo.status }
                    </div>
                </div>
                <div className="md:justify-end flex items-center gap-x-5">
                    <div id="settings-modal" className="relative">
                        <button 
                            className="dark:hover:bg-neutral-900 hover:bg-slate-50 px-2.5 py-2.5 rounded-md"
                            onClick={() => setSettingsButtonClicked(true)}
                        >
                            <Settings className="w-5 h-5" />
                        </button>                       
                        <div className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md border-neutral-200 border-[1px] 
                            rounded-md flex flex-col absolute w-[200px] mt-3 ${settingsButtonClicked ? 'opacity-100' : 
                            'opacity-0 pointer-events-none'} transition-[opacity] duration-200`}>
                            <div className="flex flex-col border-b-[1px] dark:border-neutral-800 border-neutral-200 p-1.5">
                                <button className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex 
                                items-center gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200">
                                    <SquarePen className="w-4 h-4" />
                                    <span>Edit Project</span>
                                </button>
                                <button className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
                                gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200">
                                    <Mail className="w-4 h-4" />
                                    <span>Send Email</span>
                                </button>
                            </div>
                            <div className="flex flex-col p-1.5">
                                <button className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
                                gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200">
                                    <UserMinus className="w-4 h-4 text-orange-500" />
                                    <span className="text-orange-500">Leave Project</span>
                                </button>
                                <button className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
                                gap-x-4 px-2.5 py-1.5 transition[background-color] duration-200">
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
            <div className="dark:bg-neutral-900 bg-neutral-100 p-1.5 grid gap-y-2 grid-cols-[repeat(3,minmax(100px,1fr))] 
            xl:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>button]:text-center [&>button]:p-2 
            [&>button]:font-medium [&>button]:rounded-md rounded-md">
                <button 
                    className={`${selectedSection === 'team' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('team')}
                >
                    Team
                </button>
                <button
                    className={`${selectedSection === 'all-tasks' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('all-tasks')}
                >
                    All Tasks
                </button>
                <button 
                    className={`${selectedSection === 'my-tasks' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('my-tasks')}
                >
                    My Tasks
                </button>
                <button
                    className={`${selectedSection === 'assigned' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('assigned')}
                >
                    Assigned
                </button>
                <button
                    className={`${selectedSection === 'reviews' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('reviews')}
                    >
                    Reviews
                </button>
                <button
                    className={`${selectedSection === 'invites' ? 'dark:bg-black dark:text-white bg-white' : 
                    'bg-transparent dark:text-neutral-500 text-neutral-500'} transition-[background-color]
                    duration-300 text-sm md:text-base`}
                    onClick={() => setSelectionSection('invites')}
                >
                    Invites
                </button>
            </div>
            <Outlet />
        </div>
    )

}

export default ProjectDetailsLayout;