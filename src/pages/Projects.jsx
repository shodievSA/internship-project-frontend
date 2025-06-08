import { useState } from "react";
import EmptyDashboard from "../components/EmptyDashboard";
import NewProjectModal from "../components/NewProjectModal";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../utils/data"

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
        <div className="h-full pt-10 lg:px-10">
            {
                showNewProjectModal && (
                    <NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
                )
            }
            {
                !projectCount > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <EmptyDashboard setShowNewProjectModal={setShowNewProjectModal} />
                )
            }
        </div>
    )
}

export default Projects;