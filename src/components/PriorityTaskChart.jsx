import React from "react";
import { useParams } from "react-router-dom";
import { usePriorityBreakdown } from "../hooks/useSummary";
import PriorityTaskChartSkeleton from "./PriorityTaskChartSkeleton";
import ErrorState from "./ErrorState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function PriorityTaskChart() {
  const { projectId } = useParams();
  const { data, error, isLoading } = usePriorityBreakdown(projectId);

  if (isLoading) {
    return <PriorityTaskChartSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Priority breakdown
        </h3>
        <ErrorState
          message="Failed to load priority data"
          error={error.message}
        />
      </div>
    );
  }

  if (!data || !data.priorities || data.priorities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Priority breakdown
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get a holistic view of how work is being prioritized.
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
              No Priority Data Available
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              There are no tasks with priority levels for this project yet.
              Priority data will appear here once tasks are created and assigned
              priority levels.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Transform data for the chart - map to high, middle, low as per API docs
  const chartData = [
    {
      name: "High",
      count: data.priorities.find((p) => p.level === "high")?.count || 0,
      percentage:
        data.priorities.find((p) => p.level === "high")?.percentage || 0,
      icon: "↑",
      color: "#EF4444", // Red for High priority
    },
    {
      name: "Middle",
      count: data.priorities.find((p) => p.level === "middle")?.count || 0,
      percentage:
        data.priorities.find((p) => p.level === "middle")?.percentage || 0,
      icon: "=",
      color: "#F97316", // Orange for Middle priority
    },
    {
      name: "Low",
      count: data.priorities.find((p) => p.level === "low")?.count || 0,
      percentage:
        data.priorities.find((p) => p.level === "low")?.percentage || 0,
      icon: "↓",
      color: "#3B82F6", // Blue for Low priority
    },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2.5 min-w-[120px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {data.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {data.count}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Priority breakdown
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Get a holistic view of how work is being prioritized.
        </p>
      </div>

      {/* Chart */}
      <div className="h-96 -ml-8 -mr-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 25 }}
          >
            {/* SVG Gradient Definitions */}
            <defs>
              <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
                <stop offset="50%" stopColor="rgba(239, 68, 68, 0.5)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.7)" />
              </linearGradient>
              <linearGradient id="middleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(249, 115, 22, 0.3)" />
                <stop offset="50%" stopColor="rgba(249, 115, 22, 0.5)" />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0.7)" />
              </linearGradient>
              <linearGradient id="lowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={({ x, y, payload }) => {
                const priority = payload.value;
                let icon = "";
                let color = "#6B7280";

                if (priority === "High") {
                  icon = "↑";
                  color = "#EF4444";
                } else if (priority === "Middle") {
                  icon = "=";
                  color = "#F97316";
                } else if (priority === "Low") {
                  icon = "↓";
                  color = "#3B82F6";
                }

                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor="middle"
                      fill={color}
                      fontSize={16}
                      fontWeight="bold"
                    >
                      {icon}
                    </text>
                    <text
                      x={0}
                      y={0}
                      dy={40}
                      textAnchor="middle"
                      fill="#6B7280"
                      fontSize={12}
                    >
                      {priority}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => {
                let gradientId = "";
                if (entry.name === "High") gradientId = "highGradient";
                else if (entry.name === "Middle") gradientId = "middleGradient";
                else if (entry.name === "Low") gradientId = "lowGradient";

                return (
                  <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriorityTaskChart;
