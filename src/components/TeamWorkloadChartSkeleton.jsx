import React from "react";

function TeamWorkloadChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
      </div>

      {/* Team members list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center space-x-4">
            {/* Avatar skeleton */}
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>

            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
              {/* Name skeleton */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>

              {/* Progress bar skeleton */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-7 rounded animate-pulse">
                <div
                  className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                ></div>
              </div>
            </div>

            {/* Percentage skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse flex-shrink-0"></div>
          </div>
        ))}
      </div>

      {/* Unassigned section skeleton */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-7 rounded animate-pulse">
              <div
                className="h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                style={{ width: `${Math.random() * 40 + 10}%` }}
              ></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
}

export default TeamWorkloadChartSkeleton;
