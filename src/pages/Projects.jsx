import { useSearchParams } from "react-router-dom";
import { projects as mockProjects } from "../utils/data";
import ProjectCard from "../components/ProjectCard";
import ProjectHeader from "../components/ProjectHeader";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  // Keep track of filter values for UI only
  const currentFilters = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "All Status",
    owner: searchParams.get("owner") || "All Projects",
    timeFrame: searchParams.get("timeFrame") || "All Time"
  };

  // UI handlers - no actual filtering
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
    if (value && value !== "All Status" && value !== "All Projects" && value !== "All Time") {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
