import { useState } from "react";
import TextareaField from "./TextareaField";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useToast } from "./ui/ToastProvider";
import { CircleCheckBig } from "lucide-react";

function SubmitTaskModal({ onTaskSubmit, onClose }) {

	const { showToast } = useToast();

	const [submissionNote, setSubmissionNote] = useState("");
	const [taskBeingSubmitted, setTaskBeingSubmitted] = useState(false);

	async function submitTask() {

		try {

			setTaskBeingSubmitted(true);
	
			await onTaskSubmit(submissionNote);

			showToast({
				variant: "success",
				title: "Your task has been submitted for review!"
			});

			onClose();

		} catch (err) {

			showToast({
				variant: "error",
				title: err.message
			});

		} finally {

			setTaskBeingSubmitted(false);

		}

	}

	return (
		<Modal
			titleIcon={<CircleCheckBig className="w-5 h-5" />}
			title="Submit Task"
			size="lg"
			closeModal={onClose}
		>
			<div className="flex flex-col gap-y-4 px-5 pb-5">
				<TextareaField 
					label={"Submission note"}
					placeholder={"Describe how you completed this task..."}
					value={submissionNote}
					setValue={setSubmissionNote}
					disabled={taskBeingSubmitted}
					rows={8}
				/>
				<div className="grid grid-cols-2 gap-4">
					<Button
						size="md"
						variant="secondary"
						onClick={onClose}
						disabled={taskBeingSubmitted}
					>
						Cancel
					</Button>
					<Button
						size="md"
						variant="primary"
						onClick={submitTask}
						loading={taskBeingSubmitted}
						disabled={taskBeingSubmitted}
					>
						Submit
					</Button>
				</div>
			</div>
		</Modal>
	);

}

export default SubmitTaskModal;