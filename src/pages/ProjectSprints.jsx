import { useState, useMemo } from "react";
import { useProject } from "../context/ProjectContext";
import { dateOptions, sprintStatusFilters } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";
import SprintPreview from "../components/SprintPreview";

function ProjectSprints() {
	const { sprints, projectLoaded } = useProject();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	const filteredSprints = useMemo(() => {
		if (!projectLoaded || !sprints) return [];

		return sprints.filter((sprint) => {
			const matchesSearch = sprint.title
				.toLowerCase()
				.includes(searchTerm.trim().toLowerCase());
			const matchesStatus =
				statusFilter === "all" || sprint.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [projectLoaded, sprints, searchTerm, statusFilter]);

	function clearFilters() {
		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");
	}

	if (sprints.length === 0)
		return (
			<EmptyState
				message={
					"All quiet on the project front. Time to give it something to do!"
				}
			/>
		);

	return (
		<div className="grow">
			<div className="flex flex-col h-full">
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-5">
					<div className="flex justify-start w-full lg:w-1/3">
						<div className="relative w-full">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by sprint title"
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
						<div className="flex flex-col sm:flex-row gap-3">
							<CustomDropdown
								value={statusFilter}
								onChange={setStatusFilter}
								options={sprintStatusFilters}
								placeholder="All Status"
								icon={Filter}
								className="w-full sm:w-auto"
							/>
							<CustomDropdown
								value={dateFilter}
								onChange={setDateFilter}
								options={dateOptions}
								placeholder="All Dates"
								icon={Calendar}
								className="w-full sm:w-auto"
							/>
						</div>
					</div>
				</div>
				{filteredSprints.length > 0 ? (
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
					gap-6 grid-auto-rows-[200px] pb-5"
					>
						{sprints.map((sprint) => (
							<SprintPreview key={sprint.id} sprint={sprint} />
						))}
					</div>
				) : (
					<EmptySearch
						message="No matching sprints found"
						onClearFilters={clearFilters}
					/>
				)}
			</div>
		</div>
	);
}

export default ProjectSprints;
