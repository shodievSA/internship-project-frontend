// Generic filter function that can handle both projects and invitations
export const filterItems = (items, filters, searchFields = ['title']) => {
  if (!Array.isArray(items)) return [];
  
  return items.filter(item => {
    // Search filter
    if (filters.search && !matchesSearch(item, filters.search, searchFields)) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      if ((item?.status || '').toLowerCase() !== filters.status) {
        return false;
      }
    }

    // Owner filter (for projects)
    if (filters.owner && filters.owner !== "all") {
      if (filters.owner === "owner" && !item?.isAdmin) {
        return false;
      } else if (filters.owner === "member" && item?.isAdmin) {
        return false;
      }
    }

    // Date filter (if needed in the future)
    if (filters.date && filters.date !== "all") {
      // Add date filtering logic here if needed
      // For now, we'll skip date filtering
    }

    return true;
  });
};

// Specific filter functions that use the generic filterItems
export const filterProjects = (projects, filters) => {
  return filterItems(projects, filters, ['title']);
};

export const filterInvitations = (invitations, filters) => {
  return filterItems(invitations, filters, ['projectName', 'inviterName', 'inviterEmail']);
};

export const filterNotifications = (notifications, filters) => {
  return filterItems(notifications, filters, ['title']);
};

const matchesSearch = (item, searchTerm, searchFields) => {
  if (!item || !searchTerm) return false;
  
  const searchLower = searchTerm.toLowerCase().trim();
  
  // If search term is empty, return true (no filtering)
  if (searchLower === '') return true;
  
  return searchFields.some(field => {
    const fieldValue = item[field];
    return fieldValue && fieldValue.toLowerCase().includes(searchLower);
  });
};