import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import AssignedTask from "../components/AssignedTask";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";

function AssignedTasksPage() {

	const { projectId } = useParams();
	const { tasks, setTasks, team, projectLoaded, currentMemberId } = useOutletContext();

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
			task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) 
			||
			task.assignedTo.name.toLowerCase().includes(searchTerm.trim().toLowerCase())

			const matchesStatus = statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;

		});

	}, [searchTerm, statusFilter, assignedTasks]);

	function clearFilters() {

		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");

	}

	function onTaskDelete(taskId) {

		setTasks((prevTasks) => prevTasks.filter((task) => {
			return task.id !== taskId;
		}));

	}

	function onTaskUpdate(taskId, updatedTask) {

		setTasks((prevTasks) => prevTasks.map((task) => {
			return (task.id === taskId) ? updatedTask : task
		}));

	}

	if (!projectLoaded) return <LoadingState message={"Loading your assigned tasks"} />
	if (!tasks) return <ErrorState message={"Uh-oh! Your assigned tasks are playing hide and seek. Try refreshing the page"} />
	if (assignedTasks.length === 0) return <EmptyState message={"You haven’t assigned any tasks yet... your clipboard is feeling lonely!"} />

	return (
		<div className="h-full">				
			<div className="flex flex-col h-full">
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
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
				<div className="grow flex flex-col gap-y-8 pb-10">
					{												
						filteredTasks.length > 0 ? (
							filteredTasks.map((task) => (
								<AssignedTask 
									key={task.id} 
									task={task} 
									projectId={projectId} 
									team={team}
									onTaskDelete={onTaskDelete}
									onTaskUpdate={onTaskUpdate}
								/>
							))
						) : (									
							<EmptySearch 
								message={"No matching assigned tasks found"} 
								onClearFilters={clearFilters} 
							/>								
						)															
					}
				</div>
			</div>
		</div>
	);

}

export default AssignedTasksPage;