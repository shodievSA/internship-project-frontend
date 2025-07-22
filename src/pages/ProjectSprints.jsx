import { useState, useMemo } from "react";
import { useProject } from "../context/ProjectContext";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";
import SprintPreview from "../components/SprintPreview";

const mockSprints = [
	{
		id: 0,
		title: "New Sprint Title",
		description: "New Sprint Description",
		startDate: "2024-07-21",
		endDate: "2024-08-21",
		createdBy: "Abbos Shodiev",
		totalTasks: 20,
		totalTasksCompleted: 15,
		status: "active"
	},
	{
		id: 1,
		title: "New Sprint Title",
		description: "New Sprint Description",
		startDate: "2024-07-21",
		endDate: "2024-08-21",
		createdBy: "Abbos Shodiev",
		totalTasks: 20,
		totalTasksCompleted: 15,
		status: "completed"
	}
];

function ProjectSprints() {

	const { tasks, projectLoaded } = useProject();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	const filteredTasks = useMemo(() => {

		if (!projectLoaded || !tasks) return [];

		return tasks.filter((task) => {

			const matchesSearch =
			task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
			task.assignedBy.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
			task.assignedTo.name.toLowerCase().includes(searchTerm.trim().toLowerCase())

			const matchesStatus = statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;

		});

	}, [projectLoaded, tasks, searchTerm, statusFilter]);

	function clearFilters() {

		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");

	};

	// if (tasks.length === 0) return <EmptyState message={"All quiet on the project front. Time to give it something to do!"} />;

    return (
        <div className="grow">			
			<div className="flex flex-col h-full">
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-5">
					<div className="flex justify-start w-full lg:w-1/3">
						<div className="relative w-full">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by task title, assignee or assigner name"
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
						<div className="flex flex-col sm:flex-row gap-3">
							<CustomDropdown
								value={statusFilter}
								onChange={setStatusFilter}
								options={taskStatusOptions}
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
				{/* { filteredTasks.length > 0 ? ( */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
					gap-6 grid-auto-rows-[200px] pb-5">
						{ mockSprints.map((sprint) => (
							<SprintPreview sprint={sprint} />
						)) }
					</div>
				{/* ) : (
					<EmptySearch 
						message={"No matching tasks found"} 
						onClearFilters={clearFilters} 
					/>	
				)} */}
			</div>
        </div>
    );

}

export default ProjectSprints;