import React from "react";

function RecentActivityStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 flex items-center space-x-3"
        >
          {/* Icon Placeholder */}
          <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

          {/* Text Placeholders */}
          <div className="flex-1 space-y-2">
            {/* Top line - shorter (for count and title) */}
            <div
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              style={{ width: "60%" }}
            ></div>
            {/* Bottom line - longer (for period text) */}
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
