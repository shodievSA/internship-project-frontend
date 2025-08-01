import { User, FolderOpen, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import Button from "./ui/Button";
import { statusOptions, ownerOptions } from "../utils/constant";

const ProjectHeader = ({
	filters,
	onSearch,
	onFilterChange,
	setShowNewProjectModal,
	disabled = false,
}) => {
	return (
		<div className="rounded-lg">
			<div className="flex flex-col lg:flex-row md:items-center justify-between">
				{/* Search Bar */}
				<div className="w-full lg:w-96 mb-4 lg:mb-0">
					<SearchBar
						value={filters.search}
						onChange={(e) => onSearch(e.target.value)}
						placeholder="Search projects..."
						disabled={disabled}
					/>
				</div>

				{/* Filters */}
				<div className="w-full lg:w-auto flex flex-col lg:flex-row gap-4 lg:gap-3">
					<FilterDropdown
						icon={User}
						value={filters.status}
						onChange={(value) => onFilterChange("status", value)}
						options={statusOptions}
						disabled={disabled}
					/>
					<FilterDropdown
						icon={FolderOpen}
						value={filters.owner}
						onChange={(value) => onFilterChange("owner", value)}
						options={ownerOptions}
						disabled={disabled}
					/>
					<Button
						onClick={() => setShowNewProjectModal(true)}
						variant="primary"
						size="sm"
						className="w-full lg:w-auto"
						disabled={disabled}
					>
						<div className="flex items-center gap-x-2">
							<Plus className="w-4 h-4" />
							<span className="font-medium">New Project</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProjectHeader;
