import { Outlet } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import ProjectLayoutNavigation from "../components/ProjectLayoutNavigation";
import ProjectLayoutHeader from "../components/ProjectLayoutHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function ProjectLayout() {

	const { projectLoaded, error } = useProject();

	if (!projectLoaded) return <LoadingState message={"One moment… making sense of your chaos"} />
	if (error) return <ErrorState message={"Enexpected error occured while loading the project"} />

	return (
		<div className="flex flex-col h-full gap-y-4 px-4 lg:px-6 pt-4">
			<ProjectLayoutHeader />
			<ProjectLayoutNavigation />
			<Outlet />
		</div>
	);
	
}

export default ProjectLayout;
