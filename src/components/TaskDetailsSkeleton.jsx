import React from "react";

function TaskDetailsSkeleton() {
	return (
		<div className="animate-pulse">
			{/* Header Skeleton */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 w-3/4"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
					</div>
					<div className="flex gap-2">
						<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
						<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
					</div>
				</div>

				{/* Priority and Status */}
				<div className="flex gap-3 mb-4">
					<div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
					<div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
				</div>

				{/* Description */}
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
				</div>
			</div>

			{/* Tabs Skeleton */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
				<div className="flex gap-2 mb-6">
					<div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
					<div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
				</div>

				{/* Tab Content Skeleton */}
				<div className="space-y-4">
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
				</div>
			</div>
		</div>
	);
}

export default TaskDetailsSkeleton;
