import React from "react";

function TimeTrackingSkeleton() {
	return (
		<div className="animate-pulse">
			{/* Timer Display Skeleton */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4">
				{/* Timer Display - Above */}
				<div className="text-center mb-6">
					<div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 w-48 mx-auto"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
				</div>

				{/* Timer Controls - Same Row */}
				<div className="flex justify-center gap-3">
					<div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
					<div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
				</div>
			</div>

			{/* Recent Activity Skeleton */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
				{/* Header */}
				<div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							<div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							<div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
						<div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
					</div>
				</div>

				{/* Activity Items */}
				<div className="space-y-4 p-6">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="flex items-center gap-3 py-3"
						>
							<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
									<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
									<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
								</div>
								<div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
							</div>
							<div className="text-right">
								<div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
								<div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TimeTrackingSkeleton;
