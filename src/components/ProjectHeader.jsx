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
}) => {

	return (
		<div className="project-header_container">
			<div className="flex flex-col lg:flex-row md:items-center justify-between">
				{/* Search Bar */}
				<div className="w-full lg:w-96 mb-4 lg:mb-0">
					<SearchBar
						value={filters.search}
						onChange={onSearch}
						placeholder="Search projects..."
					/>
				</div>

				{/* Filters */}
				<div className="w-full lg:w-auto flex flex-col lg:flex-row gap-4 lg:gap-3">
					<FilterDropdown
						icon={User}
						value={filters.status}
						onChange={(value) => onFilterChange("status", value)}
						options={statusOptions}
					/>
					<FilterDropdown
						icon={FolderOpen}
						value={filters.owner}
						onChange={(value) => onFilterChange("owner", value)}
						options={ownerOptions}
					/>
					<Button
						onClick={() => setShowNewProjectModal(true)}
						variant="primary"
						size="md"
						className="w-full lg:w-auto"
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
