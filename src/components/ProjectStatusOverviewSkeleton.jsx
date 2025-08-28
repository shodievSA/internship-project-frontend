import React from "react";

function ProjectStatusOverviewSkeleton() {
	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
			{/* Header skeleton - matching exact structure */}
			<h2 className="text-lg font-semibold mb-0 pb-0 pt-4 px-6">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
			</h2>
			<div className="text-sm text-gray-600 dark:text-gray-400 mb-4 mt-0 px-6">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
			</div>

			{/* Chart area skeleton - matching exact dimensions */}
			<div className="flex items-center justify-center px-6 pb-6">
				{/* Pie chart skeleton - matching w-60 h-64 */}
				<div className="relative w-60 h-64">
					<div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mx-auto"></div>

					{/* Center text skeleton */}
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
					</div>
				</div>

				{/* Legend skeleton - matching ml-16 */}
				<div className="ml-16 space-y-2">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="flex items-center gap-x-3 p-2"
						>
							<div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
							<div className="flex items-center gap-x-2">
								<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
								<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProjectStatusOverviewSkeleton;
