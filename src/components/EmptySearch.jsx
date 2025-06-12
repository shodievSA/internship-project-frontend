import { SearchIcon } from "./icons";
import Button from "./ui/Button";

const EmptySearch = ({ onClearFilters }) => {
    return (
        <div className="empty-search-results">
            <div className="mb-4">
                <SearchIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No matching projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
                Try adjusting your search or filters to find what you're looking for
            </p>
            <Button onClick={onClearFilters} variant="blue" size="md">
                Clear all filters
            </Button>
        </div>
    );
};

export default EmptySearch;
