import React from "react";

function ProjectStatusOverviewSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header skeleton */}
      <div className="mb-6">
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
            <div key={item} className="flex items-center gap-x-3 p-2">
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
