import { Outlet, useLocation } from "react-router-dom";

function ProjectDetails() {

    const location = useLocation();
    const { state: { projectInfo } } = location;

    return (
        <div>
            
        </div>
    )

}

export default ProjectDetails;