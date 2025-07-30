import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSprintProgress } from "../hooks/useSummary";
import SprintProgressOverviewSkeleton from "./SprintProgressOverviewSkeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

function SprintProgressOverview() {
  const { projectId } = useParams();
  const { data, isLoading, error } = useSprintProgress(projectId);
  const [showAllSprints, setShowAllSprints] = useState(false);
  const [hoveredSprint, setHoveredSprint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  if (isLoading) {
    return <SprintProgressOverviewSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load sprint progress"
        error={error.message}
      />
    );
  }

  if (!data || !data.sprints || data.sprints.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Sprint Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            See how your sprints are progressing at a glance.
          </p>
        </div>

        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              No Sprint Progress Available
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              There are no sprints for this project yet. Sprint progress will
              appear here once sprints are created and tasks are assigned.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sprints = data.sprints;
  const hasMoreSprints = sprints.length > 3;
  const displayedSprints = showAllSprints ? sprints : sprints.slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Sprint Progress
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          See how your sprints are progressing at a glance.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)",
                }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                completed
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)",
                }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                active
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  background: "#6B7280",
                }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                blocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sprint Progress Items */}
      <div className="space-y-2 -mx-6">
        {displayedSprints.map((sprint, index) => (
          <div
            key={sprint.id}
            className="space-y-1 px-6 py-3 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer relative"
            onMouseEnter={(e) => {
              setHoveredSprint(sprint);
              setTooltipPosition({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => setHoveredSprint(null)}
            onMouseMove={(e) =>
              setTooltipPosition({ x: e.clientX, y: e.clientY })
            }
          >
            {/* Sprint Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {sprint.title}
                </h4>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-7 overflow-hidden rounded-lg">
              <div className="flex h-7">
                {/* Completed tasks (closed) */}
                {sprint.progressPercentage.completed > 0 && (
                  <div
                    className="h-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-105"
                    style={{
                      width: `${sprint.progressPercentage.completed}%`,
                      background:
                        "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)",
                    }}
                  >
                    <span className="text-white text-xs font-medium transition-all duration-300 ease-out">
                      {Math.round(sprint.progressPercentage.completed)}%
                    </span>
                  </div>
                )}
                {/* Active tasks (ongoing + under review) */}
                {sprint.progressPercentage.active > 0 && (
                  <div
                    className="h-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-105"
                    style={{
                      width: `${sprint.progressPercentage.active}%`,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)",
                    }}
                  >
                    <span className="text-white text-xs font-medium transition-all duration-300 ease-out">
                      {Math.round(sprint.progressPercentage.active)}%
                    </span>
                  </div>
                )}
                {/* Blocked tasks (rejected + overdue) */}
                {sprint.progressPercentage.blocked > 0 && (
                  <div
                    className="h-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-105"
                    style={{
                      width: `${sprint.progressPercentage.blocked}%`,
                      background: "#6B7280",
                    }}
                  >
                    <span className="text-white text-xs font-medium transition-all duration-300 ease-out">
                      {Math.round(sprint.progressPercentage.blocked)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Sprints Button */}
      {hasMoreSprints && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowAllSprints(!showAllSprints)}
            className="w-full text-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline py-2"
          >
            {showAllSprints
              ? `Show Less`
              : `Show ${sprints.length - 3} More Sprints`}
          </button>
        </div>
      )}

      {/* Clean Tooltip */}
      {hoveredSprint && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 pointer-events-none min-w-[200px] transition-all duration-200 ease-out"
          style={{
            left: tooltipPosition.x + 8,
            top: tooltipPosition.y - 8,
            transform: "translateY(-100%)",
          }}
        >
          <div className="p-3">
            {/* Title */}
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {hoveredSprint.title}
            </h5>

            {/* Task Breakdown */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #00D4AA 0%, #00B894 100%)",
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Completed
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {hoveredSprint.progress.completed}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #6B46C1 100%)",
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Active
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {hoveredSprint.progress.active}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "#6B7280",
                    }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Blocked
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {hoveredSprint.progress.blocked}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SprintProgressOverview;
