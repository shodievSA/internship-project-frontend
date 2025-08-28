import React from "react";

function RecentActivityStatsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{[...Array(4)].map((_, index) => (
				<div
					key={index}
					className="bg-gray-50 dark:bg-black rounded-lg p-3 flex items-center space-x-3 group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-out cursor-pointer hover:shadow-lg hover:-translate-y-1"
					style={{ height: "48px" }}
				>
					{/* Icon Placeholder */}
					<div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700 transition-all duration-500 ease-out group-hover:scale-125 group-hover:shadow-xl group-hover:shadow-black/20 group-hover:-translate-y-1 animate-pulse">
						<div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
					</div>

					{/* Text Content */}
					<div className="flex-1 flex items-center">
						<div className="flex items-center gap-2 mb-1">
							<div className="w-8 h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>
						<div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentActivityStatsSkeleton;
