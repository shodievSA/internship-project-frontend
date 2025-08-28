import React from "react";

function ProjectStatusOverviewSkeleton() {
	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
			{/* Header skeleton */}
			<div className="pt-4 px-6 mb-4">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
			</div>

			{/* Chart area skeleton */}
			<div className="flex items-center justify-center px-6 pb-6">
				{/* Pie chart skeleton */}
				<div className="relative w-60 h-64">
					<div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mx-auto"></div>

					{/* Center text skeleton */}
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
					</div>
				</div>

				{/* Legend skeleton */}
				<div className="ml-16 space-y-2">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="flex items-center gap-x-3 p-2 cursor-pointer"
						>
							<div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
							<div className="flex items-center gap-x-2">
								<span className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></span>
								<span className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProjectStatusOverviewSkeleton;
