import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sprintService from "../services/sprintService";

function ProjectSprint() {

	const { projectId, sprintId } = useParams();

	const [sprintTasks, setSprintTasks] = useState([]);
	const [sprintTasksBeingLoaded, setSprintTasksBeingLoaded] = useState(false);

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
		<div>This is sprint page</div>
	);

}

export default ProjectSprint;