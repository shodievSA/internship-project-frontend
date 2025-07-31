import { createContext, useContext, useEffect, useState } from "react";
import projectService from "../services/projectService";
import NewProjectModal from "../components/NewProjectModal";

const ProjectsContext = createContext();

function ProjectsContextProvider({ children }) {

	const [projects, setProjects] = useState([]);
	const [error, setError] = useState(null);
	const [projectsLoaded, setProjectsLoaded] = useState(false);
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [userProjectCount, setUserProjectCount] = useState(() => getProjectCount());

	useEffect(() => {

		async function fetchProjects() {

			try {

				const projectPreviews = await projectService.getProjects();
				setProjects(projectPreviews);

			} catch (err) {

				setError(err.message || "Failed to load projects");

			} finally {

				setTimeout(() => {

					setProjectsLoaded(true);

				}, 800);

			}

		}

		fetchProjects();

	}, []);

	function handleProjectCreated(newProject) {

		setProjects((prevProjectPreviews) => [newProject, ...prevProjectPreviews]);

	};

	const context = {
		projects, 
		setProjects,
		error,
		setError,
		projectsLoaded,
		setProjectsLoaded,
		showNewProjectModal,
		setShowNewProjectModal,
		userProjectCount,
		setUserProjectCount
	};

	return (
		<ProjectsContext.Provider value={context}>
			<>
				{ children }
				{ showNewProjectModal && (
					<NewProjectModal 
						closeModal={() => setShowNewProjectModal(false)} 
						onProjectCreated={handleProjectCreated} 
					/>
				)}
			</>
		</ProjectsContext.Provider>
	)

}

export const useProjectsContext = () => useContext(ProjectsContext);

function getProjectCount() {

	try {

		const raw = localStorage.getItem("projectCount");
		const count = raw ? JSON.parse(raw) : null;

		return (Number.isInteger(count) && Number.isFinite(count)) ? count : 0;

	} catch {

		return 0;

	}

}

export default ProjectsContextProvider;