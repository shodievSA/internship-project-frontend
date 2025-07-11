import { useState, useEffect } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import AiEditor from "./AiEditor";
import InputField from "./InputField";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import SelectField from "./SelectField";
import DatePicker from "./DatePicker";

const taskPriorityOptions = [
	{ label: "High", value: "high" },
	{ label: "Middle", value: "middle" },
	{ label: "Low", value: "low" }
];

function UpdateTaskModal({ 
	projectId,
	task, 
	team, 
	closeModal 
}) {

	const {
		id,
		title,
		description,
		priority,
		assignedTo,
		deadline
	} = task;

	const { setTasks } = useProject();
	const { showToast } = useToast();

	const assignToOptions = team.map((member) => {
		return {
			label: `${member.name} - ${member.position}`,
			value: member.id
		}
	});

	const [taskBeingUpdated, setTaskBeingUpdated] = useState(false);
	const [updatedTaskProps, setUpdatedTaskProps] = useState({});
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

	const [newTaskTitle, setNewTaskTitle] = useState(title);
	const [newTaskDescription, setNewTaskDescription] = useState(description);
	const [newTaskDeadline, setNewTaskDeadline] = useState(deadline);

	const [newTaskAssignedTo, setNewTaskAssignedTo] = useState(() => 
		assignToOptions.find((assignToOption) => assignToOption.value === assignedTo.id)
	);
	const [newTaskPriority, setNewTaskPriority] = useState(() => 
		taskPriorityOptions.find((priorityOption) => priorityOption.value === priority)
	);

	async function updateTask() {

		setTaskBeingUpdated(true);

		try {

			const { updatedTask } = await projectService.updateTask({
				projectId: projectId, 
				taskId: id, 
				updatedTaskProps: updatedTaskProps
			});

			setTasks((prevTasks) => prevTasks.map((task) => (task.id === id) ? updatedTask : task));

			closeModal();

			showToast({
				variant: "success",
				title: "Task updated successfully!",
				message: "The task has been updated successfully"
			});

		} catch(err) {

			showToast({
				variant: "failure",
				title: err.message
			});

		} finally {

			setTaskBeingUpdated(false);

		}

	}

	useEffect(() => {

		const updatedProps = getUpdatedTaskProps(updatedTaskProps, {
			newTaskTitle: newTaskTitle,
			oldTaskTitle: title,
			newTaskDescription: newTaskDescription,
			oldTaskDescription: description,
			newTaskPriority: newTaskPriority,
			oldTaskPriority: priority,
			newTaskDeadline: newTaskDeadline,
			oldTaskDeadline: deadline,
			newTaskAssignedTo: newTaskAssignedTo,
			oldTaskAssignedTo: assignedTo,
		});

		setUpdatedTaskProps(updatedProps);

	}, [
		newTaskTitle,
		newTaskDescription,
		newTaskPriority,
		newTaskDeadline,
		newTaskAssignedTo
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
							value={newTaskDeadline.split("T")[0]}
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
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
			border-neutral-200 p-4">
				<Button
					variant="secondary"
					disabled={taskBeingUpdated}
					onClick={closeModal}
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

function getUpdatedTaskProps(prevUpdates, task) {

	const updated = { ...prevUpdates };

	if (task.newTaskTitle.trim() !== task.oldTaskTitle) {
		updated.title = task.newTaskTitle;
	} else {
		delete updated.title;
	}

	if (task.newTaskDescription.trim() !== task.oldTaskDescription) {
		updated.description = task.newTaskDescription;
	} else {
		delete updated.description;
	}

	if (task.newTaskPriority.value !== task.oldTaskPriority) {
		updated.priority = task.newTaskPriority.value;
	} else {
		delete updated.priority;
	}

	if (task.newTaskDeadline !== task.oldTaskDeadline) {
		updated.deadline = task.newTaskDeadline;
	} else {
		delete updated.deadline;
	}

	if (task.newTaskAssignedTo.value !== task.oldTaskAssignedTo.id) {
		updated.assignedTo = task.newTaskAssignedTo.value;
	} else {
		delete updated.assignedTo;
	}

	return updated;

}

export default UpdateTaskModal;