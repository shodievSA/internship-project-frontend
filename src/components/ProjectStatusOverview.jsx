import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStatusOverview } from "../hooks/useSummary";
import ProjectStatusOverviewSkeleton from "./ProjectStatusOverviewSkeleton";
import ErrorState from "./ErrorState";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function ProjectStatusOverview() {
  const { projectId } = useParams();
  const { data, error, isLoading } = useStatusOverview(projectId);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  // Color scheme for different statuses with premium gradients
  const statusColors = {
    // API status names (from your backend) with premium gradients
    ongoing: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)", // Royal Blue-Purple
    closed: "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)", // Emerald Green
    underReview:
      "linear-gradient(135deg, #A855F7 0%, #8B5CF6 50%, #7C3AED 100%)", // Deep Purple
    overdue: "linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6B35 100%)", // Orange/Amber
    rejected: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #E74C3C 100%)", // Coral Red
  };

  if (isLoading) {
    return <ProjectStatusOverviewSkeleton />;
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

  if (
    !data ||
    !data.statusDistribution ||
    Object.keys(data.statusDistribution).length === 0
  ) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Status Overview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Distribution of tasks by their current status across the project
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              No Status Data Available
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              There are no tasks with status information for this project yet.
              Status data will appear here once tasks are created and assigned.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Use real data from API
  const displayData = data;

  // Transform data for Recharts
  const chartData = Object.entries(displayData.statusDistribution).map(
    ([status, count]) => {
      const mappedColor = statusColors[status] || "#6B7280";

      return {
        name: status.replace(/([A-Z])/g, " $1").trim(),
        value: count,
        color: mappedColor,
        percentage: Math.round((count / displayData.totalWorkItems) * 100),
      };
    }
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white text-gray-900 p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  data.name === "ongoing"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)"
                    : data.name === "closed"
                    ? "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)"
                    : data.name === "under review"
                    ? "linear-gradient(135deg, #A855F7 0%, #8B5CF6 50%, #7C3AED 100%)"
                    : data.name === "overdue"
                    ? "linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6B35 100%)"
                    : data.name === "rejected"
                    ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #E74C3C 100%)"
                    : data.color,
              }}
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
            className="flex items-center gap-x-3 p-2 cursor-pointer"
            onMouseEnter={() => setHoveredLegend(entry.value)}
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background:
                  entry.value === "ongoing"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)"
                    : entry.value === "closed"
                    ? "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)"
                    : entry.value === "under review"
                    ? "linear-gradient(135deg, #A855F7 0%, #8B5CF6 50%, #7C3AED 100%)"
                    : entry.value === "overdue"
                    ? "linear-gradient(135deg, #FFA500 0%, #FF8C00 50%, #FF6B35 100%)"
                    : entry.value === "rejected"
                    ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #E74C3C 100%)"
                    : entry.color,
              }}
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
              {/* SVG Gradient Definitions */}
              <defs>
                <linearGradient
                  id="ongoingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#6B46C1" />
                </linearGradient>
                <linearGradient id="closedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4AA" />
                  <stop offset="50%" stopColor="#00B894" />
                  <stop offset="100%" stopColor="#00A085" />
                </linearGradient>
                <linearGradient
                  id="underReviewGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient
                  id="overdueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="50%" stopColor="#FF8C00" />
                  <stop offset="100%" stopColor="#FF6B35" />
                </linearGradient>
                <linearGradient
                  id="rejectedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#FF8E8E" />
                  <stop offset="100%" stopColor="#E74C3C" />
                </linearGradient>
              </defs>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={120}
                dataKey="value"
                stroke="none"
                animation={false}
              >
                {chartData.map((entry, index) => {
                  let gradientId = "";
                  if (entry.name === "ongoing") gradientId = "ongoingGradient";
                  else if (entry.name === "closed")
                    gradientId = "closedGradient";
                  else if (entry.name === "under review")
                    gradientId = "underReviewGradient";
                  else if (entry.name === "overdue")
                    gradientId = "overdueGradient";
                  else if (entry.name === "rejected")
                    gradientId = "rejectedGradient";

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={gradientId ? `url(#${gradientId})` : entry.color}
                      className="cursor-pointer"
                    />
                  );
                })}
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
