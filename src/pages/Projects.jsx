import { useSearchParams } from "react-router-dom";
import { filterProjects } from "../utils/filterUtils";
import ProjectPreview from "../components/ProjectPreview";
import ProjectHeader from "../components/ProjectHeader";
import EmptySearch from "../components/EmptySearch";
import NewProjectModal from "../components/NewProjectModal";
import { useMemo, useState, useEffect } from "react";
import projectService from "../services/projectService";
import EmptyDashboard from "../components/EmptyDashboard";

function Projects() {

	const [searchParams, setSearchParams] = useSearchParams();
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [projectPreviews, setProjectPreviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {

		async function fetchProjects() {

			setLoading(true);
			setError("");

			try {

				const projectPreviews = await projectService.getProjects();
				setProjectPreviews(projectPreviews);

			} catch (err) {

				setError(err.message || "Failed to load projects");

			} finally {

				setLoading(false);

			}

		}

		fetchProjects();

	}, []);

	useEffect(() => {
		localStorage.setItem("projectPreviewsCount", projectPreviews.length);
	}, [projectPreviews]);

	const currentFilters = {

		search: searchParams.get("search") || "",
		status: searchParams.get("status") || "all",
		owner: searchParams.get("owner") || "all"

	};

	const filteredProjectPreviews = useMemo(() => {

		return filterProjects(projectPreviews, currentFilters);

	}, [projectPreviews, currentFilters]);

	function handleSearch(searchTerm) {

		const newParams = new URLSearchParams(searchParams);

		if (searchTerm) {
			newParams.set("search", searchTerm);
		} else {
			newParams.delete("search");
		}

		setSearchParams(newParams);

	};

	function handleFilterChange(filterType, value) {

		const newParams = new URLSearchParams(searchParams);
		const defaultValues = { status: "all", owner: "all" };

		if (value === defaultValues[filterType]) {
			newParams.delete(filterType);
		} else {
			newParams.set(filterType, value);
		}

		setSearchParams(newParams);

	};

	function clearFilters() {

		setSearchParams({});

	};

	function handleProjectCreated(newProject) {

		setProjectPreviews((prevProjectPreviews) => [newProject, ...prevProjectPreviews]);

	};

	return (
		<div className="h-full px-6 pt-8 lg:px-8">
			<div className="flex flex-col gap-y-4 h-full">
				{
					loading ? (
						<div>Loading projects...</div>
					) : error ? (
						<div className="text-red-500">{error}</div>
					) : projectPreviews.length === 0 ? (
						<EmptyDashboard showNewProjectModal={setShowNewProjectModal} />
					) : (
						<div className="h-full flex flex-col gap-y-8">
							<ProjectHeader
								filters={currentFilters}
								onSearch={handleSearch}
								onFilterChange={handleFilterChange}
								setShowNewProjectModal={setShowNewProjectModal}
							/>
							{
								filteredProjectPreviews.length === 0 ? (
									<div className="flex grow items-center justify-center">
										<EmptySearch 
											message="No matching projects found"
											onClearFilters={clearFilters} 
										/>
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{
											filteredProjectPreviews.map((projectPreview) => (
												<ProjectPreview
													key={projectPreview.id}
													projectPreview={projectPreview}
												/>
											))
										}
									</div>
								)
							}
						</div>
					)
				}
			</div>
			{
				showNewProjectModal && (
					<NewProjectModal
						setShowNewProjectModal={setShowNewProjectModal}
						onProjectCreated={handleProjectCreated}
					/>
				)
			}
		</div>
	);

};

export default Projects;
