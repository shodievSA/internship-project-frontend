import React from "react";

function RecentActivityStatsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{[...Array(4)].map((_, index) => (
				<div
					key={index}
					className="bg-gray-50 dark:bg-black rounded-lg p-3 flex items-center space-x-3 group"
				>
					{/* Icon Placeholder - match exact dimensions */}
					<div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

					{/* Text Placeholders - match exact layout and dimensions using invisible text */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							{/* Count skeleton - match exact height and font size */}
							<div className="text-xl font-bold text-gray-900 dark:text-white">
								<span className="invisible">0</span>
							</div>
							{/* Title skeleton - match exact height and font size */}
							<div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
								<span className="invisible">completed</span>
							</div>
						</div>
						{/* Period text skeleton - match exact height and font size */}
						<div className="text-xs text-gray-500 dark:text-gray-400">
							<span className="invisible">
								in the last 7 days
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentActivityStatsSkeleton;
