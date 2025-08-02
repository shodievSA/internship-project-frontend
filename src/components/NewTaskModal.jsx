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
import { taskPriorityOptions } from "../utils/constant";

function NewTaskModal({
	projectId,
	sprintId,
	onNewTaskCreated,
	closeModal,
}) {

	const { team, currentMemberId } = useProject();
	const { showToast } = useToast();

	const [isNewTaskBeingCreated, setIsNewTaskBeingCreated] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskPriority, setTaskPriority] = useState(null);
	const [taskDeadline, setTaskDeadline] = useState(null);
	const [taskAssignedTo, setTaskAssignedTo] = useState(null);
	const [fileAttachments, setFileAttachments] = useState([]);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

	async function createNewTask() {

		const formData = new FormData();

		formData.append("title", taskTitle);
		formData.append("description", taskDescription);
		formData.append("priority", taskPriority);
		formData.append("deadline", taskDeadline);
		formData.append("assignedTo", taskAssignedTo);
		formData.append("assignedBy", currentMemberId);
		formData.append("projectId", projectId);
		formData.append("sprintId", sprintId);

		fileAttachments.forEach((file) => {
			formData.append("fileAttachments", file.file);
		});

		setIsNewTaskBeingCreated(true);

		try {

			const { newTask } = await projectService.createTask(
				projectId,
				sprintId,
				formData,
			);

			onNewTaskCreated(newTask);

			showToast({
				variant: "success",
				title: "New task created!",
				message: "The new task has been created successfully!",
			});

			closeModal();

		} catch (err) {

			console.log(
				"The following error occured while creating task: " + err,
			);

			showToast({
				variant: "failure",
				title: "Unexpected error occured!",
				message: "Unexpected error occured while creating new task",
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
		taskTitle,
	]);

	return (
		<Modal title="Create New Task" size="lg" closeModal={closeModal}>
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
							value={taskPriority}
							setValue={setTaskPriority}
							options={taskPriorityOptions}
						/>
						<DatePicker
							label="Deadline"
							required={true}
							disabled={isNewTaskBeingCreated}
							value={taskDeadline}
							setValue={setTaskDeadline}
						/>
					</div>
					<SelectField
						label="Assign to"
						disabled={isNewTaskBeingCreated}
						placeholder="Select a team member"
						required={true}
						value={taskAssignedTo}
						setValue={setTaskAssignedTo}
						options={getAssignToOptions(team)}
					/>
					<FileAttachments
						fileAttachments={fileAttachments}
						setFileAttachments={setFileAttachments}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
            border-neutral-200 p-4">
				<Button
					size="md"
					variant="secondary"
					disabled={isNewTaskBeingCreated}
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					size="md"
					disabled={submitButtonDisabled}
					loading={isNewTaskBeingCreated}
					onClick={createNewTask}
				>
					Create Task
				</Button>
			</div>
		</Modal>
	);
}

function getAssignToOptions(teamMembers) {

	const assignToOptions = teamMembers.map((member) => {
		return {
			label: `${member.name} - ${member.position}`,
			value: member.id,
		};
	});

	return assignToOptions;
	
}

export default NewTaskModal;
