import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { taskStatusOptions, dateOptions } from "../utils/constant";
import SearchBar from "../components/SearchBar";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptySearch from "../components/EmptySearch";
import RegularTask from "../components/RegularTask";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Calendar, Filter } from "lucide-react";

function AllTasksPage() {

	const { project, projectLoaded } = useOutletContext();

	const [filteredTasks, setFilteredTasks] = useState([]);
	const [tasksFiltered, setTasksFiltered] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	useEffect(() => {

		if (projectLoaded && project !== null) {

			setTasksFiltered(false);
			
			const filtered = project.allTasks.filter((task) => {

				const matchesSearch =
				task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) 
				||
				task.assignedBy.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
				||
				task.assignedTo.name.toLowerCase().includes(searchTerm.trim().toLowerCase())

				const matchesStatus = statusFilter === "all" || task.status === statusFilter;

				return matchesSearch && matchesStatus;

			});

			setFilteredTasks(filtered);
			setTasksFiltered(true);

		}

	}, [projectLoaded, project, statusFilter, dateFilter, searchTerm]);

	function clearFilters() {

		setSearchTerm("");
		setStatusFilter("all");
		setDateFilter("all");

	};

    return (
        <div className="grow">
			{
				!projectLoaded ? (
					<LoadingState message={"Loading project's tasks"} />
				) : !project ? (
					<ErrorState message={"Well, that didn’t go as planned - couldn’t load the project’s tasks"} />
				) : project.allTasks.length === 0 ? (
					<EmptyState message={"All quiet on the project front. Time to give it something to do!"} />
				) : (
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
								tasksFiltered && (
									filteredTasks.length > 0 ? (
										filteredTasks.map((task) => <RegularTask key={task.id} task={task} />)
									) : (									
										<EmptySearch 
											message={"No matching tasks found"} 
											onClearFilters={clearFilters} 
										/>									
									)
								)
							}
						</div>
					</div>
				)
			}
        </div>
    )

}

export default AllTasksPage;