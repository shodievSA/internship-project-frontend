// Filter functions for projects
export const filterProjects = (projects, filters) => {
  if (!Array.isArray(projects)) return [];
  
  return projects.filter(project => {
    // Search filter
    if (filters.search && !matchesSearch(project, filters.search)) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "All Status") {
      const projectStatus = project?.status?.charAt(0).toUpperCase() + project?.status?.slice(1).toLowerCase();
      if (projectStatus !== filters.status) {
        return false;
      }
    }

    // Owner filter
    if (filters.owner && filters.owner !== "All Projects") {
      if (filters.owner === "Owner" && !project?.isOwner) {
        return false;
      } else if (filters.owner === "Member" && project?.isOwner) {
        return false;
      }
    }

    // Time frame filter
    if (filters.timeFrame && filters.timeFrame !== "All Time") {
      if (!matchesTimeFrame(project?.createdAt, filters.timeFrame)) {
        return false;
      }
    }

    return true;
  });
};

const matchesSearch = (project, searchTerm) => {
  if (!project || !searchTerm) return false;
  
  const searchLower = searchTerm.toLowerCase();
  return (
    (project.name?.toLowerCase() || "").includes(searchLower) ||
    (project.description?.toLowerCase() || "").includes(searchLower) ||
    (project.status?.toLowerCase() || "").includes(searchLower) ||
    Array.isArray(project.team) && project.team.some(member => 
      member?.name && member.name.toLowerCase().includes(searchLower)
    )
  );
};

const matchesTimeFrame = (date, timeFrame) => {
  if (!date) return false;
  
  try {
    // Parse date in DD.MM.YYYY format
    const [day, month, year] = date.split('.');
    const projectDate = new Date(year, month - 1, day);
    if (isNaN(projectDate.getTime())) return false;

    const now = new Date();
    const daysDiff = (now - projectDate) / (1000 * 60 * 60 * 24);

    switch (timeFrame) {
      case "Last 7 Days":
        return daysDiff <= 7;
      case "Last 30 Days":
        return daysDiff <= 30;
      case "Last 3 Months":
        return daysDiff <= 90;
      case "Last Year":
        return daysDiff <= 365;
      default:
        return true;
    }
  } catch (error) {
    console.error("Error processing date:", error);
    return false;
  }
};