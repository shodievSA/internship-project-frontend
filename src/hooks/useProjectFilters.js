import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    STATUS_OPTIONS, 
    OWNER_OPTIONS, 
    TIME_OPTIONS, 
    DEFAULT_FILTERS,
} from '../utils/constants';

export default function useProjectFilters(initialProjects = []) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [filteredProjects, setFilteredProjects] = useState(initialProjects);
    const [error, setError] = useState(null);

    // Memoize the date parsing function
    const parseDate = useMemo(() => (dateStr) => {
        try {
            if (!dateStr || typeof dateStr !== 'string') {
                throw new Error('Invalid date string');
            }
            const [day, month, year] = dateStr.split('.').map(num => parseInt(num, 10));
            const date = new Date(year, month - 1, day);
            
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }
            
            return date;
        } catch (error) {
            console.error(`Error parsing date: ${dateStr}`, error);
            return null;
        }
    }, []);

    // Memoize the date range calculation
    const getDateRange = useMemo(() => (timeFrame) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (timeFrame) {
            case TIME_OPTIONS.WEEK: {
                const start = new Date(today);
                start.setDate(today.getDate() - 7);
                return { start, end: today };
            }
            case TIME_OPTIONS.MONTH: {
                const start = new Date(today);
                start.setDate(today.getDate() - 30);
                return { start, end: today };
            }
            case TIME_OPTIONS.QUARTER: {
                const start = new Date(today);
                start.setMonth(today.getMonth() - 3);
                return { start, end: today };
            }
            case TIME_OPTIONS.YEAR: {
                const lastYear = today.getFullYear() - 1;
                return { year: lastYear };
            }
            default:
                return null;
        }
    }, []);

    // Filter projects based on current filters
    const filterProjects = useCallback((projects, currentFilters) => {
        try {
            return projects.filter(project => {
                // Search filter
                if (currentFilters.search) {
                    const searchTerm = currentFilters.search.toLowerCase();
                    const projectName = (project.name || '').toLowerCase();
                    if (!projectName.includes(searchTerm)) {
                        return false;
                    }
                }

                // Status filter
                if (currentFilters.status !== STATUS_OPTIONS.ALL) {
                    if (!project.status || 
                        project.status.toLowerCase() !== currentFilters.status.toLowerCase()) {
                        return false;
                    }
                }

                // Owner filter
                if (currentFilters.owner !== OWNER_OPTIONS.ALL) {
                    const isOwner = currentFilters.owner === OWNER_OPTIONS.OWNER;
                    if (project.isOwner !== isOwner) {
                        return false;
                    }
                }

                // Time frame filter
                if (currentFilters.timeFrame !== TIME_OPTIONS.ALL) {
                    const projectDate = parseDate(project.createdAt);
                    if (!projectDate) return false;

                    const dateRange = getDateRange(currentFilters.timeFrame);
                    if (!dateRange) return true;

                    if (dateRange.year !== undefined) {
                        return projectDate.getFullYear() === dateRange.year;
                    }

                    return projectDate >= dateRange.start && projectDate <= dateRange.end;
                }

                return true;
            });
        } catch (error) {
            console.error('Error filtering projects:', error);
            setError('An error occurred while filtering projects');
            return [];
        }
    }, [parseDate, getDateRange]);

    // Update filtered projects when filters or initial projects change
    useEffect(() => {
        const filtered = filterProjects(initialProjects, filters);
        setFilteredProjects(filtered);
    }, [filters, initialProjects, filterProjects]);

    const handleSearch = (searchTerm) => {
        if (error) setError(null);
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handleFilterChange = (filterType, value) => {
        if (error) setError(null);
        if (!['status', 'owner', 'timeFrame'].includes(filterType)) {
            console.warn(`Invalid filter type: ${filterType}`);
            return;
        }
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilters = useCallback(() => {
        if (error) setError(null);
        setFilters(DEFAULT_FILTERS);
    }, []);

    return {
        filters,
        filteredProjects,
        handleSearch,
        handleFilterChange,
        clearFilters,
        error,
        totalResults: filteredProjects.length,
        hasActiveFilters: Object.values(filters).some(value => 
            value && value !== STATUS_OPTIONS.ALL && 
            value !== OWNER_OPTIONS.ALL && 
            value !== TIME_OPTIONS.ALL
        )
    };
} 