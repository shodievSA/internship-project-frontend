import { useMemo, useState } from "react";
import { useProject } from "../context/ProjectContext";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import AssignedTask from "../components/AssignedTask";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";
import Unauthorized from "../components/Unauthorized";

function AssignedTasksPage() {
	const {
		projectLoaded,
		tasks,
		team,
		currentMemberId,
		currentMemberRole,
		metaData,
	} = useProject();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	const assignedTasks = useMemo(() => {
		if (!projectLoaded || !tasks) return [];

		return tasks.filter((task) => task.assignedBy.id === currentMemberId);
	}, [projectLoaded, tasks, currentMemberId]);

	const filteredTasks = useMemo(() => {
		return assignedTasks.filter((task) => {
			const matchesSearch =
				task.title
					.toLowerCase()
					.includes(searchTerm.trim().toLowerCase()) ||
				task.assignedTo.name
					.toLowerCase()
					.includes(searchTerm.trim().toLowerCase());

			const matchesStatus =
				statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [searchTerm, statusFilter, assignedTasks]);

	function clearFilters() {
		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");
	}

	if (currentMemberRole === "member")
		return (
			<Unauthorized
				message={`Oops! Looks like this page is for special eyes only - ${currentMemberRole}s not allowed.`}
			/>
		);
	if (assignedTasks.length === 0)
		return (
			<EmptyState
				message={
					"You haven’t assigned any tasks yet... your clipboard is feeling lonely!"
				}
			/>
		);

	return (
		<div className="h-full">
			<div className="flex flex-col h-full">
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-5">
					<div className="flex justify-start w-full lg:w-1/3">
						<div className="relative w-full">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by task title or assignee name"
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
				{filteredTasks.length > 0 ? (
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 
					gap-6 grid-auto-rows-[200px] pb-4"
					>
						{filteredTasks.map((task) => (
							<AssignedTask
								key={task.id}
								task={task}
								team={team}
								currentMemberId={currentMemberId}
							/>
						))}
					</div>
				) : (
					<EmptySearch
						message={"No matching assigned tasks found"}
						onClearFilters={clearFilters}
					/>
				)}
			</div>
		</div>
	);
}

export default AssignedTasksPage;
