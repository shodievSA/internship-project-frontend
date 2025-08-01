import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { TriangleAlert } from "lucide-react";

function RemoveMemberModal({
	member,
	memberBeingRemoved,
	onConfirm,
	onCancel,
}) {
	const removeMemberWarnings = [
		"Remove their access to this project",
		"Unassign them from all tasks",
		"Remove them from project communications",
		"This action cannot be undone",
	];

	return (
		<Modal
			title="Remove Team Member"
			titleIcon={<TriangleAlert className="text-red-700 w-6 h-6" />}
			subtitle={`Are you sure you want to remove ${member.name} from this project?`}
			size="md"
		>
			<div className="flex flex-col px-7 pb-7 gap-y-8">
				<div
					className="dark:bg-red-950 dark:border-red-800 bg-red-100 border-red-300 
				text-red-500 flex flex-col gap-y-2 p-4 rounded-md border-[1px]"
				>
					<span>This action will permanently:</span>
					<ul className="list-disc pl-5">
						{removeMemberWarnings.map((warning) => {
							return <li className="mt-1">{warning}</li>;
						})}
					</ul>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button
						disabled={memberBeingRemoved}
						variant="secondary"
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={onConfirm}
						loading={memberBeingRemoved}
					>
						Remove Member
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default RemoveMemberModal;
