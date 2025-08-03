import React from "react";
import { useParams } from "react-router-dom";
import { useRecentActivity } from "../hooks/useSummary";
import { CheckCircle, Edit, FileText, Calendar } from "lucide-react";
import ErrorState from "./ErrorState";
import RecentActivityStatsSkeleton from "./RecentActivityStatsSkeleton";

function RecentActivityStats({ sprintId = null }) {
  const { projectId } = useParams();
  const { data, isLoading, error } = useRecentActivity(projectId, sprintId);

	if (isLoading) {
		return <RecentActivityStatsSkeleton />;
	}

  if (error) {
    return (
      <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[200px]">
        <ErrorState
          message="Failed to load recent activity"
          error={error.message}
        />
      </div>
    );
  }

  if (!data || !data.recentActivity) {
    return (
      <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-[200px]">
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No recent activity data available.
          </p>
        </div>
      </div>
    );
  }

	const { recentActivity } = data;

	const activityCards = [
		{
			title: "completed",
			count: recentActivity.completed?.count || 0,
			period: recentActivity.completed?.period || "last7days",
			icon: CheckCircle,
			iconBgColor: "bg-green-100 dark:bg-green-900/20",
			iconColor: "text-green-600 dark:text-green-400",
		},
		{
			title: "updated",
			count: recentActivity.updated?.count || 0,
			period: recentActivity.updated?.period || "last7days",
			icon: Edit,
			iconBgColor: "bg-gray-100 dark:bg-gray-700",
			iconColor: "text-gray-600 dark:text-gray-400",
		},
		{
			title: "created",
			count: recentActivity.created?.count || 0,
			period: recentActivity.created?.period || "last7days",
			icon: FileText,
			iconBgColor: "bg-gray-100 dark:bg-gray-700",
			iconColor: "text-gray-600 dark:text-gray-400",
		},
		{
			title: "due soon",
			count: recentActivity.dueSoon?.count || 0,
			period: recentActivity.dueSoon?.period || "next7days",
			icon: Calendar,
			iconBgColor: "bg-orange-100 dark:bg-orange-900/20",
			iconColor: "text-orange-600 dark:text-orange-400",
		},
	];

	const getPeriodText = (period) => {
		switch (period) {
			case "last7days":
				return "in the last 7 days";
			case "next7days":
				return "in the next 7 days";
			default:
				return "recently";
		}
	};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {activityCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="bg-gray-50 dark:bg-black rounded-lg p-3 flex items-center space-x-3 group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-out cursor-pointer hover:shadow-lg hover:-translate-y-1"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconBgColor} transition-all duration-500 ease-out group-hover:scale-125 group-hover:shadow-xl group-hover:shadow-black/20 group-hover:-translate-y-1`}
            >
              <IconComponent
                className={`w-5 h-5 ${card.iconColor} transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg animate-pulse group-hover:animate-none`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {card.count}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                  {card.title}
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getPeriodText(card.period)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentActivityStats;
