import TaskBoard from "../components/TaskBoard";
import { useProject } from "../context/ProjectContext";

const AllTasksPage = () => {
	const { tasks, setTasks, projectLoaded, currentMemberId } = useProject();


	return (
		<div className="">
			<TaskBoard tasks={tasks} />
		</div>
	);
}

export default AllTasksPage;