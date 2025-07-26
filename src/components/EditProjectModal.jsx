import { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import { projectStatusOptions } from "../utils/constant";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { SquarePen } from "lucide-react";

function EditProjectModal({
    projectId,
    currentProjectTitle,
    currentProjectStatus,
    closeModal
}) {

	const { metaData, setMetaData } = useProject();
	const { showToast } = useToast();

    const [newProjectTitle, setNewProjectTitle] = useState(currentProjectTitle);
    const [newProjectStatus, setNewProjectStatus] = useState(currentProjectStatus);
    const [changesBeingSaved, setChangesBeingSaved] = useState(false);

	/* eslint-disable react-hooks/exhaustive-deps */
	const updatedProjectProps = useMemo(() => {

		const updated = {};

		if (newProjectStatus !== currentProjectStatus) {
			updated.status = newProjectStatus;
		} else {
			delete updated.status;
		}

		if (newProjectTitle.trim() !== currentProjectTitle) {
			updated.title = newProjectTitle;
		} else {
			delete updated.title;
		}

		return updated;

	}, [
		newProjectTitle,
        newProjectStatus,
	]);
	/* eslint-enable react-hooks/exhaustive-deps */

	const submitButtonDisabled = useMemo(() => {

		const valid = areProjectChangesValid(updatedProjectProps);
		return (valid ? false : true);

	}, [updatedProjectProps]);

    async function updateProject() {

        setChangesBeingSaved(true);

        try {

			const { updatedProject } = await projectService.updateProject(projectId, updatedProjectProps);

			setMetaData(() => ({ ...metaData, ...updatedProject }));

			closeModal();

			showToast({
				variant: "success",
				title: "Project updated successfully!"
			});

        } catch(err) {

            console.log("The following error occured while updating the project: " + err.message);

			showToast({
				variant: "failure",
				title: "Unexpected error occured while updating the project!"
			});

        } finally {

            setChangesBeingSaved(false);

        }

    }

    return (
        <Modal 
			title="Edit Project"
			titleIcon={<SquarePen className="w-5 h-5" />} 
			size="md"
			closeModal={closeModal}
		>
            <div className="flex flex-col px-5 pb-5 gap-y-4">
                <InputField
                    label="Project Title"
                    disabled={changesBeingSaved}
                    placeholder="Enter new project title"
                    required={true}
                    value={newProjectTitle}
                    setValue={setNewProjectTitle}
                    error="project title can't be empty"
                />
                <SelectField
                    label="Project Status"
                    disabled={changesBeingSaved}
                    required={true}
                    value={newProjectStatus}
                    setValue={setNewProjectStatus}
                    options={projectStatusOptions}
                    error="select valid project status"
                />
                <div className="grid grid-cols-2 gap-4">
                    <Button
						size="md"
                        variant="secondary"
                        disabled={changesBeingSaved}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
						size="md"
                        variant="primary"
                        disabled={submitButtonDisabled}
                        onClick={updateProject}
                        loading={changesBeingSaved}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );

}

function areProjectChangesValid(updatedProject) {

    const projectStatuses = ["active", "paused", "completed"];

    let isValid = true;

    if (Object.keys(updatedProject).length === 0) {

        isValid = false;

    } else {

        if ('title' in updatedProject) {
            if (!updatedProject.title.length > 0) {
                isValid = false;
            }
        }

        if ('status' in updatedProject) {
            if (!projectStatuses.includes(updatedProject.status)) {
                isValid = false;
            }
        }

    }

    return isValid;

};

export default EditProjectModal;