import React from "react";

function TeamWorkloadChartSkeleton() {
	return (
		<div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
			{/* Header skeleton - match exact padding and margins */}
			<div className="flex items-center justify-between p-4 pb-0">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
			</div>

			<div className="px-4 mb-4 mt-0">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
			</div>

			{/* Headers skeleton - match exact grid structure */}
			<div className="grid grid-cols-3 gap-0 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 px-4">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
				<div className="col-span-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
			</div>

			{/* Team members list skeleton - match exact spacing and dimensions */}
			<div className="space-y-3 px-4 pb-4 max-h-80 overflow-y-auto workload-scroll">
				{[1, 2, 3, 4].map((item) => (
					<div key={item} className="py-2">
						<div className="grid grid-cols-3 gap-0 items-center">
							{/* Avatar skeleton - match exact dimensions */}
							<div className="col-span-1 flex items-center gap-x-3 min-w-0">
								<div className="flex-shrink-0">
									<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
								</div>
								<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
							</div>

							{/* Progress bar skeleton - match exact dimensions */}
							<div className="col-span-2 flex items-center">
								<div className="flex-1 h-7 bg-gray-200 dark:bg-gray-700 overflow-hidden relative min-w-[200px] rounded animate-pulse">
									<div
										className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
										style={{
											width: `${
												Math.random() * 60 + 20
											}%`,
										}}
									></div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TeamWorkloadChartSkeleton;
