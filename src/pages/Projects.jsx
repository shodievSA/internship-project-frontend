import { useState } from "react";
import EmptyDashboard from "../components/EmptyDashboard";
import NewProjectModal from "../components/NewProjectModal";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../utils/data";
import ProjectHeader from "../components/ProjectHeader";
import useProjectFilters from "../hooks/useProjectFilters";
import EmptySearch from "../components/EmptySearch";

const Projects = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const {
    filters,
    filteredProjects,
    handleSearch,
    handleFilterChange,
    clearFilters,
  } = useProjectFilters(projects);

  if (projects.length === 0) {
    return <EmptyDashboard setShowNewProjectModal={setShowNewProjectModal} />;
  }

  return (
    <div className="h-full px-5 pt-10 lg:px-10">
      {showNewProjectModal && (
        <NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
      )}

      <div className="flex flex-col gap-y-6">
        <ProjectHeader
          filters={filters}
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
