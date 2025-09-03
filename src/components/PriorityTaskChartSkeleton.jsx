import React from "react";

function PriorityTaskChartSkeleton() {
	return (
		<div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
			{/* Header skeleton - match exact padding and margins */}
			<div className="mb-4">
				<div className="mb-2">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						<span className="invisible">Priority breakdown</span>
					</h3>
				</div>
				<div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						<span className="invisible">
							Get a holistic view of how work is being
							prioritized.
						</span>
					</p>
				</div>
			</div>

			{/* Chart skeleton - match exact dimensions and layout */}
			<div className="h-96 -ml-8 -mr-6 relative">
				<div className="h-full flex items-end justify-center space-x-8 px-8">
					{/* Bar 1 - High Priority - match exact dimensions */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="text-xs text-gray-600 dark:text-gray-400">
								<span className="invisible">High</span>
							</div>
						</div>
					</div>

					{/* Bar 2 - Middle Priority - match exact dimensions */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="text-xs text-gray-600 dark:text-gray-400">
								<span className="invisible">Middle</span>
							</div>
						</div>
					</div>

					{/* Bar 3 - Low Priority - match exact dimensions */}
					<div className="flex flex-col items-center space-y-2">
						<div
							className="w-12 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
							style={{ height: `${Math.random() * 60 + 40}%` }}
						></div>
						<div className="flex flex-col items-center space-y-1">
							<div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="text-xs text-gray-600 dark:text-gray-400">
								<span className="invisible">Low</span>
							</div>
						</div>
					</div>
				</div>

				{/* Y-axis labels skeleton - match exact positioning */}
				<div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
					{[6, 4, 2, 0].map((value) => (
						<div
							key={value}
							className="text-xs text-gray-600 dark:text-gray-400"
						>
							<span className="invisible">{value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default PriorityTaskChartSkeleton;
