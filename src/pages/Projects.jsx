import { useState } from "react";
import EmptyDashboard from "../components/EmptyDashboard";
import NewProjectModal from "../components/NewProjectModal";

function Projects() {

    const [projectCount, setProjectsCount] = useState(() => {
        try {
            const count = JSON.parse(localStorage.getItem('projectCount'));
            return (Number.isInteger(count) && Number.isFinite(count)) ? count : 0; // validating data
        } catch {
            return 0;
        }
    });

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);

    return (
        <div className="h-full">
            {
                showNewProjectModal && (
                    <NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
                )
            }
            {
                projectCount > 0 ? (
                    ""
                ) : (
                    <EmptyDashboard setShowNewProjectModal={setShowNewProjectModal} />
                )
            }
        </div>
    )

}

export default Projects;