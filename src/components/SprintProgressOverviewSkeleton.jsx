import React from "react";

function SprintProgressOverviewSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse"></div>

        {/* Legend skeleton */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sprint items skeleton */}
      <div className="space-y-2 -mx-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="px-6 py-3 space-y-1">
            {/* Sprint header skeleton */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            </div>

            {/* Progress bar skeleton */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-7 rounded animate-pulse">
              <div className="flex h-7">
                <div
                  className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  style={{ width: `${Math.random() * 40 + 20}%` }}
                ></div>
                <div
                  className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  style={{ width: `${Math.random() * 30 + 15}%` }}
                ></div>
                <div
                  className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  style={{ width: `${Math.random() * 25 + 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button skeleton */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
}

export default SprintProgressOverviewSkeleton;
