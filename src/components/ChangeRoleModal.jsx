import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { TriangleAlert } from "lucide-react";

function ChangeRoleModal({
	member,
	memberBeingRemoved,
	onConfirm,
	onCancel,
	action,
}) {
	const isPromotion = action === "promote";

	const demoteMemberWarnings = [
		"Remove their manager privileges",
		"Restrict their access to project settings",
		"Remove their ability to manage team members",
	];

	const promoteMemberWarnings = [
		"Grant them manager privileges",
		"Allow them to manage team members",
		"Give them access to project settings",
	];

	return (
		<Modal
			title={`${isPromotion ? "Promote team member" : "Demote team member"}`}
			titleIcon={<TriangleAlert className="text-orange-700 w-6 h-6" />}
			subtitle={`Are you sure you want to ${isPromotion ? "promote" : "demote"} ${member.name}?`}
			size="md"
		>
			<div className="flex flex-col px-7 pb-7 gap-y-8">
				<div
					className="dark:bg-orange-950 dark:border-orange-800 bg-orange-100 border-orange-300 
				text-orange-500 flex flex-col gap-y-2 p-4 rounded-md border-[1px]"
				>
					<span>This action will permanently:</span>
					<ul className="list-disc pl-5">
						{(isPromotion
							? promoteMemberWarnings
							: demoteMemberWarnings
						).map((warning) => {
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
						variant="alert"
						onClick={onConfirm}
						loading={memberBeingRemoved}
					>
						{isPromotion ? "Confirm promotion" : "Confirm demotion"}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ChangeRoleModal;
