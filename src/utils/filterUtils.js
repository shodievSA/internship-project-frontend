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
      console.log('Filtering by timeFrame:', filters.timeFrame);
      console.log('Project date:', project?.createdAt);
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
  if (!date) {
    console.log('No date provided');
    return false;
  }
  
  try {
    console.log('Processing date:', date, 'for timeFrame:', timeFrame);
    // Parse date in DD.MM.YYYY format
    const [day, month, year] = date.split('.');
    console.log('Parsed components:', { day, month, year });
    
    const projectDate = new Date(year, month - 1, day);
    console.log('Project date object:', projectDate.toISOString());
    
    if (isNaN(projectDate.getTime())) {
      console.error('Invalid date created');
      return false;
    }

    const now = new Date();
    console.log('Current date:', now.toISOString());
    
    // Set time to midnight for accurate day comparison
    now.setHours(0, 0, 0, 0);
    projectDate.setHours(0, 0, 0, 0);

    let result = false;
    
    // Use exact string matching for timeFrame
    switch (timeFrame) {
      case "Last 7 Days": {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        result = projectDate >= sevenDaysAgo;
        console.log('Last 7 Days - Compare:', {
          sevenDaysAgo: sevenDaysAgo.toISOString(),
          projectDate: projectDate.toISOString(),
          result
        });
        break;
      }
      case "Last 30 Days": {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        result = projectDate >= thirtyDaysAgo;
        console.log('Last 30 Days - Compare:', {
          thirtyDaysAgo: thirtyDaysAgo.toISOString(),
          projectDate: projectDate.toISOString(),
          result
        });
        break;
      }
      case "Last 3 Months": {
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        result = projectDate >= threeMonthsAgo;
        console.log('Last 3 Months - Compare:', {
          threeMonthsAgo: threeMonthsAgo.toISOString(),
          projectDate: projectDate.toISOString(),
          result
        });
        break;
      }
      case "Last Year": {
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        result = projectDate >= oneYearAgo;
        console.log('Last Year - Compare:', {
          oneYearAgo: oneYearAgo.toISOString(),
          projectDate: projectDate.toISOString(),
          result
        });
        break;
      }
      default: {
        console.log('No matching timeFrame, returning true');
        result = true;
      }
    }
    
    console.log('Final result for', timeFrame, ':', result);
    return result;
  } catch (error) {
    console.error("Error processing date:", error);
    return false;
  }
};