import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import sprintService from "../services/sprintService";
import NewTaskModal from "../components/NewTaskModal";
import Button from "../components/ui/Button";
import { ArrowLeft, Plus } from "lucide-react";

function ProjectSprint() {

	const { projectId, sprintId } = useParams();
	const { team, currentMemberId } = useProject();
	
	const navigate = useNavigate();

	const [sprintTasks, setSprintTasks] = useState([]);
	const [sprintTasksBeingLoaded, setSprintTasksBeingLoaded] = useState(false);
	const [showNewTaskModal, setShowNewTaskModal] = useState(false);

	useEffect(() => {

		async function getSprintTasks() {

			setSprintTasksBeingLoaded(true);

			try {

				const { tasks } = await sprintService.getTasks(projectId, sprintId);
				setSprintTasks(tasks);

			} catch(err) {

				console.log(err.message);

			} finally {

				setSprintTasksBeingLoaded(false);

			}

		}

		getSprintTasks();

	}, []);

	return (
		<>
			<div className="h-full flex flex-col px-4 lg:px-6 pt-4">
				<header className="flex items-center justify-between gap-x-6">
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
						<h1 className="text-xl font-semibold">Spint</h1>
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
				</header>
			</div>
			{
				showNewTaskModal && (
					<NewTaskModal 
						closeModal={() => setShowNewTaskModal(false)} 
						teamMembers={team}
						currentMemberId={currentMemberId}
						projectId={projectId}
					/>
				)
			}
		</>
	);

}

export default ProjectSprint;