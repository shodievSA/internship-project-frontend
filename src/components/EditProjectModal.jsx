import { useEffect, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useToast } from "./ui/ToastProvider";
import projectService from "../services/projectService";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import InputField from "./InputField";
import SelectField from "./SelectField";

const projectStatusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
    { label: 'Completed', value: 'completed' }
];

function EditProjectModal({
    projectId,
    currentProjectTitle,
    currentProjectStatus,
    closeModal
}) {

	const { metaData, setMetaData } = useProject();
	const { showToast } = useToast();

    const [newProjectTitle, setNewProjectTitle] = useState(currentProjectTitle);
    const [newProjectStatus, setNewProjectStatus] = useState(() => projectStatusOptions.find(
        (option) => option.value === currentProjectStatus
    ));
    const [changesBeingSaved, setChangesBeingSaved] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [updatedProjectProps, setUpdatedProjectProps] = useState({});

    useEffect(() => {

        setUpdatedProjectProps((prev) => {

            const updated = { ...prev };

            if (newProjectStatus.value.trim() !== currentProjectStatus) {
                updated.status = newProjectStatus.value;
            } else {
                delete updated.status;
            }

            if (newProjectTitle.trim() !== currentProjectTitle) {
                updated.title = newProjectTitle;
            } else {
                delete updated.title;
            }

            return updated;

        });

    }, [
        newProjectTitle,
        newProjectStatus,
        currentProjectStatus,
        currentProjectTitle
    ]);

    useEffect(() => {

        setSubmitButtonDisabled(!areProjectChangesValid(updatedProjectProps));

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
        <Modal title="Edit Project" size="md">
            <div className="flex flex-col px-6 pb-6 gap-y-8">
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
                    selected={newProjectStatus}
                    setValue={setNewProjectStatus}
                    options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Paused', value: 'paused' },
                        { label: 'Completed', value: 'completed' }
                    ]}
                    error="select valid project status"
                />
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="secondary"
                        disabled={changesBeingSaved}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
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