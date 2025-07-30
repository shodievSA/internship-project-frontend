import { useState } from "react";
import Modal from "./ui/Modal";
import { useMyProductivity } from "../hooks/useMemberProductivity";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  BarChart3,
  Target,
  Activity,
  User,
  Info,
  Zap,
  Timer,
  Award,
} from "lucide-react";
import LoadingState from "./LoadingState";

export function TeamMemberProductivityModal({ member, isOpen, onClose }) {
  const { projectId } = useParams();
  const { user } = useAuthContext();
  const [timeRange, setTimeRange] = useState("week");

  // Check if the current user is viewing their own productivity
  const isOwnProductivity = user?.id === member.id;

  const { data, loading, error } = useMyProductivity(
    projectId,
    { timeRange },
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
    }
  );

  const productivityData = data?.data;

  const timeRangeOptions = [
    { value: "day", label: "Today" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "all", label: "All Time" },
  ];

  const getBusyLevelColor = (level) => {
    switch (level) {
      case "free":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20";
      case "low":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "medium":
        return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!isOpen) return null;

  return (
    <Modal
      title="Productivity Overview"
      subtitle={`${member.name} • ${member.position}`}
      customWidth={900}
      closeModal={onClose}
      titleIcon={<Activity className="w-5 h-5" />}
    >
      <div className="px-8 pb-8 max-h-[80vh] overflow-y-auto">
        {/* Check if user can view this productivity data */}
        {!isOwnProductivity ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Personal Productivity Only
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
              Productivity data is only available for your own account. Click on
              your profile card to view your metrics.
            </p>
            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg w-full max-w-sm">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.position} • {member.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Time Range Selector */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Period
              </h3>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      timeRange === option.value
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {loading && <LoadingState message="Loading productivity data..." />}

            {error && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm leading-relaxed mb-4">
                  Productivity analytics are being developed. You'll soon be
                  able to track detailed metrics and performance insights.
                </p>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg w-full max-w-sm">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.position} • {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {productivityData && (
              <div className="space-y-8">
                {/* Header with Member Info & Status */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {productivityData.memberName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {productivityData.role} • {productivityData.position}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getBusyLevelColor(
                      productivityData.busyLevel
                    )}`}
                  >
                    {productivityData.busyLevel.charAt(0).toUpperCase() +
                      productivityData.busyLevel.slice(1)}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Completed
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {productivityData.taskPerformance.completedTasks}
                    </div>
                    <div className="text-xs text-gray-500">
                      of {productivityData.taskPerformance.totalTasksAssigned}{" "}
                      total
                    </div>
                  </div>

                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Ongoing
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {productivityData.taskPerformance.ongoingTasks}
                    </div>
                    <div className="text-xs text-gray-500">in progress</div>
                  </div>

                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Overdue
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {productivityData.taskPerformance.overdueTasks}
                    </div>
                    <div className="text-xs text-gray-500">past deadline</div>
                  </div>

                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Success Rate
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {productivityData.taskPerformance.taskCompletionRate}%
                    </div>
                    <div className="text-xs text-gray-500">completion rate</div>
                  </div>
                </div>

                {/* Priority & Time Tracking Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Priority Breakdown */}
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-600" />
                      Tasks by Priority
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          High Priority
                        </span>
                        <span className="text-lg font-bold text-red-600">
                          {
                            productivityData.taskPerformance.tasksByPriority
                              .high
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Medium Priority
                        </span>
                        <span className="text-lg font-bold text-amber-600">
                          {
                            productivityData.taskPerformance.tasksByPriority
                              .middle
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Low Priority
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {productivityData.taskPerformance.tasksByPriority.low}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time Tracking */}
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-600" />
                      Time Tracking
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total Time
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {
                            productivityData.timeTracking
                              .totalTimeLoggedFormatted
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Avg Session
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {
                            productivityData.timeTracking
                              .averageSessionDurationFormatted
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Sessions
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {productivityData.timeTracking.dailyTimeDistribution.reduce(
                            (sum, day) => sum + day.sessions,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Time Distribution */}
                {productivityData.timeTracking.dailyTimeDistribution.length >
                  0 && (
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      Daily Activity
                    </h4>
                    <div className="space-y-2">
                      {productivityData.timeTracking.dailyTimeDistribution
                        .slice(0, 7)
                        .map((day, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {formatTime(day.totalTime)}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                                {day.sessions} sessions
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Top Tasks */}
                {productivityData.timeTracking.timePerTask.length > 0 && (
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gray-600" />
                      Top Tasks by Time
                    </h4>
                    <div className="space-y-3">
                      {productivityData.timeTracking.timePerTask
                        .slice(0, 5)
                        .map((task, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1 mr-3">
                              {task.taskTitle}
                            </span>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatTime(task.totalTime)}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                                avg {formatTime(task.averageTimePerSession)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  Last updated:{" "}
                  {new Date(productivityData.lastUpdated).toLocaleString()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
