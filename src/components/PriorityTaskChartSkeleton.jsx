import React from "react";

function PriorityTaskChartSkeleton() {
	return (
		<div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
			{/* Header skeleton - matching exact structure */}
			<div className="mb-4">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
			</div>

			{/* Chart skeleton - matching exact dimensions with h-96 and -ml-8 -mr-6 */}
			<div className="h-96 -ml-8 -mr-6">
				<div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
			</div>
		</div>
	);
}

export default PriorityTaskChartSkeleton;
