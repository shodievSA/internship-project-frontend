import React from "react";

function SprintProgressOverviewSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse"></div>
      </div>

      {/* Pie chart skeleton */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-60 h-64">
          {/* Circular skeleton */}
          <div className="w-60 h-64 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse border-8 border-gray-100 dark:border-gray-800"></div>

          {/* Center text skeleton */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Legend skeleton */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-x-2">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Sprint breakdown skeleton */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3 animate-pulse"></div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              <div className="flex items-center gap-x-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SprintProgressOverviewSkeleton;
