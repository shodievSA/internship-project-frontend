import { useNavigate } from "react-router-dom";
import { sprintStatusColors } from "../utils/constant";
import { formatIsoDate } from "../utils/formatIsoDate";
import ProgressBar from "./ProgressBar";
import { useProject } from "../context/ProjectContext";
import { Calendar, TicketCheck } from "lucide-react";

function SprintPreview({ sprint }) {

	const {
		id: sprintId,
		title,
		description,
		startDate,
		endDate,
		status
	} = sprint;

	const { tasks } = useProject();

	const total = tasks.filter((task) => task.sprintId === sprintId).length;
	const completed = tasks.filter((task) => task.sprintId === sprintId && task.status === "closed").length;
	const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

	const navigate = useNavigate();

	return (
		<div
			className="bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-neutral-800 
			rounded-lg p-4 w-full text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-neutral-700 
			transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.01] 
			transition-transform"
			onClick={() => navigate(`${sprintId}`)}
		>
			<div className="flex flex-col gap-y-2">
				<div className="flex items-start justify-between">
					<h2 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
						{title || ""}
					</h2>
					<span className={`${sprintStatusColors[status]} status-badge`}>
						{status}
					</span>
				</div>
				<div>
					<p className="text-sm dark:text-neutral-400 text-neutral-600 max-h-11">
						{description}
					</p>
				</div>
				<div className="flex justify-between items-center py-2">
					<div className="flex items-center gap-x-2 text-sm">
						<Calendar className="w-4 h-4" />
						<div className="flex flex-col">
							<span className="font-medium">Start</span>
							<span className="text-xs">
								{formatIsoDate(startDate)}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-x-2 text-sm">
						<Calendar className="w-4 h-4" />
						<div className="flex flex-col">
							<span className="font-medium">Deadline</span>
							<span className="text-xs">
								{formatIsoDate(endDate)}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-x-2 text-sm">
						<TicketCheck className="w-4 h-4" />
						<div className="flex flex-col">
							<span className="font-medium">Tickets</span>
							<span className="text-xs">
								{completed}/{total}
							</span>
						</div>
					</div>
				</div>
				<div>
					<ProgressBar progress={progress} />
				</div>
			</div>
		</div>
	);
}

export default SprintPreview;
