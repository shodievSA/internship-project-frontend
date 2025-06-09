export const STATUS_OPTIONS = {
    ALL: 'All Status',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    PAUSED: 'paused'
};

export const OWNER_OPTIONS = {
    ALL: 'All Projects',
    OWNER: 'Owner',
    MEMBER: 'Member'
};

export const TIME_OPTIONS = {
    ALL: 'All Time',
    WEEK: 'Last 7 days',
    MONTH: 'Last 30 days',
    QUARTER: 'Last 3 months',
    YEAR: 'Last year'
};

export const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
};

// Date format used in the application
export const DATE_FORMAT = 'DD.MM.YYYY';

// Default filter state
export const DEFAULT_FILTERS = {
    search: '',
    status: STATUS_OPTIONS.ALL,
    owner: OWNER_OPTIONS.ALL,
    timeFrame: TIME_OPTIONS.ALL
}; 