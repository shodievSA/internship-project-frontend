import { useState, useEffect } from "react";
import AiEditor from "./AiEditor";
import InputField from "./InputField";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import SelectField from "./SelectField";
import DatePicker from "./DatePicker";
import SubtaskInput from "./SubtaskInput";

function UpdateTaskModal({ onCancel, task, team }) {

	console.log(team)

	const {
		title,
		description,
		priority,
		assignedTo,
		subtasks,
		deadline
	} = task;

	const taskPriorityOptions = [
		{ label: "High", value: "high" },
		{ label: "Middle", value: "middle" },
		{ label: "Low", value: "low" }
	];

	const assignToOptions = team.map((member) => {
		return {
			label: `${member.name} - ${member.position}`,
			value: member.id
		}
	});

	console.log(assignedTo)

	const [taskDescriptionBeingEnhanced, setTaskDescriptionBeingEnhanced] = useState(false);
	const [taskBeingUpdated, setTaskBeingUpdated] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState(title);
	const [newTaskDescription, setNewTaskDescription] = useState(description);
	const [taskDescriptionAiChangesAccepted, setTaskDescriptionAiChangesAccepted] = useState(true);
	const [newTaskAssignedTo, setNewTaskAssignedTo] = useState(() => 
		assignToOptions.find((assignToOption) => assignToOption.value === assignedTo.id)
	);
	const [newTaskPriority, setNewTaskPriority] = useState(() => 
		taskPriorityOptions.find((priorityOption) => priorityOption.value === priority)
	);
	const [newTaskDeadline, setNewTaskDeadline] = useState(deadline);
	const [newSubtasks, setNewSubtasks] = useState(subtasks);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [updatedTaskProps, setUpdatedTaskProps] = useState({});

	function updateTask() {

		setTaskBeingUpdated(true);

	}

	useEffect(() => {

		setUpdatedTaskProps((prev) => {

			const updated = { ...prev };

			if (newTaskTitle.trim() !== title) {
				updated.title = newTaskTitle;
			} else {
				delete updated.title;
			}

			if (newTaskDescription.trim() !== description) {
				updated.description = newTaskDescription;
			} else {
				delete updated.description;
			}

			if (newTaskPriority.value !== priority) {
				updated.priority = newTaskPriority.value;
			} else {
				delete updated.priority;
			}

			if (newTaskDeadline !== deadline) {
				updated.deadline = newTaskDeadline;
			} else {
				delete updated.deadline;
			}

			if (newTaskAssignedTo.value !== assignedTo.id) {
				updated.assignedTo = newTaskAssignedTo.value;
			} else {
				delete updated.assignedTo;
			}

			if (newSubtasks.length !== subtasks.length) {
				updated.subtasks = newSubtasks;
			} else {
				delete updated.subtasks
			}

			return updated;

		});

	}, [
		newTaskTitle,
		newTaskDescription,
		newTaskPriority,
		newTaskDeadline,
		newTaskAssignedTo,
		newSubtasks
	]);

	useEffect(() => {

		setSubmitButtonDisabled(
			Object.keys(updatedTaskProps).length === 0
		);

	}, [updatedTaskProps]);

	return (
		<Modal title="Create New Task" size="lg">
			<div className="flex gap-y-8 flex-col grow overflow-y-auto px-6 pb-6 scrollbar-thin 
			dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800">
				<div className="flex flex-col gap-y-8">
					<InputField
						label="Task Title (optional)"
						disabled={taskBeingUpdated}
						placeholder="Enter a clear and concise task title"
						value={newTaskTitle}
						setValue={setNewTaskTitle}
					/>
					<AiEditor 
						label="Description"
						placeholder="Describe the task requirements, goals, and any important details..."
						required={true}
						error="You must include task description"
						rows={7}
						value={newTaskDescription}
						setValue={setNewTaskDescription}
						disabled={taskBeingUpdated}
						textBeingEnhancedWithAi={taskDescriptionBeingEnhanced}
						setTextBeingEnhancedWithAi={setTaskDescriptionBeingEnhanced}
						setChangesAccepted={setTaskDescriptionAiChangesAccepted}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
						<SelectField
							label="Priority"
							disabled={taskBeingUpdated}
							placeholder="Specify task priority"
							required={true}
							selected={newTaskPriority}
							setValue={setNewTaskPriority}
							options={[
								{ label: 'Low', value: 'low' },
								{ label: 'Middle', value: 'middle' }, 
								{ label: 'High', value: 'high' }
							]}
						/>
						<DatePicker
							disabled={taskBeingUpdated} 
							onChange={(e) => setNewTaskDeadline(e.target.value)}
							value={deadline.split("T")[0]}
						/>
					</div>
					<SelectField
						label="Assign to"
						disabled={taskBeingUpdated}
						placeholder="Select a team member"
						required={true}
						selected={newTaskAssignedTo}
						setValue={setNewTaskAssignedTo}
						options={assignToOptions}
					/>                   
					<SubtaskInput
						disabled={taskBeingUpdated}
						subtasks={newSubtasks}
						setSubtasks={setNewSubtasks}
					/>                                
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
			border-neutral-200 p-4">
				<Button
					variant="secondary"
					disabled={taskBeingUpdated}
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button
					disabled={submitButtonDisabled}
					loading={taskBeingUpdated}
					onClick={updateTask}
				>
					Update Task
				</Button>
			</div>
		</Modal>
	)

};

export default UpdateTaskModal;