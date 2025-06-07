import { useState } from "react";
import EmptyDashboard from "../components/EmptyDashboard";

function Projects() {

    const [projectCount, setProjectsCount] = useState(() => {
        try {
            const count = JSON.parse(localStorage.getItem('projectsCount'));
            return (Number.isInteger(count) && Number.isFinite(count)) ? count : 0; // validating data
        } catch {
            return 0;
        }
    });

    return (
        <div className="h-full">
            {
                projectCount > 0 ? (
                    ""
                ) : (
                    <EmptyDashboard />
                )
            }
        </div>
    )

}

export default Projects;