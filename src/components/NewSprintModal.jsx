import { useEffect, useState } from "react";
import sprintService from "../services/sprintService";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import Modal from "./ui/Modal";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import DatePicker from "./DatePicker";
import Button from "./ui/Button";
import { Timer } from "lucide-react";

function NewSprintModal({ projectId, currentMemberId, closeModal }) {
	const { sprints, setSprints } = useProject();
	const { showToast } = useToast();

	const [sprintTitle, setSprintTitle] = useState("");
	const [sprintDescription, setSprintDescription] = useState("");
	const [sprintStartDate, setSprintStartDate] = useState(null);
	const [sprintEndDate, setSprintEndDate] = useState(null);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [sprintBeingCreated, setSprintBeingCreated] = useState(false);

	useEffect(() => {
		if (sprintTitle && sprintStartDate && sprintEndDate) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}
	}, [sprintTitle, sprintStartDate, sprintEndDate]);

	async function createNewSprint() {
		setSprintBeingCreated(true);

		try {
			const { newSprint } = await sprintService.createSprint(projectId, {
				title: sprintTitle,
				description: sprintDescription,
				startDate: sprintStartDate,
				endDate: sprintEndDate,
				createdBy: currentMemberId,
			});

			setSprints([newSprint, ...sprints]);

			showToast({
				variant: "success",
				title: "New sprint created successfully!",
			});

			closeModal();
		} catch (err) {
			showToast({
				variant: "failure",
				title: err.message,
			});
		} finally {
			setSprintBeingCreated(false);
		}
	}

	return (
		<Modal
			size="lg"
			title="New Sprint"
			titleIcon={<Timer />}
			closeModal={closeModal}
		>
			<div className="flex flex-col">
				<div className="flex flex-col gap-y-4 px-5 pb-5">
					<InputField
						label="Sprint title"
						placeholder="Enter sprint title here"
						value={sprintTitle}
						setValue={setSprintTitle}
						required={true}
						error="Sprint title can't be empty"
						disabled={sprintBeingCreated}
					/>
					<TextareaField
						label="Sprint description"
						placeholder="Enter sprint description here"
						value={sprintDescription}
						setValue={setSprintDescription}
						rows={5}
						disabled={sprintBeingCreated}
					/>
					<div className="grid grid-cols-2 gap-5">
						<DatePicker
							label="Start date"
							required={true}
							value={sprintStartDate}
							setValue={setSprintStartDate}
							disabled={sprintBeingCreated}
						/>
						<DatePicker
							label="End date"
							required={true}
							value={sprintEndDate}
							setValue={setSprintEndDate}
							disabled={sprintBeingCreated}
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
						onClick={closeModal}
						disabled={sprintBeingCreated}
					>
						Cancel
					</Button>
					<Button
						size="md"
						onClick={createNewSprint}
						disabled={submitButtonDisabled}
						loading={sprintBeingCreated}
					>
						Create
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default NewSprintModal;
