import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { AlertTriangle } from "lucide-react";

function TaskDeleteModal({ 
	taskTitle, 
	taskBeingDeleted, 
	hideModal, 
	onConfirm
}) {

	return (
		<Modal
			size="md"
			titleIcon={<AlertTriangle className="text-red-800" />}
			title="Delete Task"
			subtitle={`Are you sure you want to delete the task "${taskTitle}"?`}
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
						onClick={hideModal}
						disabled={taskBeingDeleted}
					>
						Cancel
					</Button>
					<Button 
						size="md" 
						variant="destructive"
						onClick={onConfirm}
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