import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import SearchBar from "../components/SearchBar";
import RegularTask from "../components/RegularTask";
import NewTaskModal from "../components/NewTaskModal";
import Button from "../components/ui/Button";
import sprintService from "../services/sprintService";
import { ArrowLeft, Calendar, Filter, Plus } from "lucide-react";
import EmptySearch from "../components/EmptySearch";
import EmptySprint from "../components/EmptySprintState";
import LoadingState from "../components/LoadingState";
import { CustomDropdown } from "../components/CustomDropdown";
import { dateOptions, taskStatusOptions } from "../utils/constant";

function ProjectSprint() {

	const { state: { sprintTitle } } = useLocation();
	const { projectId, sprintId } = useParams();
	const { team, currentMemberId, tasks, setTasks } = useProject();
	
	const navigate = useNavigate();

	const [sprintTasks, setSprintTasks] = useState([]);
	const [sprintTasksBeingLoaded, setSprintTasksBeingLoaded] = useState(false);
	const [showNewTaskModal, setShowNewTaskModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	useEffect(() => {

		async function getSprintTasks() {

			setSprintTasksBeingLoaded(true);

			try {

				const { sprintTasks } = await sprintService.getTasks(projectId, sprintId);
				console.log(sprintTasks)
				setSprintTasks(sprintTasks);

			} catch(err) {

				console.log(err.message);

			} finally {

				setTimeout(() => {
					setSprintTasksBeingLoaded(false);
				}, 400);

			}

		}

		getSprintTasks();

	}, []);

	const filteredSprintTasks = useMemo(() => {

		if (sprintTasksBeingLoaded) return [];

		return sprintTasks.filter((task) => {

			const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "all" || task.status === statusFilter;

			return matchesSearch && matchesStatus;

		});

	}, [sprintTasksBeingLoaded, sprintTasks, searchTerm, statusFilter]);

	function clearFilters() {
		setSearchTerm("");
	}

	function onNewTaskCreated(newTask) {

		setSprintTasks([newTask, ...sprintTasks]);
		setTasks([newTask, ...tasks]);

	}

	if (sprintTasksBeingLoaded) return <LoadingState message="Loading sprint's tasks" />;
	if (showNewTaskModal) return (
		<NewTaskModal 
			closeModal={() => setShowNewTaskModal(false)} 
			onNewTaskCreated={onNewTaskCreated}
			teamMembers={team}
			currentMemberId={currentMemberId}
			projectId={projectId} 
			sprintId={sprintId}
		/>
	);
	if (sprintTasks.length === 0) return <EmptySprint setShowNewTaskModal={setShowNewTaskModal} />;

	return (
		<>
			<div className="h-full flex flex-col px-4 lg:px-6 pt-4 gap-y-4">
				<header className="flex flex-col gap-y-4">
					<div className="flex items-center justify-between gap-x-6">
						<div className="flex gap-x-6 items-center">
							<Button 
								size="sm"
								variant="secondary"
								onClick={() => navigate(-1)}
							>
								<div className="flex items-center gap-x-2">
									<ArrowLeft className="w-4 h-4" />
									<span>Back to project</span>
								</div>
							</Button>
							<h1 className="text-lg font-semibold">{ sprintTitle }</h1>
						</div>
						<Button
							size="sm"
							onClick={() => setShowNewTaskModal(true)}
						>
							<div className="flex items-center gap-x-2">
								<Plus className="w-4 h-4" />
								<span>New Ticket</span>
							</div>
						</Button>
					</div>
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
				</header>
				{ filteredSprintTasks.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 
					gap-6 grid-auto-rows-[200px] pb-5">
						{
							filteredSprintTasks.map((sprintTask) => {
								return <RegularTask task={sprintTask} />
							})
						}
					</div>
				) : (
					<EmptySearch onClearFilters={clearFilters} />
				)}
			</div>
		</>
	);

}

export default ProjectSprint;