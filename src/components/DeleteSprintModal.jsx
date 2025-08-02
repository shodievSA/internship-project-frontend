import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/ToastProvider";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { TriangleAlert } from "lucide-react";
import sprintService from "../services/sprintService";

const deleteWarnings = [
	"Delete the sprint and its corresponding tickets",
	"This action can't be undone",
];

function DeleteSprintModal({ 
	projectId, 
	sprintId,
	sprint, 
	onSprintDelete, 
	closeModal 
}) {

	const [confirmMessage, setConfirmMessage] = useState("");
	const [sprintBeingDeleted, setSprintBeingDeleted] = useState(false);

	const { showToast } = useToast();
	const navigate = useNavigate();

	/* eslint-disable react-hooks/exhaustive-deps */
	const submitButtonDisabled = useMemo(() => {

		return confirmMessage.trim() === sprint.title ? false : true;

	}, [confirmMessage]);
	/* eslint-enable react-hooks/exhaustive-deps */

	async function deleteSprint() {

		setSprintBeingDeleted(true);

		try {

			await sprintService.deleteSprint(projectId, sprintId);

			showToast({
				variant: "success",
				title: "Deleted sprint successfully!",
			});

			onSprintDelete(sprintId);

			navigate(-1, { replace: true });

		} catch (err) {

			console.log("The following error occured while deleting the project: " + err.message);

			showToast({
				variant: "failure",
				title: "Failed to delete the sprint!",
			});

		} finally {

			setSprintBeingDeleted(false);
		}

	}

	return (
		<Modal
			size="md"
			title="Delete Sprint"
			titleIcon={<TriangleAlert className="text-red-700 w-6 h-6" />}
			subtitle={`Are you sure you want to delete ${sprint.title} sprint?`}
			closeModal={closeModal}
		>
			<div className="flex flex-col px-5 pb-5 gap-y-8">
				<div
					className="dark:bg-red-950 dark:border-red-800 bg-red-100 border-red-300 
				text-red-500 flex flex-col gap-y-2 p-4 rounded-md border-[1px]"
				>
					<span>This action will permanently:</span>
					<ul className="list-disc pl-5">
						{deleteWarnings.map((warning, index) => {
							return <li key={index} className="mt-1">{warning}</li>;
						})}
					</ul>
				</div>
				<div className="flex flex-col gap-y-3">
					<label className="dark:text-neutral-400 text-slate-500">
						Type <span className="font-bold">{sprint.title}</span>{" "}
						to confirm:
					</label>
					<Input
						disabled={sprintBeingDeleted}
						placeholder={sprint.title}
						value={confirmMessage}
						onChange={(e) => setConfirmMessage(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Button
						size="md"
						disabled={sprintBeingDeleted}
						variant="secondary"
						onClick={() => closeModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						variant="destructive"
						disabled={submitButtonDisabled}
						onClick={deleteSprint}
						loading={sprintBeingDeleted}
					>
						Delete Project
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteSprintModal;
