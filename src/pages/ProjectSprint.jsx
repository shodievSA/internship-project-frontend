import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { dateOptions, taskStatusOptions } from "../utils/constant";
import ProjectSprintHeader from "../components/ProjectSprintHeader";
import SearchBar from "../components/SearchBar";
import SprintTask from "../components/SprintTask";
import sprintService from "../services/sprintService";
import EmptySearch from "../components/EmptySearch";
import LoadingState from "../components/LoadingState";
import { CustomDropdown } from "../components/CustomDropdown";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/ui/ToastProvider";
import { Calendar, Filter } from "lucide-react";

function ProjectSprint() {

	const { projectId, sprintId } = useParams();

	const { showToast } = useToast();

	const [sprintTasks, setSprintTasks] = useState([]);
	const [sprintMetaData, setSprintMetaData] = useState(null);
	const [sprintTasksBeingLoaded, setSprintTasksBeingLoaded] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	function clearFilters() {

		setSearchTerm("");

	}

	const filteredSprintTasks = useMemo(() => {
		
		if (sprintTasksBeingLoaded) return [];

		return sprintTasks.filter((task) => {

			const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;

		});

	}, [sprintTasksBeingLoaded, sprintTasks, searchTerm, statusFilter]);

	useEffect(() => {

		async function getSprintTasks() {

			try {

				const { tasks, metaData } = await sprintService.getSprintDetails(projectId, sprintId);

				setSprintTasks(tasks);
				setSprintMetaData(metaData);

			} catch (err) {

				showToast({
					variant: "error",
					title: err.message
				});

			} finally {

				setTimeout(() => {
					setSprintTasksBeingLoaded(false);
				}, 200);

			}

		}

		getSprintTasks();

	}, []);

	if (sprintTasksBeingLoaded) return <LoadingState message="Loading sprint's tasks" />;

	return (
		<>
			<div className="h-full flex flex-col px-4 lg:px-6 pt-4 gap-y-4">
				<ProjectSprintHeader
					projectId={projectId}
					sprintId={sprintId}
					sprintMetaData={sprintMetaData}
					setSprintMetaData={setSprintMetaData}
					sprintTasks={sprintTasks}
					setSprintTasks={setSprintTasks}
				/>
				{
					sprintTasks.length > 0 ? (
						<div className="flex grow flex-col gap-y-4">
							<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
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
							{filteredSprintTasks.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 
								gap-6 grid-auto-rows-[200px] pb-5">
									{filteredSprintTasks.map((sprintTask) => {
										return (
											<SprintTask key={sprintTask.id} task={sprintTask} />
										);
									})}
								</div>
							) : (
								<EmptySearch onClearFilters={clearFilters} />
							)}
						</div>
					) : (
						<EmptyState message="This sprint’s still warming up - no tasks here yet!" />
					)
				}
			</div>
		</>
	);
}

export default ProjectSprint;
