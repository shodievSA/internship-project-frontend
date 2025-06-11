import { useState, useEffect, useRef } from "react";
import { Asterisk, Calendar, ChevronRight, Check, Plus, X, Sparkles } from "lucide-react";

function NewTaskModal({ setShowNewTaskModal, teamMembers }) {

    const [showTaskPrioritySelect, setShowTaskPrioritySelect] = useState(false);
    const [showTeamMembersSelect, setShowTeamMembersSelect] = useState(false);
    const [subtask, setSubtask] = useState(null);
    const [isTaskDescriptionBeingEnhanced, setIsTaskDescriptionBeingEnhanced] = useState(false);
    const [enhancedTaskDescription, setEnhancedTaskDescription] = useState(null);
    const [isNewTaskBeingCreated, setIsNewTaskBeingCreated] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: null,
        deadline: null,
        assignedTo: null,
        subtasks: []
    });

    const dateInput = useRef();
    const subtaskInputRef = useRef();

    useEffect(() => {
    
        document.addEventListener('mousedown', hideTaskPrioritySelect);

        function hideTaskPrioritySelect(e) {

            if (showTaskPrioritySelect && !e.target.closest('#task-priority-select')) {

                setShowTaskPrioritySelect(false);

            }

        }

        return () => {
            document.removeEventListener('mousedown', hideTaskPrioritySelect);
        }
    
    }, [showTaskPrioritySelect]);

    useEffect(() => {

        document.addEventListener('mousedown', hideTeamMembersSelect);

        function hideTeamMembersSelect(e) {

            if (showTeamMembersSelect && !e.target.closest('#team-members-select')) {

                setShowTeamMembersSelect(false);

            }

        }

        return () => {
            document.removeEventListener('mousedown', hideTeamMembersSelect);
        }

    }, [showTeamMembersSelect]);

    function addSubtask() {

        if (subtask.title.length > 0) {

            setNewTask({
                ...newTask,
                subtasks: [ ...newTask.subtasks, { ...subtask, id: newTask.subtasks.length + 1 } ]
            });
            subtaskInputRef.current.value = "";
            setSubtask(null);

        }

    }

    async function enhanceTaskDescription() {

        setIsTaskDescriptionBeingEnhanced(true);

        setTimeout(() => {

            setIsTaskDescriptionBeingEnhanced(false)

        }, 3000);

    }

    async function createNewTask() {

       setIsNewTaskBeingCreated(true);

       setTimeout(() => {

            setIsNewTaskBeingCreated(false);

       }, 3000);

    }

    return (
        <div className="flex items-center justify-center fixed h-full w-full bg-black/80 left-0 top-0 z-10">
            <div className="dark:bg-neutral-950 dark:border-neutral-800 bg-white border-neutral-200 border-[1px] 
            flex flex-col h-[500px] w-[350px] lg:h-[675px] lg:w-[750px] rounded-lg">
                <div className="px-8 pt-8 pb-4">
                    <h1 className="text-xl font-semibold">Create New Task</h1>
                </div>
                <div className="flex gap-y-8 flex-col grow overflow-y-auto p-8 scrollbar-thin dark:scrollbar-thumb-neutral-950 
                dark:scrollbar-track-neutral-800">
                    <div className="flex flex-col gap-y-8">
                        <div className="flex flex-col gap-y-3">
                            <label className="flex gap-x-0.5 font-semibold">
                                Task Title (optional)
                            </label>
                            <input 
                                placeholder="Enter a clear and concise task title" 
                                className="dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] py-2 px-4 
                                outline-none" 
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex justify-between items-center">
                                <label className="flex gap-x-0.5 font-semibold">
                                    <span>Description</span>
                                    <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                                </label>
                                {
                                    enhancedTaskDescription ? (
                                        <div className="flex gap-x-3 text-sm">
                                            <button 
                                                className="text-white hover:bg-green-900 bg-green-800 flex items-center gap-x-2 px-3 py-1.5 
                                                rounded-md font-medium"
                                                onClick={() => {
                                                    setNewTask({ ...newTask, description: enhancedTaskDescription });
                                                    setEnhancedTaskDescription(null);
                                                }}
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                className="text-white hover:bg-red-900 bg-red-800 flex items-center gap-x-2 px-4 py-1.5 
                                                rounded-md font-medium"
                                                onClick={() => setEnhancedTaskDescription(null)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            className="dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-900 
                                            hover:bg-slate-100 border-[1px] px-3 py-2.5 rounded-md text-sm flex justify-center 
                                            items-center gap-x-2 w-40"
                                            onClick={enhanceTaskDescription}
                                        >
                                            {
                                                isTaskDescriptionBeingEnhanced ? (
                                                    <div className="flex justify-center relative w-5 h-5">
                                                        <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
                                                        <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                                        dark:border-t-black rounded-full animate-spin"></div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-4 h-4 text-yellow-600" />
                                                        <span className="font-medium">Enhance with AI</span>
                                                    </>
                                                )
                                            }
                                        </button>
                                    )
                                }
                            </div>
                            <textarea 
                                placeholder="Describe the task requirements, goals, and any important details..."
                                rows={4} 
                                className="dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                focus:border-black bg-white resize-none rounded-md text-sm lg:text-base border-[1px] 
                                py-2 px-4 outline-none"
                                value={ enhancedTaskDescription ? enhancedTaskDescription : newTask.description } 
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-y-2">
                                <label className="flex gap-x-0.5 font-semibold">
                                    <span>Priority</span>
                                    <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                                </label>
                                <div id="task-priority-select" className="relative">
                                    <button 
                                        className="dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md text-sm 
                                        lg:text-base border-[1px] py-2 px-4 outline-none w-full"
                                        onClick={() => setShowTaskPrioritySelect(true)}
                                    >
                                        <div className="flex justify-between items-center">
                                            {
                                                newTask.priority === 'low' ? (
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                                        <span>Low Priority</span>
                                                    </div>
                                                ) : newTask.priority === 'middle' ? (
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                                        <span>Middle Priority</span>
                                                    </div>
                                                ) : newTask.priority === 'high' ? (
                                                    <div className="flex items-center gap-x-3">
                                                        <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                                        <span>High Priority</span>
                                                    </div>
                                                ) : (
                                                    <span>Specify task priority</span>
                                                )
                                            }
                                            <ChevronRight className="h-4 w-4 rotate-90" />
                                        </div>
                                    </button>
                                    <ul id="priority-modal" className={`${showTaskPrioritySelect ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                                    absolute z-10 flex flex-col dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                    focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] p-2 outline-none 
                                    w-full flex flex-col gap-y-1 items-center mt-2 transition-[opacity] duration-150`}>
                                        <li 
                                            className={`${newTask.priority === 'low' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                            dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                            onClick={() => {
                                                setNewTask({ ...newTask, priority: 'low' });
                                                setShowTaskPrioritySelect(false);
                                            }}
                                        >
                                            <div className="flex justify-between items-center px-2">
                                                <div className="flex justify-start items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                                    <span>Low Priority</span>
                                                </div>
                                                { newTask.priority === 'low' && <Check className="w-4 h-4" /> }
                                            </div>
                                        </li>
                                        <li 
                                            className={`${newTask.priority === 'middle' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                            dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                            onClick={() => {
                                                setNewTask({ ...newTask, priority: 'middle' });
                                                setShowTaskPrioritySelect(false);
                                            }}
                                        >
                                            <div className="flex justify-between items-center px-2">
                                                <div className="flex justify-start items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                                    <span>Middle Priority</span>
                                                </div>
                                                { newTask.priority === 'middle' && <Check className="w-4 h-4" /> }
                                            </div>
                                        </li>
                                        <li
                                            className={`${newTask.priority === 'high' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                            dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                            onClick={() => {
                                                setNewTask({ ...newTask, priority: 'high' });
                                                setShowTaskPrioritySelect(false);
                                            }}
                                        >
                                            <div className="flex justify-between items-center px-2">
                                                <div className="flex justify-start items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                                    <span>High Priority</span>
                                                </div>
                                                { newTask.priority === 'high' && <Check className="w-4 h-4" /> }
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">                                    
                                <label className="flex gap-x-0.5 font-semibold">
                                    <span>Deadline</span>
                                    <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                                </label>                                           
                                <div className="relative">
                                    <input 
                                        ref={dateInput}
                                        type='date' 
                                        className="dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
                                        text-sm lg:text-base border-[1px] py-2 px-4 outline-none pl-10 w-full" 
                                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                    />
                                    <Calendar 
                                        onClick={() => dateInput.current.showPicker()} 
                                        className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" 
                                    />
                                </div>
                            </div>                         
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <label className="flex gap-x-0.5 font-semibold">
                                <span>Assign to</span>
                                <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                            </label>
                            <div id="team-members-select" className="relative">
                                <button 
                                    className="dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md text-sm 
                                    lg:text-base border-[1px] py-2 px-4 outline-none w-full"
                                    onClick={() => setShowTeamMembersSelect(true)}
                                >
                                    <div className="flex justify-between items-center">
                                        {
                                            newTask.assignedTo === null ? (
                                                'Select a team member'
                                            ) : (                                                                
                                                <p>{newTask.assignedTo.fullName} <span className="dark:text-neutral-400 text-sm">({newTask.assignedTo.position})</span></p>                                                              
                                            )
                                        }
                                        <ChevronRight className="h-4 w-4 rotate-90" />
                                    </div>
                                </button>
                                <ul id="assigned-to-modal" className={`${showTeamMembersSelect ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                                absolute flex flex-col dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] p-2 outline-none 
                                w-full flex flex-col gap-y-1 items-center mt-2 transition-[opacity] duration-150`}>
                                    {
                                        teamMembers.map((member) => {
                                            return (
                                                <li 
                                                    key={member.id}
                                                    className={`${newTask.assignedTo?.fullName === member.fullName ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                                    dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                                    onClick={() => {
                                                        setNewTask({ ...newTask, assignedTo: member });
                                                        setShowTeamMembersSelect(false);
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center px-2">
                                                        <div className="flex justify-start items-center gap-x-3">
                                                            <p>{ member.fullName } <span className="dark:text-neutral-400 text-sm">({ member.position })</span></p>
                                                        </div>
                                                        { newTask.assignedTo?.fullName === member.fullName && <Check className="w-4 h-4" /> }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-3">
                                <label className="flex gap-x-0.5 font-semibold">
                                    Subtasks (optional)
                                </label>
                                <div className="flex gap-x-3">
                                    <input 
                                        ref={subtaskInputRef}
                                        placeholder="Enter a subtask..." 
                                        className="dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                        focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] py-2 px-4 
                                        outline-none grow" 
                                        onChange={(e) => setSubtask({ ...subtask, title: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addSubtask();
                                            }
                                        }}
                                    />
                                    <button 
                                        className="dark:bg-white dark:hover:bg-slate-200 p-3 rounded-md bg-neutral-900 
                                        hover:bg-neutral-900/90"
                                        onClick={addSubtask}
                                    >
                                        <Plus className="dark:text-black text-white w-5 h-5" />
                                    </button>
                                </div>
                            </div>                            
                            {
                                newTask.subtasks.length > 0 && (
                                    <div className="flex flex-col gap-y-2 rounded-md">
                                        <span>Subtasks ({ newTask.subtasks.length }):</span>
                                        <div className="dark:border-neutral-800 border-[1px] flex flex-col gap-y-3 p-2.5 rounded-md">
                                            {
                                                newTask.subtasks.map((subtask) => {
                                                    return (
                                                        <div key={subtask.id} className="dark:bg-neutral-900 bg-neutral-200 py-2 px-3 flex justify-between items-center
                                                        rounded-md">
                                                            { subtask.title }
                                                            <button 
                                                                className="p-2 rounded-full hover:bg-red-900 cursor-pointer transition-[background-color] duration-200"
                                                                onClick={() => setNewTask({ 
                                                                    ...newTask,
                                                                    subtasks: newTask.subtasks.filter((oldSubtask) => oldSubtask.id !== subtask.id)
                                                                })}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>              
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
                border-neutral-200 p-4">
                    <button 
                        disabled={isNewTaskBeingCreated} 
                        className={`dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 
                        bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] rounded-lg font-medium text-sm lg:text-base 
                        disabled:opacity-50 ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                        onClick={() => setShowNewTaskModal(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        disabled={isNewTaskBeingCreated}
                        className='dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 hover:bg-neutral-900/90 
                        text-white py-2.5 px-4 rounded-lg font-medium text-sm lg:text-base flex justify-center'
                        onClick={createNewTask}
                    >
                        {
                            isNewTaskBeingCreated ? (
                                <div className="flex justify-center relative w-5 h-5">
                                    <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
                                    <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                    dark:border-t-black rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Create Task"
                            )
                        }
                    </button>                                
                </div>
            </div>
        </div>
    )

}

export default NewTaskModal;