import { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectService from "../services/projectService";

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {

	const { projectId } = useParams();

	const [projectLoaded, setProjectLoaded] = useState(false);
	const [error, setError] = useState(null);
	const [metaData, setMetaData] = useState();
	const [team, setTeam] = useState([]);
	const [invites, setInvites] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [currentMemberId, setCurrentMemberId] = useState();
	const [currentMemberRole, setCurrentMemberRole] = useState();

	// Add this function to update a single task in context
	const updateTaskInContext = (updatedTask) => {
		setTasks(prev =>
			prev.map(task =>
				task.id === updatedTask.id
					? { ...task, ...updatedTask, assignedTo: updatedTask.assignedTo ?? task.assignedTo }
					: task
			)
		);
	};

	// Add this function to optimistically update a task's status in context
	const optimisticUpdateTaskStatus = (taskId, newStatus) => {
		setTasks(prev =>
			prev.map(task =>
				task.id === taskId ? { ...task, status: newStatus } : task
			)
		);
	};

	async function fetchProject(projectId) {

		try {

			const { projectDetails } = await projectService.getProject(projectId);

			setMetaData(projectDetails.metaData);
			setTasks(projectDetails.tasks);
			setTeam(projectDetails.team);
			setInvites(projectDetails.invites);
			setCurrentMemberId(projectDetails.currentMemberId);
			setCurrentMemberRole(projectDetails.currentMemberRole);

		} catch (err) {

			setError(err.message);

			setMetaData(null);
			setTasks(null);
			setTeam(null);
			setInvites(null);
			setCurrentMemberId(null);
			setCurrentMemberRole(null);

		} finally {

			setTimeout(() => {

				setProjectLoaded(true);

			}, 400);

		}

	}

	useEffect(() => {

		fetchProject(projectId);

	}, [projectId]);

	const contextData = {
		error,
		metaData,
		setMetaData,
		team,
		setTeam,
		invites,
		setInvites,
		tasks,
		setTasks,
		updateTaskInContext,
		optimisticUpdateTaskStatus,
		currentMemberId,
		setCurrentMemberId,
		currentMemberRole,
		setCurrentMemberRole,
		fetchProject,
		projectLoaded
	};

	return (
		<ProjectContext.Provider value={contextData}>
			{children}
		</ProjectContext.Provider>
	)

}

export const useProject = () => useContext(ProjectContext);
