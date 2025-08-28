import React from "react";

function RecentActivityStatsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{[...Array(4)].map((_, index) => (
				<div
					key={index}
					className="bg-gray-50 dark:bg-black rounded-lg p-3 flex items-center space-x-3"
				>
					{/* Icon Placeholder */}
					<div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

					{/* Text Placeholders */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							{/* Count skeleton */}
							<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
							{/* Title skeleton */}
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
						</div>
						{/* Period text skeleton */}
						<div
							className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
							style={{ width: "80%" }}
						></div>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentActivityStatsSkeleton;
