import { useSearchParams } from "react-router-dom";
import { filterProjects } from "../utils/filterUtils";
import { useProjectsContext } from "../context/ProjectsContext";
import ProjectPreview from "../components/ProjectPreview";
import ProjectHeader from "../components/ProjectHeader";
import EmptySearch from "../components/EmptySearch";
import { useMemo, useEffect } from "react";
import EmptyDashboard from "../components/EmptyDashboard";
import ProjectSkeleton from "../components/ProjectSkeleton";
import ErrorState from "../components/ErrorState";

function Projects() {

	const {
		projectsLoaded,
		projects,
		error,
		setShowNewProjectModal,
		userProjectCount,
		setUserProjectCount,
	} = useProjectsContext();

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {

		if (projectsLoaded && !error) {

			localStorage.setItem("projectCount", projects.length);
			setUserProjectCount(projects.length);
			
		}

	}, [projects, projectsLoaded, error]);

	const currentFilters = useMemo(() => ({
		search: searchParams.get("search") || "",
		status: searchParams.get("status") || "all",
		owner: searchParams.get("owner") || "all",
	}), [searchParams]);

	const filteredProjects = useMemo(() => {

		return filterProjects(projects, currentFilters);

	}, [projects, currentFilters]);

	function handleSearch(searchTerm) {

		const newParams = new URLSearchParams(searchParams);

		if (searchTerm) {
			newParams.set("search", searchTerm);
		} else {
			newParams.delete("search");
		}

		setSearchParams(newParams);

	}

	function handleFilterChange(filterType, value) {

		const newParams = new URLSearchParams(searchParams);
		const defaultValues = { status: "all", owner: "all" };

		if (value === defaultValues[filterType]) {
			newParams.delete(filterType);
		} else {
			newParams.set(filterType, value);
		}

		setSearchParams(newParams);

	}

	function clearFilters() {

		setSearchParams({});

	}

	if (error) return <ErrorState message={"Looks like your projects are playing hide and seek. Can’t find them!"} />
	if (userProjectCount === 0) return <EmptyDashboard showNewProjectModal={setShowNewProjectModal} />;

	return (
		<div className="h-full px-4 lg:px-8 pt-5">
			<div className="flex flex-col gap-y-5 h-full">
				<div className="h-full flex flex-col gap-y-6">
					<ProjectHeader
						filters={currentFilters}
						onSearch={handleSearch}
						onFilterChange={handleFilterChange}
						setShowNewProjectModal={setShowNewProjectModal}
						disabled={!projectsLoaded}
					/>
					{!projectsLoaded ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from(
								{ length: userProjectCount },
								(_, i) => {
									return <ProjectSkeleton key={i} />;
								},
							)}
						</div>
					) : filteredProjects.length === 0 ? (
						<div className="flex grow items-center justify-center">
							<EmptySearch
								message="No matching projects found"
								onClearFilters={clearFilters}
							/>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
						gap-6 pb-5">
							{filteredProjects.map((projectPreview) => (
								<ProjectPreview
									key={projectPreview.id}
									projectPreview={projectPreview}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Projects;
