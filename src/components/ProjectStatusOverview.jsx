import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStatusOverview } from "../hooks/useSummary";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function ProjectStatusOverview() {
  const { projectId } = useParams();
  const { data, error, isLoading } = useStatusOverview(projectId);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  // Color scheme for different statuses
  const statusColors = {
    // API status names (from your backend)
    ongoing: "#8B5CF6", // Purple
    closed: "#EC4899", // Pink
    underReview: "#84CC16", // Olive Green
    overdue: "#3B82F6", // Blue
    rejected: "#F97316", // Orange

    // Alternative status names (in case API uses different naming)
    idea: "#8B5CF6", // Purple
    todo: "#EC4899", // Pink
    testing: "#84CC16", // Olive Green
    inProgress: "#3B82F6", // Blue
    done: "#F97316", // Orange

    // Additional variations
    "in progress": "#3B82F6", // Blue
    "under review": "#84CC16", // Olive Green
    "to do": "#EC4899", // Pink
    "in-progress": "#3B82F6", // Blue
    "under-review": "#84CC16", // Olive Green
    "to-do": "#EC4899", // Pink
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
        <h2 className="text-lg font-semibold mb-4 p-6">Status Overview</h2>
        <LoadingState message="Loading status data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
        <h2 className="text-lg font-semibold mb-4 p-6">Status Overview</h2>
        <ErrorState
          message="Failed to load status data"
          error={error.message}
        />
      </div>
    );
  }

  if (!data || !data.statusDistribution) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
        <h2 className="text-lg font-semibold mb-4 p-6">Status Overview</h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 px-6">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
            No Status Data
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No status data available for this project.
          </p>
        </div>
      </div>
    );
  }

  // Use mock data for UI testing
  const displayData = {
    totalWorkItems: 17,
    statusDistribution: {
      idea: 6,
      todo: 4,
      testing: 6,
      inProgress: 1,
      done: 0,
    },
  };

  console.log("Using mock data for testing:", displayData);

  // Transform data for Recharts
  const chartData = Object.entries(displayData.statusDistribution).map(
    ([status, count]) => {
      const mappedColor = statusColors[status] || "#6B7280";
      console.log(`Mapping status "${status}" to color "${mappedColor}"`);

      return {
        name: status.replace(/([A-Z])/g, " $1").trim(),
        value: count,
        color: mappedColor,
        percentage: Math.round((count / displayData.totalWorkItems) * 100),
      };
    }
  );

  console.log("Final chart data:", chartData);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white text-gray-900 p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-semibold text-sm">
              {data.name} {data.value}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }) => (
    <div className="space-y-2">
      {payload.map((entry, index) => {
        const chartItem = chartData.find((item) => item.name === entry.value);
        const isHovered = hoveredLegend === entry.value;

        return (
          <div
            key={`legend-${index}`}
            className={`flex items-center gap-x-3 p-2 rounded-md cursor-pointer transition-all duration-200 ${
              isHovered ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
            onMouseEnter={() => setHoveredLegend(entry.value)}
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex items-center gap-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {entry.value}:
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {chartItem?.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-0">
      <h2 className="text-lg font-semibold mb-0 pb-0 pt-4 px-6">
        Status Overview
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 mt-0 px-6">
        Distribution of tasks by their current status across all active sprints
      </p>

      <div className="flex items-center justify-center px-6 pb-6">
        <div className="relative w-60 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hoveredLegend ? (
              <>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round(
                    chartData.find((item) => item.name === hoveredLegend)
                      ?.percentage || 0
                  )}
                  %
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {hoveredLegend}
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {displayData.totalWorkItems}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total work items
                </div>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="ml-16">
          <CustomLegend
            payload={chartData.map((item, index) => ({
              value: item.name,
              color: item.color,
              type: "circle",
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectStatusOverview;
