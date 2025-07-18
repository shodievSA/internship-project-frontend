import { useState, useEffect } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import AiEditor from "./AiEditor";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import projectService from "../services/projectService";
import SelectField from "./SelectField";
import DatePicker from "./DatePicker";
import TaskTitleField from "./TaskTitleField";
import FileAttachments from "./FileAttachments";

function NewTaskModal({ 
	projectId,
	teamMembers, 
	currentMemberId,
	closeModal
}) {

	const { tasks, setTasks } = useProject();
	const { showToast } = useToast();

	const assignToOptions = teamMembers.map((member) => {

		return {
			label: `${member.name} - ${member.position}`,
			value: member.id
		}

	});

    const [isNewTaskBeingCreated, setIsNewTaskBeingCreated] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState(null);
    const [taskDeadline, setTaskDeadline] = useState(null);
    const [taskAssignedTo, setTaskAssignedTo] = useState(null);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    async function createNewTask() {

       setIsNewTaskBeingCreated(true);

       try {
	   
			const newTask = await projectService.createTask(projectId, 
				{
					title: taskTitle,
					description: taskDescription,
					priority: taskPriority.value,
					deadline: taskDeadline,
					assignedTo: taskAssignedTo.value,
					assignedBy: currentMemberId
				}
			);

			setTasks([newTask, ...tasks]);

			showToast({
				variant: "success",
				title: "New task created!",
				message: "The new task has been created successfully!"
			});

			closeModal();

	    } catch(err) {

			console.log('The following error occured while creating task: ' + err);

			showToast({
				variant: "failure",
				title: "Unexpected error occured!",
				message: "Unexpected error occured while creating new task"
			});

	    } finally {

			setIsNewTaskBeingCreated(false);
			
	    }

    }

	useEffect(() => {

		if (
			taskTitle &&
			taskDescription &&
			taskPriority &&
			taskDeadline &&
			taskAssignedTo
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
		taskTitle
	   ]
	);

    return (
        <Modal title="Create New Task" size="lg">
            <div className="flex flex-col grow gap-y-8 overflow-y-auto px-6 pb-6 
			scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800">
                <div className="flex flex-col gap-y-8">
                    <TaskTitleField
                        disabled={isNewTaskBeingCreated}
                        value={taskTitle}
                        setValue={setTaskTitle}
						taskDescription={taskDescription}
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
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
						<SelectField
							label="Priority"
							disabled={isNewTaskBeingCreated}
							placeholder="Specify task priority"
							required={true}
							selected={taskPriority}
							setValue={setTaskPriority}
							options={[
								{ label: 'Low', value: 'low' },
								{ label: 'Middle', value: 'middle' }, 
								{ label: 'High', value: 'high' }
							]}
						/>
						<DatePicker
							disabled={isNewTaskBeingCreated} 
							onChange={(e) => setTaskDeadline(e.target.value + "T00:00:00+05:00")}
						/>       
                    </div>
					<SelectField
						label="Assign to"
						disabled={isNewTaskBeingCreated}
						placeholder="Select a team member"
						required={true}
						selected={taskAssignedTo}
						setValue={setTaskAssignedTo}
						options={assignToOptions}
					/>
					{/* File Attachments */}
					<FileAttachments />                
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
            border-neutral-200 p-4">
				<Button
					variant="secondary"
					disabled={isNewTaskBeingCreated}
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					disabled={submitButtonDisabled}
					loading={isNewTaskBeingCreated}
					onClick={createNewTask}
				>
					Create Task
				</Button>
            </div>
        </Modal>
    )

};

export default NewTaskModal;