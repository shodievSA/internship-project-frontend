import { useSearchParams } from "react-router-dom";
import { filterProjects } from "../utils/filterUtils";
import ProjectCard from "../components/ProjectCard";
import ProjectHeader from "../components/ProjectHeader";
import EmptySearch from "../components/EmptySearch";
import NewProjectModal from "../components/NewProjectModal";
import { useMemo, useState, useEffect } from "react";
import projectService from "../services/projectService";

const Projects = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch projects from server on mount
	useEffect(() => {

		async function fetchProjects() {

			setLoading(true);
			setError("");

			try {

				const response = await projectService.getProjects();
				setProjects(response);

				console.log("Project data", response);

			} catch (err) {

				setError(err.message || "Failed to load projects");

			} finally {

				setLoading(false);

			}

		}

		fetchProjects();

	}, []);

	// Keep track of filter values
	const currentFilters = {

		search: searchParams.get("search") || "",
		status: searchParams.get("status") || "all",
		owner: searchParams.get("owner") || "all"

	};


	const filteredProjects = useMemo(() => {
		return filterProjects(projects, currentFilters);
	}, [projects, currentFilters]);

	const handleSearch = (searchTerm) => {

		const newParams = new URLSearchParams(searchParams);

		if (searchTerm) {
			newParams.set("search", searchTerm);
		} else {
			newParams.delete("search");
		}

		setSearchParams(newParams);

	};

	const handleFilterChange = (filterType, value) => {

		const newParams = new URLSearchParams(searchParams);
		const defaultValues = {
			status: "all",
			owner: "all"
		};

		if (value === defaultValues[filterType]) {
			newParams.delete(filterType);
		} else {
			newParams.set(filterType, value);
		}

		setSearchParams(newParams);

	};

	const clearFilters = () => {
		setSearchParams({});
	};

	// Handler to add new project to state
	const handleProjectCreated = (newProject) => {
		// If the API does not return isAdmin, set it manually
		if (typeof newProject.isAdmin === 'undefined') {
			newProject.isAdmin = true;
		}

		setProjects((prev) => [newProject, ...prev]);

	};

	return (
		<div className="min-h-screen px-5 pt-10 lg:px-10">
			<div className="flex flex-col gap-y-4">
				<ProjectHeader
					filters={currentFilters}
					onSearch={handleSearch}
					onFilterChange={handleFilterChange}
					setShowNewProjectModal={setShowNewProjectModal}
				/>

				{loading ? (
					<div>Loading projects...</div>
				) : error ? (
					<div className="text-red-500">{error}</div>
				) : filteredProjects.length === 0 ? (
					<EmptySearch onClearFilters={clearFilters} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProjects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
			</div>
			{showNewProjectModal && (
				<NewProjectModal
					setShowNewProjectModal={setShowNewProjectModal}
					onProjectCreated={handleProjectCreated}
				/>
			)}
		</div>
	);

};

export default Projects;
