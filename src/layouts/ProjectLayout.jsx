import { Outlet } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import ProjectLayoutNavigation from "../components/ProjectLayoutNavigation";
import ProjectLayoutHeader from "../components/ProjectLayoutHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function ProjectLayout() {

	const { 
		projectLoaded, 
		error, 
		metaData, 
		currentMemberId, 
		team 
	} = useProject();

	if (!projectLoaded) return <LoadingState message={"Loading your project info"} />
	if (error) return <ErrorState message={"Enexpected error occured while loading the project"} />

    return (
        <div className="flex flex-col h-full gap-y-6 px-6 pt-6">
            <ProjectLayoutHeader 
				metaData={metaData}
				currentMemberId={currentMemberId}
				team={team}
			/>
            <ProjectLayoutNavigation />
            <Outlet />
        </div>
    );

}

export default ProjectLayout;