import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTeamWorkload } from "../hooks/useSummary";
import TeamWorkloadChartSkeleton from "./TeamWorkloadChartSkeleton";
import ErrorState from "./ErrorState";
import { User } from "lucide-react";

function TeamWorkloadChart({ sprintId = null }) {
  const { projectId } = useParams();
  const { data, error, isLoading } = useTeamWorkload(projectId, sprintId);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [progressBarHovered, setProgressBarHovered] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to determine progress bar color based on work distribution percentage
  const getProgressBarColor = (percentage) => {
    if (percentage >= 30) {
      return "#10B981"; // Green - High workload (can handle more)
    } else if (percentage >= 15) {
      return "#F59E0B"; // Amber - Medium workload (balanced)
    } else {
      return "#EF4444"; // Red - Low workload (underutilized)
    }
  };

  if (isLoading) {
    return <TeamWorkloadChartSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
        <h2 className="text-lg font-semibold mb-2 p-4">Team workload</h2>
        <ErrorState message="Failed to load team workload data" />
      </div>
    );
  }

  // Check if we have any data to display
  const hasAssignees = data?.assignees && data.assignees.length > 0;
  const hasUnassigned =
    data?.unassigned && data.unassigned.workDistribution > 0;
  const hasData = hasAssignees || hasUnassigned;

  if (!hasData) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
        <h2 className="text-lg font-semibold mb-2 p-4">Team workload</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-4">
          Monitor the capacity of your team.
        </p>
        <div className="flex items-center justify-center h-64 px-4">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
              No workload data available
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No tasks or team members found
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = [];

  // Add assignees
  if (data.assignees && data.assignees.length > 0) {
    data.assignees.forEach((assignee) => {
      chartData.push({
        name: assignee.name,
        value: assignee.workDistribution,
        taskCount: assignee.taskCount,
        avatarUrl: assignee.avatarUrl,
        isUnassigned: false,
      });
    });
  }

  // Add unassigned tasks
  if (data.unassigned && data.unassigned.workDistribution > 0) {
    chartData.push({
      name: "Unassigned",
      value: data.unassigned.workDistribution,
      taskCount: data.unassigned.taskCount,
      avatarUrl: null,
      isUnassigned: true,
    });
  }

  // Sort by work distribution (descending)
  chartData.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
      <div className="flex items-center justify-between p-4 pb-0">
        <h2 className="text-lg font-semibold mb-0">Team workload</h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 mt-0 px-4">
        Monitor the capacity of your team.
      </p>

      {/* Headers */}
      <div className="grid grid-cols-3 gap-0 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 px-4">
        <div className="col-span-1">Assignee</div>
        <div className="col-span-2">Work distribution</div>
      </div>

      {/* Workload Items */}
      <div className="space-y-3 px-4 pb-4 max-h-80 overflow-y-auto workload-scroll">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className={`relative rounded-md transition-colors duration-200 cursor-pointer ${
              hoveredIndex === index
                ? "bg-gray-100 dark:bg-gray-800 py-2"
                : "py-2"
            }`}
            onMouseEnter={() => {
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
          >
            {/* Extended background overlay */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-md -left-2 -right-2 -z-10"></div>
            )}
            <div className="grid grid-cols-3 gap-0 items-center">
              {/* Assignee Column */}
              <div className="col-span-1 flex items-center gap-x-3 min-w-0">
                <div className="flex-shrink-0">
                  {item.isUnassigned ? (
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  ) : item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.name}
                </span>
              </div>

              {/* Work Distribution Column */}
              <div className="col-span-2 flex items-center">
                <div
                  className="flex-1 h-7 bg-gray-200 dark:bg-gray-700 overflow-hidden relative min-w-[200px]"
                  onMouseEnter={() => setProgressBarHovered(index)}
                  onMouseLeave={() => setProgressBarHovered(null)}
                  onMouseMove={(e) => {
                    if (progressBarHovered === index) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }
                  }}
                >
                  <div
                    className="h-full transition-all duration-300 relative"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: getProgressBarColor(item.value),
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {item.value}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tooltip */}
            {progressBarHovered === index && (
              <div
                className="fixed bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs z-50 shadow-lg pointer-events-none border border-gray-700"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y - 8}px`,
                }}
              >
                {item.value}% ({item.taskCount}/
                {chartData.reduce((sum, d) => sum + d.taskCount, 0)} work items)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamWorkloadChart;
