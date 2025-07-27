import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import SearchBar from "../components/SearchBar";
import RegularTask from "../components/RegularTask";
import NewTaskModal from "../components/NewTaskModal";
import Button from "../components/ui/Button";
import sprintService from "../services/sprintService";
import { ArrowLeft, Calendar, Filter, Plus, Settings, Trash2, SquarePen } from "lucide-react";
import EmptySearch from "../components/EmptySearch";
import EmptySprint from "../components/EmptySprintState";
import LoadingState from "../components/LoadingState";
import { CustomDropdown } from "../components/CustomDropdown";
import EditSprintModal from "../components/EditSprintModal";
import DeleteSprintModal from "../components/DeleteSprintModal";
import { dateOptions, taskStatusOptions } from "../utils/constant";

function ProjectSprint() {

	const { state: { sprint } } = useLocation();
	const { projectId, sprintId } = useParams();
	const { team, currentMemberId, tasks, setTasks, setSprints } = useProject();
	
	const navigate = useNavigate();

	const [sprintTasks, setSprintTasks] = useState([]);
	const [sprintTasksBeingLoaded, setSprintTasksBeingLoaded] = useState(false);
	const [showNewTaskModal, setShowNewTaskModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [settingsButtonClicked, setSettingsButtonClicked] = useState(false);
	const [showEditSprintModal, setShowEditSprintModal] = useState(false);
	const [showDeleteSprintModal, setShowDeleteSprintModal] = useState(false);

	const settingsMenuRef = useRef(null);

	useEffect(() => {

		async function getSprintTasks() {

			setSprintTasksBeingLoaded(true);

			try {

				const { sprintTasks } = await sprintService.getTasks(projectId, sprintId);
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

	useEffect(() => {

		function handleClickOutside(event) {

			if (
				settingsButtonClicked 
				&& 
				!settingsMenuRef.current.contains(event.target)
			) {

				setSettingsButtonClicked(false);

			}

		}

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		}

	}, [settingsButtonClicked]);

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

	function onSprintUpdate(newSprint) {

		setSprints((prevSprints) => prevSprints.map((sprint) => {
			return (sprint.id === newSprint.id) ? newSprint : sprint;
		}));

	}

	function onSprintDelete(deletedSprintId) {

		setSprints((prevSprints) => prevSprints.filter((sprint) => {
			return sprint.id !== deletedSprintId
		}));

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
				<header className="flex flex-col gap-y-6">
					<div className="flex items-center justify-between">
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
							<h1 className="text-lg font-semibold">{ sprint.title }</h1>
						</div>
						<div className="flex gap-x-6">
							<div ref={settingsMenuRef} className="relative">
								<button
									className="p-2 hover:bg-slate-50 dark:hover:bg-neutral-900 rounded-lg"
									onClick={() => setSettingsButtonClicked(true)}
								>
									<Settings className="w-5 h-5" />
								</button>
								<div className={`dark:bg-black dark:border-neutral-800 bg-white shadow-md border-neutrals-200 border-[1px] 
								rounded-md flex flex-col absolute w-[150px] mt-3 left-0 ${settingsButtonClicked ? 'opacity-100' :
								'opacity-0 pointer-events-none'} transition-[opacity] duration-200 z-20 text-sm`}>
									<div className="flex flex-col border-b-[1px] dark:border-neutral-800 border-neutral-200 p-1">
										<button
											className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex 
											items-center gap-x-2 px-2.5 py-1.5 transition[background-color] duration-200"
											onClick={() => {
												setSettingsButtonClicked(false);
												setShowEditSprintModal(true);
											}}
										>
											<SquarePen className="w-3.5 h-3.5" />
											<span>Edit Sprint</span>
										</button>
									</div>
									<div className="flex flex-col p-1.5">
										<button
											className="dark:hover:bg-neutral-900 hover:bg-slate-100 rounded-md flex items-center 
											gap-x-2 px-2.5 py-1.5 transition[background-color] duration-200"
											onClick={() => {
												setSettingsButtonClicked(false);
												setShowDeleteSprintModal(true);
											}}
										>
											<Trash2 className="w-3.5 h-3.5 text-red-500" />
											<span className="text-red-500">Delete Sprint</span>
										</button>
									</div>
								</div>
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
								return <RegularTask key={sprintTask.id} task={sprintTask} />
							})
						}
					</div>
				) : (
					<EmptySearch onClearFilters={clearFilters} />
				)}
			</div>
			{
				showEditSprintModal && (
					<EditSprintModal 
						sprint={sprint} 
						onSprintUpdate={onSprintUpdate}
						closeModal={() => setShowEditSprintModal(false)}
					/>
				)
			}
			{
				showDeleteSprintModal && (
					<DeleteSprintModal 
						sprint={sprint}
						onSprintDelete={onSprintDelete}
						closeModal={() => setShowDeleteSprintModal(false)}
					/>
				)
			}
		</>
	);

}

export default ProjectSprint;