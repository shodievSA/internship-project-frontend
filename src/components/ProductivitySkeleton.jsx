import React from "react";

export function ProductivitySkeleton() {
  return (
    <div className="space-y-8 animate-pulse min-h-[600px]">
      {/* Key Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Tasks Card Skeleton */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="w-12 h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Ongoing Tasks Card Skeleton */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="w-12 h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Overdue Tasks Card Skeleton */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="w-12 h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Success Rate Card Skeleton */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Priority & Time Tracking Row Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {/* Priority Breakdown Skeleton */}
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="space-y-4">
            {/* High Priority Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Medium Priority Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="w-28 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Low Priority Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* Time Tracking Skeleton */}
        <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          <div className="space-y-4">
            {/* Total Time Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Avg Session Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Sessions Skeleton */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-[60px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Activity Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Header Skeleton */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl"></div>
              <div>
                <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="w-48 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>

        {/* Activity List Skeleton */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[400px] overflow-y-auto">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="px-8 py-6">
              <div className="flex items-center justify-between">
                {/* Date Section Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
                  <div>
                    <div className="w-32 h-5 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>

                {/* Metrics Section Skeleton */}
                <div className="flex items-center gap-8">
                  {/* Time Spent Skeleton */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    </div>
                    <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>

                  {/* Sessions Skeleton */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <div className="w-8 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    </div>
                    <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                  <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
