import { useState, useMemo } from "react";
import { useToast } from "./ui/ToastProvider";
import { sprintStatusOptions } from "../utils/constant";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import DatePicker from "./DatePicker";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { SquarePen } from "lucide-react";
import SelectField from "./SelectField";
import sprintService from "../services/sprintService";

function EditSprintModal({ 
	projectId, 
	sprintId,
	sprint, 
	onSprintUpdate, 
	closeModal 
}) {

	const { 
		title, 
		description, 
		status, 
		startDate, 
		endDate 
	} = sprint;

	const { showToast } = useToast();

	const [newSprintTitle, setNewSprintTitle] = useState(title);
	const [newSprintDescription, setNewSprintDescription] = useState(description);
	const [newSprintStartDate, setNewSprintStartDate] = useState(startDate);
	const [newSprintEndDate, setNewSprintEndDate] = useState(endDate);
	const [newSprintStatus, setNewSprintStatus] = useState(status);
	const [sprintBeingUpdated, setSprintBeingUpdated] = useState(false);

	/* eslint-disable react-hooks/exhaustive-deps */
	const updatedSprintProps = useMemo(() => {

		const updatedProps = getSprintUpdatedProps({
			newTitle: newSprintTitle,
			newDescription: newSprintDescription,
			newStatus: newSprintStatus,
			newStartDate: newSprintStartDate,
			newEndDate: newSprintEndDate,
			oldTitle: title,
			oldDescription: description,
			oldStatus: status,
			oldStartDate: startDate,
			oldEndDate: endDate,
		});

		return updatedProps;

	}, [
		newSprintTitle,
		newSprintDescription,
		newSprintStartDate,
		newSprintEndDate,
		newSprintStatus,
	]);
	/* eslint-enable react-hooks/exhaustive-deps */

	const submitButtonDisabled = useMemo(() => {

		const allowToSubmit = shouldEnableSubmitButton(updatedSprintProps);
		return allowToSubmit ? false : true;

	}, [updatedSprintProps]);

	async function updateSprint() {

		setSprintBeingUpdated(true);

		try {

			const { updatedSprint } = await sprintService.updateSprint(
				projectId,
				sprintId,
				updatedSprintProps,
			);

			onSprintUpdate(updatedSprint);

			showToast({
				variant: "success",
				title: "Sprint updated successfully!",
			});

			closeModal();

		} catch (err) {

			console.log("The following error occured while updating the sprint " + err.message);

			showToast({
				variant: "failure",
				title: "Failed to update sprint!",
			});

		} finally {

			setSprintBeingUpdated(false);

		}

	}

	return (
		<Modal
			size="lg"
			title="Edit Sprint"
			titleIcon={<SquarePen className="w-5 h-5" />}
			closeModal={closeModal}
		>
			<div className="flex flex-col">
				<div className="flex flex-col gap-y-4 px-5 pb-5">
					<InputField
						label="Sprint title"
						placeholder="Enter sprint title here"
						value={newSprintTitle}
						setValue={setNewSprintTitle}
						required={true}
						error="Sprint title can't be empty"
						disabled={sprintBeingUpdated}
					/>
					<TextareaField
						label="Sprint description"
						placeholder="Enter sprint description here"
						value={newSprintDescription}
						setValue={setNewSprintDescription}
						rows={5}
						disabled={sprintBeingUpdated}
					/>
					<SelectField
						label="Sprint status"
						disabled={sprintBeingUpdated}
						value={newSprintStatus}
						setValue={setNewSprintStatus}
						options={sprintStatusOptions}
					/>
					<div className="grid grid-cols-2 gap-5">
						<DatePicker
							label="Start date"
							required={true}
							value={newSprintStartDate}
							setValue={setNewSprintStartDate}
							disabled={sprintBeingUpdated}
						/>
						<DatePicker
							label="End date"
							required={true}
							value={newSprintEndDate}
							setValue={setNewSprintEndDate}
							disabled={sprintBeingUpdated}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
            	border-neutral-200 p-4">
					<Button
						size="md"
						variant="secondary"
						onClick={closeModal}
						disabled={sprintBeingUpdated}
					>
						Cancel
					</Button>
					<Button
						size="md"
						onClick={updateSprint}
						disabled={submitButtonDisabled}
						loading={sprintBeingUpdated}
					>
						Update
					</Button>
				</div>
			</div>
		</Modal>
	);

}

function getSprintUpdatedProps(sprint) {

	const updated = {};

	if (sprint.newTitle.trim() !== sprint.oldTitle) {
		updated.title = sprint.newTitle;
	} else {
		delete updated.title;
	}

	if (sprint.newDescription.trim() !== sprint.oldDescription) {
		updated.description = sprint.newDescription;
	} else {
		delete updated.description;
	}

	if (sprint.newStatus !== sprint.oldStatus) {
		updated.status = sprint.newStatus;
	} else {
		delete updated.status;
	}

	if (sprint.newStartDate !== sprint.oldStartDate) {
		updated.startDate = sprint.newStartDate;
	} else {
		delete updated.startDate;
	}

	if (sprint.newEndDate !== sprint.oldEndDate) {
		updated.endDate = sprint.newEndDate;
	} else {
		delete updated.endDate;
	}

	return updated;

}

function shouldEnableSubmitButton(updatedSprintProps) {

	return Object.keys(updatedSprintProps).length > 0;

}

export default EditSprintModal;
