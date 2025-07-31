import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { formatIsoDate } from "../utils/formatIsoDate";
import { statusColors } from "../utils/constant";
import { Calendar, Users, CheckCircle } from "lucide-react";

function ProjectPreview({ projectPreview }) {

	const navigate = useNavigate();

	const { 
		id, 
		title, 
		createdAt, 
		members, 
		status, 
		totalSprints, 
		totalSprintsCompleted, 
		isAdmin 
	} = projectPreview;

	const total = totalSprints;
	const completed = totalSprintsCompleted;
	const progress = total > 0 ? Math.round((completed / total) * 100) : 0;


	function handleClick() {

		navigate(`/projects/${id}/my-tasks`);

	}

	return (
		<div 
			className="bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-neutral-800 
			rounded-md p-4 w-full text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-neutral-700 
			transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.01] 
			transition-transform" 
			onClick={handleClick}
		>
			<div className="flex items-start justify-between mb-4">
				<h2 className="font-medium text-gray-900 dark:text-white line-clamp-1">
					{ title || '' }
				</h2>
				<div className="flex gap-2">
					{
						isAdmin ? (
							<span className="bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 
							dark:border dark:border-blue-500/20 px-2 py-0.5 rounded-full text-xs font-medium">
								Owner
							</span>
						) : (
							<span className="bg-purple-100 text-purple-800 dark:bg-gray-800 dark:text-gray-300 
							dark:border dark:border-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
								Member
							</span>
						)
					}
					<span className={`${statusColors[status]} status-badge`}>
						{status}
					</span>
				</div>
			</div>

			<div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-400">
				<Calendar className="w-4 h-4" />
				<span className="text-sm">Created: { formatIsoDate(createdAt) }</span>
			</div>

			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
					<Users className="w-4 h-4" />
					<span className="text-sm">{members} members</span>
				</div>
				<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
					<CheckCircle className="w-4 h-4" />
					<span className="text-sm">{completed}/{total} sprints</span>
				</div>
			</div>

			<ProgressBar progress={progress} />
		</div>
	)

}

export default ProjectPreview;
