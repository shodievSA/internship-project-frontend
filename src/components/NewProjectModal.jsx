import { useMemo, useState } from "react";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import InputField from "./InputField";

function NewProjectModal({ closeModal, onProjectCreated }) {

	const { showToast } = useToast();

	const [projectTitle, setProjectTitle] = useState("");
	const [userPosition, setUserPosition] = useState("");
	const [projectBeingSaved, setProjectBeingSaved] = useState(false);

	const submitButtonDisabled = useMemo(() => {

		return (!projectTitle || !userPosition);

	}, [projectTitle, userPosition]);

	async function createNewProject() {

		setProjectBeingSaved(true);

		try {

			const { project } = await projectService.createProject(projectTitle, userPosition);

			closeModal();

			onProjectCreated(project);

			showToast({
				variant: "success",
				title: "Project created successfully!"
			});
		
		} catch (err) {

			showToast({
				variant: "failure",
				title: err.message
			});

		} finally {

			setProjectBeingSaved(false);

		}

	}

	return (
		<Modal
			size="md"
			title="New Project"
			closeModal={closeModal}
		>
			<div className="flex flex-col gap-y-4 px-5 pb-5">
				<InputField
					label="Project Title"
					disabled={projectBeingSaved}
					required={true}
					value={projectTitle}
					setValue={setProjectTitle}
					error="You must include project title"
				/>
				<InputField 
					label="Your position in this project (e.g team lead)"
					disabled={projectBeingSaved}
					required={true}
					value={userPosition}
					setValue={setUserPosition}
					error="You must include your position"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
				<Button
					variant="secondary"
					size="md"
					disabled={projectBeingSaved}
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					size="md"
					disabled={submitButtonDisabled}
					loading={projectBeingSaved}
					onClick={createNewProject}
				>
					Create Project
				</Button>
			</div>
		</Modal>
	);

}

export default NewProjectModal;
