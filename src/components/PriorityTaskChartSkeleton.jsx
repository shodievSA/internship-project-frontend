import React from "react";

function PriorityTaskChartSkeleton() {
	return (
		<div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
			{/* Header skeleton */}
			<div className="mb-4">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
			</div>

			{/* Chart skeleton */}
			<div className="h-96 -ml-8 -mr-6 relative">
				<div className="h-full flex items-end justify-center space-x-8 px-8">
					{/* Bar 1 - High Priority */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
						</div>
					</div>

					{/* Bar 2 - Middle Priority */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
						</div>
					</div>

					{/* Bar 3 - Low Priority */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
						</div>
					</div>
				</div>

				{/* Y-axis labels skeleton */}
				<div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
					{[6, 4, 2, 0].map((value) => (
						<div
							key={value}
							className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"
						></div>
					))}
				</div>
			</div>
		</div>
	);
}

export default PriorityTaskChartSkeleton;
