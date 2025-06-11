import { Outlet } from "react-router-dom";

function ProjectDetails() {

    return (
        <div>
            <h1>This is project details page</h1>
            <Outlet />
        </div>
    )

}

export default ProjectDetails;