import { User, FolderOpen, Clock, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import Button from "./ui/Button";
import { statusOptions, ownerOptions, timeOptions } from "../utils/constant";

const ProjectHeader = ({
  filters,
  onSearch,
  onFilterChange,
  onClearFilters,
}) => {
  // Handle search input changes
  const handleSearchChange = (value) => {
    onSearch(value);
  };

  // Handle filter changes
  const handleStatusChange = (value) => {
    onFilterChange("status", value);
  };

  const handleOwnerChange = (value) => {
    onFilterChange("owner", value);
  };

  const handleTimeChange = (value) => {
    onFilterChange("timeFrame", value);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="project-header_container p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <SearchBar
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search projects..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 flex-1">
              <FilterDropdown
                icon={User}
                value={filters.status}
                onChange={handleStatusChange}
                options={statusOptions}
              />
              <FilterDropdown
                icon={FolderOpen}
                value={filters.owner}
                onChange={handleOwnerChange}
                options={ownerOptions}
              />
              <FilterDropdown
                icon={Clock}
                value={filters.timeFrame}
                onChange={handleTimeChange}
                options={timeOptions}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <Button onClick={onClearFilters} variant="secondary" size="md">
                Clear All
              </Button>
              <Button
                onClick={() => {}}
                variant="primary"
                size="md"
                icon={Plus}
              >
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
