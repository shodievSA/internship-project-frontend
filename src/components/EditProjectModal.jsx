import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import InputField from "./InputField";
import SelectField from "./SelectField";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function EditProjectModal({ 
    projectId, 
    currentProjectTitle, 
    currentProjectStatus, 
    showModal 
}) {

    const [newProjectTitle, setNewProjectTitle] = useState(currentProjectTitle);
    const [newProjectStatus, setNewProjectStatus] = useState(currentProjectStatus);
    const [newProjectTitleValid, setNewProjectTitleValid] = useState(true);
    const [newProjectStatusValid, setNewProjectStatusValid] = useState(true);
    const [changesBeingSaved, setChangesBeingSaved] = useState(false);
    const [updatedProjectProps, setUpdatedProjectProps] = useState({});
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    useEffect(() => {

        setUpdatedProjectProps((prev) => {

            const updated = { ...prev };

            if (newProjectStatus.trim() !== currentProjectStatus) {
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

        });

    }, [
            newProjectTitle, 
            newProjectStatus,
            currentProjectStatus,
            currentProjectTitle
       ]
    );

    useEffect(() => {

        if (areProjectChangesValid(
            newProjectTitleValid, 
            newProjectStatusValid,
            updatedProjectProps, 
            changesBeingSaved, 
        )) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }

    }, [
            newProjectTitleValid, 
            updatedProjectProps, 
            newProjectStatusValid, 
            changesBeingSaved
       ]
    );

    async function updateProject() {

        setChangesBeingSaved(true);

        try {

            const res = await fetch(`${SERVER_BASE_URL}/api/v1/update-project/${projectId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updatedProjectProps })
            });

            if (res.ok) {

                const { updatedProject } = await res.json();

                console.log(updatedProject);

            } else {

                throw new Error;

            }

        } catch {

            console.log('Error occured while updating the project');

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
                    isValid={setNewProjectTitleValid}
                />
                <SelectField
                    label="Project Status"
                    disabled={changesBeingSaved}
                    required={true}
                    value={newProjectStatus}
                    setValue={setNewProjectStatus}
                    options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Paused', value: 'paused' },
                        { label: 'Completed', value: 'completed' }
                    ]}
                    error="select valid project status"
                    isValid={setNewProjectStatusValid}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                        variant="secondary" 
                        disabled={changesBeingSaved}
                        onClick={() => showModal(false)}
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

function areProjectChangesValid(
    titleValid, 
    statusValid, 
    updatedProps, 
    changesBeingSaved
) {

    if (
        !titleValid
        || 
        Object.keys(updatedProps).length === 0
        ||
        changesBeingSaved
        ||
        !statusValid
    ) {
        return false;
    } else {
        return true;
    }

}

export default EditProjectModal;