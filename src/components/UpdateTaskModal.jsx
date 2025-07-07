import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import AiEditor from "./AiEditor";
import InputField from "./InputField";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import SelectField from "./SelectField";
import DatePicker from "./DatePicker";
import SubtaskInput from "./SubtaskInput";

function UpdateTaskModal({ task, team, hideModal, onTaskUpdate }) {

	const { projectId } = useParams();

	const { showToast } = useToast();

	const {
		id,
		title,
		description,
		priority,
		assignedTo,
		subtasks,
		deadline
	} = task;

	const oldSubtaskIds = subtasks.map((subtask) => subtask.id);

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


	const [taskBeingUpdated, setTaskBeingUpdated] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState(title);
	const [newTaskDescription, setNewTaskDescription] = useState(description);
	const [newTaskAssignedTo, setNewTaskAssignedTo] = useState(() => 
		assignToOptions.find((assignToOption) => assignToOption.value === assignedTo.id)
	);
	const [newTaskPriority, setNewTaskPriority] = useState(() => 
		taskPriorityOptions.find((priorityOption) => priorityOption.value === priority)
	);
	const [newTaskDeadline, setNewTaskDeadline] = useState(deadline);
	const [newSubtasks, setNewSubtasks] = useState(() => 
		subtasks.map((subtask) => ({ id: subtask.id, title: subtask.title }))
	);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [updatedTaskProps, setUpdatedTaskProps] = useState({});
	const [newSubtaskIds, setNewSubtaskIds] = useState(() => subtasks.map((subtask) => subtask.id));

	async function updateTask() {

		setTaskBeingUpdated(true);

		try {

			const { updatedTask } = await projectService.updateTask(projectId, id, updatedTaskProps);

			onTaskUpdate(id, updatedTask);

			hideModal();

			showToast({
				variant: "success",
				title: "Task updated successfully!",
				message: "The task has been updated successfully"
			});

		} catch(err) {

			console.log("The following error occured while updating the task: " + err.message);

			showToast({
				variant: "failure",
				title: "Unexpected error occured",
				message: err.message
			});

		} finally {

			setTaskBeingUpdated(false);

		}

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

			let subtasksChanged = false;

			if (newSubtasks.length !== subtasks.length) {

				subtasksChanged = true;

			} else {

				oldSubtaskIds.forEach((id) => {
					if (!newSubtaskIds.includes(id)) {
						subtasksChanged = true;
					}
				});

			}
			
			if (subtasksChanged) {
				updated.subtasks = newSubtasks
			} else {
				delete updated.subtasks;
			}

			return updated;

		});

	}, [
		newTaskTitle,
		newTaskDescription,
		newTaskPriority,
		newTaskDeadline,
		newTaskAssignedTo,
		newSubtasks,
		newSubtaskIds
	]);

	useEffect(() => {

		setSubmitButtonDisabled(
			Object.keys(updatedTaskProps).length === 0
		);

	}, [updatedTaskProps]);

	useEffect(() => {

		setNewSubtaskIds(newSubtasks.map((subtask) => subtask.id));

	}, [newSubtasks]);

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
						lastId={oldSubtaskIds[oldSubtaskIds.length - 1]}
					/>                                
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
			border-neutral-200 p-4">
				<Button
					variant="secondary"
					disabled={taskBeingUpdated}
					onClick={hideModal}
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