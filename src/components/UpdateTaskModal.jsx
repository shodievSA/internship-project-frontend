import { useState, useMemo, useEffect } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import { taskPriorityOptions } from "../utils/constant";
import AiEditor from "./AiEditor";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import SelectField from "./SelectField";
import DatePicker from "./DatePicker";
import FileAttachments from "./FileAttachments";
import taskService from "../services/taskService";
import TaskTitleField from "./TaskTitleField";

function UpdateTaskModal({ projectId, task, team, closeModal }) {
	const {
		id: taskId,
		title,
		description,
		priority,
		assignedTo: { id: assignedToId },
		deadline,
		filesMetaData,
	} = task;

	const { setTasks } = useProject();
	const { showToast } = useToast();

	const [taskBeingUpdated, setTaskBeingUpdated] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState(title);
	const [newTaskDescription, setNewTaskDescription] = useState(description);
	const [newTaskDeadline, setNewTaskDeadline] = useState(
		() => deadline.split("T")[0]
	);
	const [newTaskFiles, setNewTaskFiles] = useState([]);
	const [newTaskAssignedToId, setNewTaskAssignedToId] =
		useState(assignedToId);
	const [newTaskPriority, setNewTaskPriority] = useState(priority);
	const [filesFetched, setFilesFetched] = useState(false);

	const fileUpdates = useMemo(() => {
		if (!filesFetched) return { filesToAdd: [], filesToDelete: [] };

		const oldFileIds = filesMetaData.map((file) => file.id);
		const newFileIds = newTaskFiles.map((file) => file.id);

		const filesToAdd = newTaskFiles.filter(
			(newFile) => !oldFileIds.includes(newFile.id)
		);
		const filesToDelete = oldFileIds.filter(
			(id) => !newFileIds.includes(id)
		);

		return { filesToAdd, filesToDelete };
	}, [newTaskFiles, filesMetaData, filesFetched]);

	/* eslint-disable react-hooks/exhaustive-deps */
	const updatedTaskProps = useMemo(() => {
		const updatedProps = getUpdatedTaskProps({
			newTaskTitle: newTaskTitle,
			oldTaskTitle: title,
			newTaskDescription: newTaskDescription,
			oldTaskDescription: description,
			newTaskPriority: newTaskPriority,
			oldTaskPriority: priority,
			newTaskDeadline: newTaskDeadline,
			oldTaskDeadline: deadline,
			newTaskAssignedToId: newTaskAssignedToId,
			oldTaskAssignedToId: assignedToId,
		});

		return updatedProps;
	}, [
		newTaskTitle,
		newTaskDescription,
		newTaskPriority,
		newTaskDeadline,
		newTaskAssignedToId,
	]);
	/* eslint-enable react-hooks/exhaustive-deps */

	const submitButtonDisabled = useMemo(() => {
		const allowToSubmit = shouldEnableSubmitButton(
			updatedTaskProps,
			fileUpdates
		);

		return allowToSubmit ? false : true;
	}, [updatedTaskProps, fileUpdates]);

	useEffect(() => {
		async function fetchPresignedUrls() {
			const { fileUrls } = await taskService.getTaskFiles(
				projectId,
				taskId
			);
			await fetchFilesFromPresignedUrls(fileUrls);
		}

		async function fetchFilesFromPresignedUrls(fileUrls) {
			const responses = await Promise.all(
				fileUrls.map((file) => fetch(file.url))
			);
			const blobs = await Promise.all(
				responses.map((response) => response.blob())
			);
			const files = blobs.map(
				(blob, index) => new File([blob], fileUrls[index].fileName)
			);

			setNewTaskFiles(
				files.map((file, index) => {
					return {
						id: fileUrls[index].id,
						file: file,
					};
				})
			);

			setFilesFetched(true);
		}

		fetchPresignedUrls();
	}, []);

	async function updateTask() {
		const formData = prepareDataForSubmission(
			updatedTaskProps,
			fileUpdates
		);

		setTaskBeingUpdated(true);

		try {
			const { updatedTask } = await taskService.updateTask({
				projectId,
				taskId,
				formData,
			});

			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? updatedTask : task
				)
			);

			closeModal();

			showToast({
				variant: "success",
				title: "Task updated successfully!",
				message: "The task has been updated successfully",
			});
		} catch (err) {
			showToast({
				variant: "failure",
				title: err.message,
			});
		} finally {
			setTaskBeingUpdated(false);
		}
	}

	return (
		<Modal title="Edit Task" size="lg" closeModal={closeModal}>
			<div
				className="flex gap-y-8 flex-col grow overflow-y-auto px-6 pb-6 scrollbar-thin 
			dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800"
			>
				<div className="flex flex-col gap-y-8">
					<TaskTitleField
						taskDescription={newTaskDescription}
						value={newTaskTitle}
						setValue={setNewTaskTitle}
						disabled={taskBeingUpdated}
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
							value={newTaskPriority}
							setValue={setNewTaskPriority}
							options={taskPriorityOptions}
						/>
						<DatePicker
							label="Deadline"
							required={true}
							disabled={taskBeingUpdated}
							value={newTaskDeadline}
							setValue={setNewTaskDeadline}
						/>
					</div>
					<SelectField
						label="Assign to"
						disabled={taskBeingUpdated}
						placeholder="Select a team member"
						required={true}
						value={newTaskAssignedToId}
						setValue={setNewTaskAssignedToId}
						options={getAssignToOptions(team)}
					/>
					<FileAttachments
						fileAttachments={newTaskFiles}
						setFileAttachments={setNewTaskFiles}
					/>
				</div>
			</div>
			<div
				className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
			border-neutral-200 p-4"
			>
				<Button
					size="md"
					variant="secondary"
					disabled={taskBeingUpdated}
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					size="md"
					disabled={submitButtonDisabled}
					loading={taskBeingUpdated}
					onClick={updateTask}
				>
					Update Task
				</Button>
			</div>
		</Modal>
	);
}

function getUpdatedTaskProps(task) {
	const updated = {};

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

	if (task.newTaskPriority !== task.oldTaskPriority) {
		updated.priority = task.newTaskPriority;
	} else {
		delete updated.priority;
	}

	if (task.newTaskDeadline !== task.oldTaskDeadline.split("T")[0]) {
		updated.deadline = task.newTaskDeadline;
	} else {
		delete updated.deadline;
	}

	if (task.newTaskAssignedToId !== task.oldTaskAssignedToId) {
		updated.assignedTo = task.newTaskAssignedToId;
	} else {
		delete updated.assignedTo;
	}

	return updated;
}

function getAssignToOptions(team) {
	return team.map((member) => {
		return {
			label: `${member.name} - ${member.position}`,
			value: member.id,
		};
	});
}

function shouldEnableSubmitButton(updatedTaskProps, fileUpdates) {
	return (
		Object.keys(updatedTaskProps).length > 0 ||
		fileUpdates.filesToAdd.length > 0 ||
		fileUpdates.filesToDelete.length > 0
	);
}

function prepareDataForSubmission(updatedTaskProps, fileUpdates) {
	const formData = new FormData();

	formData.append("updatedTaskProps", JSON.stringify(updatedTaskProps));

	if (fileUpdates.filesToAdd.length > 0) {
		fileUpdates.filesToAdd.forEach((file) => {
			formData.append("filesToAdd", file.file);
		});
	}

	if (fileUpdates.filesToDelete.length > 0) {
		formData.append(
			"filesToDelete",
			JSON.stringify(fileUpdates.filesToDelete)
		);
	}

	return formData;
}

export default UpdateTaskModal;
