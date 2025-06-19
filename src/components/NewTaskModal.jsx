import { useState, useEffect, useRef } from "react";
import AiEditor from "./AiEditor";
import InputField from "./InputField";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Asterisk, Calendar, ChevronRight, Check, Plus, X, CircleAlert  } from "lucide-react";

function NewTaskModal({ setShowNewTaskModal, teamMembers }) {

    const [showTaskPrioritySelect, setShowTaskPrioritySelect] = useState(false);
    const [showTeamMembersSelect, setShowTeamMembersSelect] = useState(false);
    const [subtask, setSubtask] = useState(null);
    const [isTaskDescriptionBeingEnhanced, setIsTaskDescriptionBeingEnhanced] = useState(false);
    const [isNewTaskBeingCreated, setIsNewTaskBeingCreated] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
	const [taskDescriptionAiChangesAccepted, setTaskDescriptionAiChangesAccepted] = useState(true);
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDeadline, setTaskDeadline] = useState(null);
    const [taskAssignedTo, setTaskAssignedTo] = useState(null);
    const [subtasks, setSubtasks] = useState([]);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

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

        if (subtask?.title.length > 0) {

            setSubtasks([ ...subtasks, { ...subtask, id: subtasks.length + 1 } ]);
            subtaskInputRef.current.value = "";
            setSubtask(null);

        }

    }

    async function createNewTask() {

       setIsNewTaskBeingCreated(true);

       setTimeout(() => {

           setIsNewTaskBeingCreated(false);

       }, 3000);

    }

	useEffect(() => {

		if (
			taskDescription &&
			taskPriority &&
			taskDeadline &&
			taskAssignedTo &&
			taskDescriptionAiChangesAccepted
		) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}

	}, [
		taskDescription,
		taskPriority,
		taskDeadline,
		taskAssignedTo,
		taskDescriptionAiChangesAccepted
	]);

    return (
        <Modal title="Create New Task" size="lg">
            <div className="flex gap-y-8 flex-col grow overflow-y-auto px-6 pb-6 scrollbar-thin dark:scrollbar-thumb-neutral-950 
            dark:scrollbar-track-neutral-800">
                <div className="flex flex-col gap-y-8">
                    <InputField
                        label="Task Title (optional)"
                        disabled={isNewTaskBeingCreated}
                        placeholder="Enter a clear and concise task title"
                        required={false}
                        value={taskTitle}
                        onChange={setTaskTitle}
                    />
                    <AiEditor 
                        label="Description"
                        placeholder="Describe the task requirements, goals, and any important details..."
                        required={true}
                        error="You must include task description"
                        rows={7}
                        value={taskDescription}
                        setValue={setTaskDescription}
                        disabled={isNewTaskBeingCreated}
                        textBeingEnhancedWithAi={isTaskDescriptionBeingEnhanced}
                        setTextBeingEnhancedWithAi={setIsTaskDescriptionBeingEnhanced}
						setChangesAccepted={setTaskDescriptionAiChangesAccepted}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                        <div className="flex flex-col gap-y-2">
                            <label className="flex gap-x-0.5">
                                <span className="text-sm md:text-base font-semibold">Priority</span>
                                <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                            </label>
                            <div id="task-priority-select" className="relative">
                                <button
                                    disabled={isNewTaskBeingCreated} 
                                    className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md text-sm 
                                    lg:text-base border-[1px] py-2 px-4 outline-none w-full disabled:opacity-50
                                    ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => setShowTaskPrioritySelect(true)}
                                >
                                    <div className="flex justify-between items-center">
                                        {
                                            taskPriority === 'low' ? (
                                                <div className="flex items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                                    <span>Low Priority</span>
                                                </div>
                                            ) : taskPriority === 'middle' ? (
                                                <div className="flex items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                                    <span>Middle Priority</span>
                                                </div>
                                            ) : taskPriority === 'high' ? (
                                                <div className="flex items-center gap-x-3">
                                                    <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                                    <span>High Priority</span>
                                                </div>
                                            ) : (
                                                <span>Specify task priority</span>
                                            )
                                        }
                                        <ChevronRight className={`${showTaskPrioritySelect ? '-rotate-90' : 'rotate-90'} 
                                        h-4 w-4 transition-[all] duration-200`} />
                                    </div>
                                </button>
                                <ul id="priority-modal" className={`${showTaskPrioritySelect ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                                absolute z-10 flex flex-col dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] p-2 outline-none 
                                w-full flex flex-col gap-y-1 items-center mt-2 transition-[opacity] duration-150`}>
                                    <li 
                                        className={`${taskPriority === 'low' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                        dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                        onClick={() => {
                                            setTaskPriority('low');
                                            setShowTaskPrioritySelect(false);
                                        }}
                                    >
                                        <div className="flex justify-between items-center px-2">
                                            <div className="flex justify-start items-center gap-x-3">
                                                <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                                <span>Low Priority</span>
                                            </div>
                                            { taskPriority === 'low' && <Check className="w-4 h-4" /> }
                                        </div>
                                    </li>
                                    <li 
                                        className={`${taskPriority === 'middle' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                        dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                        onClick={() => {
                                            setTaskPriority('middle');
                                            setShowTaskPrioritySelect(false);
                                        }}
                                    >
                                        <div className="flex justify-between items-center px-2">
                                            <div className="flex justify-start items-center gap-x-3">
                                                <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                                <span>Middle Priority</span>
                                            </div>
                                            { taskPriority === 'middle' && <Check className="w-4 h-4" /> }
                                        </div>
                                    </li>
                                    <li
                                        className={`${taskPriority === 'high' ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                        dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                        onClick={() => {
                                            setTaskPriority('high');
                                            setShowTaskPrioritySelect(false);
                                        }}
                                    >
                                        <div className="flex justify-between items-center px-2">
                                            <div className="flex justify-start items-center gap-x-3">
                                                <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                                <span>High Priority</span>
                                            </div>
                                            { taskPriority === 'high' && <Check className="w-4 h-4" /> }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">                                    
                            <label className="flex gap-x-0.5">
                                <span className="text-sm md:text-base font-semibold">Deadline</span>
                                <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                            </label>                                           
                            <div className="relative">
                                <input 
                                    disabled={isNewTaskBeingCreated}
                                    ref={dateInput}
                                    type='date' 
                                    className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
                                    text-sm lg:text-base border-[1px] py-2 px-4 outline-none pl-10 w-full
                                    disabled:opacity-50 ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 'cursor-text'}`}
                                    onChange={(e) => setTaskDeadline(e.target.value)}
                                />
                                <Calendar 
                                    onClick={() => dateInput.current.showPicker()} 
                                    className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2
                                    ${isNewTaskBeingCreated ? 'opacity-50' : 'opacity-100'} cursor-pointer`}
                                />
                            </div>
                        </div>                         
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="flex gap-x-0.5">
                            <span className="text-sm md:text-base font-semibold">Assign to</span>
                            <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                        </label>
                        <div id="team-members-select" className="relative">
                            <button 
                                disabled={isNewTaskBeingCreated}
                                className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md text-sm 
                                lg:text-base border-[1px] py-2 px-4 outline-none w-full disabled:opacity-50
                                ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => setShowTeamMembersSelect(true)}
                            >
                                <div className="flex justify-between items-center">
                                    {
                                        taskAssignedTo === null ? (
                                            'Select a team member'
                                        ) : (                                                                
                                            <p>{taskAssignedTo.fullName} <span className="dark:text-neutral-400 text-sm">({taskAssignedTo.position})</span></p>                                                              
                                        )
                                    }
                                    <ChevronRight className={`${showTeamMembersSelect ? '-rotate-90' : 'rotate-90'} 
                                    transition-[all] duration-200 h-4 w-4`} />
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
                                                className={`${taskAssignedTo?.fullName === member.fullName ? 'dark:bg-neutral-900 bg-neutral-100' : 'bg-transparent'} 
                                                dark:hover:bg-neutral-900 hover:bg-neutral-100 p-2 w-full rounded-md cursor-pointer`}
                                                onClick={() => {
                                                    setTaskAssignedTo(member);
                                                    setShowTeamMembersSelect(false);
                                                }}
                                            >
                                                <div className="flex justify-between items-center px-2">
                                                    <div className="flex justify-start items-center gap-x-3">
                                                        <p>{ member.fullName } <span className="dark:text-neutral-400 text-sm">({ member.position })</span></p>
                                                    </div>
                                                    { taskAssignedTo?.fullName === member.fullName && <Check className="w-4 h-4" /> }
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
                            <label className="text-sm md:text-base flex gap-x-0.5 font-semibold">
                                Subtasks (optional)
                            </label>
                            <div className="flex gap-x-3">
                                <input 
                                    disabled={isNewTaskBeingCreated}
                                    ref={subtaskInputRef}
                                    placeholder="Enter a subtask..." 
                                    className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                                    focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] py-2 px-4 
                                    outline-none grow disabled:opacity-50 ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 
                                    'cursor-text'}`} 
                                    onChange={(e) => setSubtask({ title: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addSubtask();
                                        }
                                    }}
                                />
                                <button 
                                    disabled={isNewTaskBeingCreated}
                                    className={`dark:bg-white dark:hover:bg-slate-200 p-2.5 rounded-md bg-neutral-900 
                                    hover:bg-neutral-900/90 disabled:opacity-50 ${isNewTaskBeingCreated ? 'cursor-not-allowed' : 
                                    'cursor-pointer'}`}
                                    onClick={addSubtask}
                                >
                                    <Plus className="dark:text-black text-white w-5 h-5" />
                                </button>
                            </div>
                        </div>                            
                        {
                            subtasks.length > 0 && (
                                <div className="flex flex-col gap-y-2 rounded-md">
                                    <span className="text-sm md:text-base">Subtasks ({ subtasks.length }):</span>
                                    <div className="dark:border-neutral-800 border-[1px] flex flex-col gap-y-3 p-2.5 rounded-md">
                                        {
                                            subtasks.map((subtask) => {
                                                return (
                                                    <div key={subtask.id} className="dark:bg-neutral-900 bg-neutral-200 py-1.5 px-3 flex 
                                                    justify-between items-center rounded-md">
                                                        <span className="text-sm md:text-base">{ subtask.title }</span>
                                                        <button 
                                                            className="p-2 rounded-full hover:bg-red-900 cursor-pointer transition-[background-color] 
                                                            duration-200"
                                                            onClick={() => setSubtasks(() => subtasks.filter((oldSubtask) => oldSubtask.id !== subtask.id ))}
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
            <div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
            border-neutral-200 p-4">
				<Button
					variant="secondary"
					size="lg"
					disabled={isNewTaskBeingCreated}
					onClick={() => setShowNewTaskModal(false)}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					size="lg"
					disabled={submitButtonDisabled}
					loading={isNewTaskBeingCreated}
					onClick={createNewTask}
				>
					Create Task
				</Button>
            </div>
        </Modal>
    )

}

export default NewTaskModal;