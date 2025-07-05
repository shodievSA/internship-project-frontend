import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import MyTask from "../components/MyTask";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";

function MyTasksPage() {

	const { tasks, setTasks, projectLoaded, currentMemberId } = useOutletContext();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	const myTasks = useMemo(() => {

		if (!projectLoaded || !tasks) return [];

		return tasks.filter((task) => task.assignedTo.id === currentMemberId);

	}, [tasks, projectLoaded, currentMemberId]);

	const filteredTasks = useMemo(() => {

		return myTasks.filter((task) => {

			const matchesSearch = 
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
			task.assignedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
			task.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase())

			const matchesStatus = statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;

		});

	}, [myTasks, searchTerm, statusFilter]);

	function clearFilters() {

		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");

	};

	function onTaskSubmit(taskId, updatedTask) {

		setTasks((prevTasks) => prevTasks.map((task) => {
			return (task.id === taskId) ? updatedTask : task;
		}));

	}

	if (!projectLoaded) return <LoadingState message={"One moment… making sense of your chaos"} />
	if (!tasks) return <ErrorState message={"Oops! Something went wrong while loading your tasks. Give it another try."} />
	if (myTasks.length === 0) return <EmptyState message={"All clear! No tasks for now - enjoy the calm before the storm"} />

    return (
        <div className="h-full">
			<div className="flex flex-col h-full">
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
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
				<div className="grow flex flex-col gap-y-8 pb-10">
					{										
						filteredTasks.length > 0 ? (
							filteredTasks.map((task) => (
								<MyTask 
									key={task.id} 
									task={task} 
									onTaskSubmit={onTaskSubmit}
								/>
							))
						) : (									
							<EmptySearch 
								message={"No matching tasks found"} 
								onClearFilters={clearFilters} 
							/>								
						)																
					}
				</div>
			</div>				
		</div>
    );

}

export default MyTasksPage;