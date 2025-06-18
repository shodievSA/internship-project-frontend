// Filter functions for projects
export const filterProjects = (projects, filters) => {
  if (!Array.isArray(projects)) return [];
  
  return projects.filter(project => {
    // Search filter
    if (filters.search && !matchesSearch(project, filters.search)) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      if ((project?.status || '').toLowerCase() !== filters.status) {
        return false;
      }
    }

    // Owner filter
    if (filters.owner && filters.owner !== "all") {
      if (filters.owner === "owner" && !project?.isAdmin) {
        return false;
      } else if (filters.owner === "member" && project?.isAdmin) {
        return false;
      }
    }

    return true;
  });
};

const matchesSearch = (project, searchTerm) => {
  if (!project || !searchTerm) return false;
  
  const searchLower = searchTerm.toLowerCase();
  return (project.title?.toLowerCase() || "").includes(searchLower);
};