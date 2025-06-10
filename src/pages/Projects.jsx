import { useSearchParams } from "react-router-dom";
import { projects as mockProjects } from "../utils/data";
import { filterProjects } from "../utils/filterUtils";
import ProjectCard from "../components/ProjectCard";
import ProjectHeader from "../components/ProjectHeader";
import EmptySearch from "../components/EmptySearch";
import { useMemo } from "react";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep track of filter values
  const currentFilters = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "All Status",
    owner: searchParams.get("owner") || "All Projects",
    timeFrame: searchParams.get("timeFrame") || "All Time"
  };

  // Filter projects using memoization to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    console.log('Current filters:', currentFilters);
    return filterProjects(mockProjects, currentFilters);
  }, [searchParams]);

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
    console.log('Filter change:', filterType, value);
    const newParams = new URLSearchParams(searchParams);
    const defaultValues = {
      status: "All Status",
      owner: "All Projects",
      timeFrame: "All Time"
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

  return (
    <div className="h-full px-5 pt-10 lg:px-10">
      <div className="flex flex-col gap-y-6">
        <ProjectHeader
          filters={currentFilters}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        {filteredProjects.length === 0 ? (
          <EmptySearch onClearFilters={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
