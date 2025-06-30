import { getProgressColor } from "../utils/constant";

function ProgressBar({ progress, showLabel = true }) {

	const progressColor = getProgressColor(progress);

	return (
		<div className="space-y-2">
		{
			showLabel && (
				<div className="flex items-center justify-between">
					<span className="text-gray-500 dark:text-gray-400 text-sm">
						Progress
					</span>
					<span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
						{progress}%
					</span>
				</div>
			)
		}
		<div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
			<div 
				className={`${progressColor} h-2 rounded-full transition-all duration-300`}
				style={{ width: `${progress}%` }}
			/></div>
		</div>
	);

};

export default ProgressBar;
