import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSprintProgress } from "../hooks/useSummary";
import SprintProgressOverviewSkeleton from "./SprintProgressOverviewSkeleton";
import ErrorState from "./ErrorState";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function SprintProgressOverview({ sprintId = null }) {
  const { projectId } = useParams();
  const { data, isLoading, error } = useSprintProgress(projectId, sprintId);

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
      <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
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
							There are no sprints for this project yet. Sprint
							progress will appear here once sprints are created
							and tasks are assigned.
						</p>
					</div>
				</div>
			</div>
		);
	}

  const sprints = data.sprints;

  // Transform data for pie chart - aggregate all sprints
  const totalProgress = {
    completed: 0,
    active: 0,
    blocked: 0,
  };

  sprints.forEach((sprint) => {
    totalProgress.completed += sprint.progress.completed || 0;
    totalProgress.active += sprint.progress.active || 0;
    totalProgress.blocked += sprint.progress.blocked || 0;
  });

  const chartData = [
    {
      name: "Completed",
      value: totalProgress.completed,
      color: "linear-gradient(135deg, #00D4AA 0%, #00B894 50%, #00A085 100%)",
      gradientId: "completedGradient",
    },
    {
      name: "Active",
      value: totalProgress.active,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B46C1 100%)",
      gradientId: "activeGradient",
    },
    {
      name: "Blocked",
      value: totalProgress.blocked,
      color: "#6B7280",
      gradientId: "blockedGradient",
    },
  ];

  // Filter data for pie chart (only show segments with data)
  const pieChartData = chartData.filter((item) => item.value > 0);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = total > 0 ? Math.round((data.value / total) * 100) : 0;

      return (
        <div
          className="border border-gray-200 rounded-lg shadow-xl p-3 min-w-[150px]"
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          <div className="flex items-center gap-x-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  data.name === "Completed"
                    ? "linear-gradient(135deg, #00D4AA 0%, #00B894 100%)"
                    : data.name === "Active"
                    ? "linear-gradient(135deg, #667eea 0%, #6B46C1 100%)"
                    : "#6B7280",
              }}
            />
            <span className="font-semibold text-sm" style={{ color: "black" }}>
              {data.name}
            </span>
          </div>
          <div className="text-sm" style={{ color: "#6B7280" }}>
            {data.value} tasks ({percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-x-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              background:
                entry.value === "Completed"
                  ? "linear-gradient(135deg, #00D4AA 0%, #00B894 100%)"
                  : entry.value === "Active"
                  ? "linear-gradient(135deg, #667eea 0%, #6B46C1 100%)"
                  : "#6B7280",
            }}
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Sprint Progress
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          See how your sprints are progressing at a glance.
        </p>
      </div>

      {/* Pie Chart */}
      <div className="flex items-center justify-center">
        <div className="relative w-60 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* SVG Gradient Definitions */}
              <defs>
                <linearGradient
                  id="completedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#00D4AA" />
                  <stop offset="50%" stopColor="#00B894" />
                  <stop offset="100%" stopColor="#00A085" />
                </linearGradient>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="50%" stopColor="#764ba2" />
                  <stop offset="100%" stopColor="#6B46C1" />
                </linearGradient>
                <linearGradient
                  id="blockedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6B7280" />
                  <stop offset="100%" stopColor="#6B7280" />
                </linearGradient>
              </defs>

              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={120}
                dataKey="value"
                stroke="none"
                animation={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.gradientId
                        ? `url(#${entry.gradientId})`
                        : entry.color
                    }
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text - removed total */}
        </div>
      </div>

      {/* Legend */}
      <CustomLegend
        payload={chartData.map((item, index) => ({
          value: item.name,
          color: item.color,
          type: "circle",
        }))}
      />

      {/* Sprint List */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Sprint Breakdown
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              className="flex items-center justify-between text-sm"
              onMouseEnter={() => setHoveredSprint(sprint)}
              onMouseLeave={() => setHoveredSprint(null)}
            >
              <span className="text-gray-600 dark:text-gray-400 truncate">
                {sprint.title}
              </span>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-900 dark:text-white font-medium">
                  {sprint.progress.completed +
                    sprint.progress.active +
                    sprint.progress.blocked}
                </span>
                <span className="text-gray-500 dark:text-gray-400">tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SprintProgressOverview;
