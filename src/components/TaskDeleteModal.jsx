import { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import taskService from "../services/taskService";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { AlertTriangle } from "lucide-react";

function TaskDeleteModal({ projectId, taskId, taskTitle, closeModal }) {
	const { setTasks } = useProject();
	const { showToast } = useToast();

	const [taskBeingDeleted, setTaskBeingDeleted] = useState(false);

	async function deleteTask() {
		
		setTaskBeingDeleted(true);

		try {

			await taskService.deleteTask(projectId, taskId);

			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskId)
			);

			showToast({
				variant: "success",
				title: "Task has been deleted successfully!",
			});

			closeModal(false);

		} catch (err) {

			showToast({
				variant: "error",
				title: err.message
			});

		} finally {

			setTaskBeingDeleted(false);

		}

	}

	return (
		<Modal
			size="md"
			titleIcon={<AlertTriangle className="text-red-800" />}
			title="Delete Task"
			subtitle={`Are you sure you want to delete the task "${taskTitle}"?`}
			closeModal={closeModal}
		>
			<div className="flex flex-col px-7 pb-7 gap-y-7">
				<div>
					<p>
						This will permanently remove the task and all its
						associated data. This action cannot be undone.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button
						size="md"
						variant="secondary"
						onClick={closeModal}
						disabled={taskBeingDeleted}
					>
						Cancel
					</Button>
					<Button
						size="md"
						variant="destructive"
						onClick={deleteTask}
						loading={taskBeingDeleted}
					>
						Delete Task
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default TaskDeleteModal;
