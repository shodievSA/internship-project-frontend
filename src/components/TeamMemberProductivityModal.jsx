import { useState, useEffect } from "react";
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
import { ProductivitySkeleton } from "./ProductivitySkeleton";

export function TeamMemberProductivityModal({ member, isOpen, onClose }) {
  const { projectId } = useParams();
  const { user } = useAuthContext();
  const [timeRange, setTimeRange] = useState("week");
  const [isChangingFilter, setIsChangingFilter] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Check if the current user is viewing their own productivity
  const isOwnProductivity = user?.id === member.id;

  const { data, loading, error } = useMyProductivity(projectId, { timeRange });

  const productivityData = data?.data;

  // Handle time range change with loading state
  const handleTimeRangeChange = (newTimeRange) => {
    setIsChangingFilter(true);
    setTimeRange(newTimeRange);
  };

  // Reset changing filter state when data loads
  useEffect(() => {
    if (productivityData && isChangingFilter) {
      // Add a small delay to ensure skeleton is visible
      setTimeout(() => {
        setIsChangingFilter(false);
      }, 500);
    }
  }, [productivityData, isChangingFilter]);

  // Handle initial load
  useEffect(() => {
    if (isOpen && isInitialLoad) {
      // Show skeleton for initial load
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
    }
  }, [isOpen, isInitialLoad]);

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
    if (!seconds || seconds === 0) return "0h 0m";

    // Handle if it's already a formatted string
    if (typeof seconds === "string") {
      return seconds;
    }

    // Round to nearest second to avoid decimal issues
    const roundedSeconds = Math.round(seconds);

    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      customWidth={900}
      closeModal={handleClose}
      customHeader={
        <div className="flex-1">
          {/* Title with Blue Icon */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Productivity Overview
            </h2>
          </div>

          {/* Subtitle with Role Highlight */}
          <div className="ml-13">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {member.name} •{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {member.position}
              </span>
            </span>
          </div>
        </div>
      }
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
          </div>
        ) : (
          <>
            {/* Time Period Selector */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time Period
                </span>
                {productivityData && (
                  <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {timeRange === "day"
                        ? "Today"
                        : timeRange === "week"
                        ? "This Week"
                        : timeRange === "month"
                        ? "This Month"
                        : "All Time"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTimeRangeChange(option.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      timeRange === option.value
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {(loading || isChangingFilter || isInitialLoad) && (
              <ProductivitySkeleton />
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
                  Productivity analytics are being developed. You'll soon be
                  able to track detailed metrics and performance insights.
                </p>
              </div>
            )}

            {productivityData && (
              <div className="space-y-8">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Completed Tasks Card */}
                  <div className="p-4 bg-gradient-to-br from-emerald-300 via-green-300 to-teal-400 dark:from-emerald-400 dark:via-green-400 dark:to-teal-500 border border-emerald-200/40 dark:border-emerald-500/40 rounded-xl shadow-lg shadow-emerald-400/15 hover:shadow-xl hover:shadow-emerald-400/25 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-black/10">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-xs font-bold text-emerald-900 dark:text-white uppercase tracking-wide [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                        Completed
                      </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-900 dark:text-white mb-1 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">
                      {productivityData.taskPerformance.completedTasks}
                    </div>
                    <div className="text-xs font-medium text-emerald-800 dark:text-emerald-100 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                      of {productivityData.taskPerformance.totalTasksAssigned}{" "}
                      total
                    </div>
                  </div>

                  {/* Ongoing Tasks Card */}
                  <div className="p-4 bg-gradient-to-br from-sky-300 via-blue-300 to-indigo-400 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-500 border border-sky-200/40 dark:border-sky-500/40 rounded-xl shadow-lg shadow-sky-400/15 hover:shadow-xl hover:shadow-sky-400/25 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-black/10">
                        <Zap className="w-4 h-4 text-sky-600" />
                      </div>
                      <span className="text-xs font-bold text-sky-900 dark:text-white uppercase tracking-wide [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                        Ongoing
                      </span>
                    </div>
                    <div className="text-2xl font-black text-sky-900 dark:text-white mb-1 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">
                      {productivityData.taskPerformance.ongoingTasks}
                    </div>
                    <div className="text-xs font-medium text-sky-800 dark:text-sky-100 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                      in progress
                    </div>
                  </div>

                  {/* Overdue Tasks Card */}
                  <div className="p-4 bg-gradient-to-br from-rose-300 via-pink-300 to-red-400 dark:from-rose-400 dark:via-pink-400 dark:to-red-500 border border-rose-200/40 dark:border-rose-500/40 rounded-xl shadow-lg shadow-rose-400/15 hover:shadow-xl hover:shadow-rose-400/25 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-black/10">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="text-xs font-bold text-rose-900 dark:text-white uppercase tracking-wide [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                        Overdue
                      </span>
                    </div>
                    <div className="text-2xl font-black text-rose-900 dark:text-white mb-1 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">
                      {productivityData.taskPerformance.overdueTasks}
                    </div>
                    <div className="text-xs font-medium text-rose-800 dark:text-rose-100 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                      past deadline
                    </div>
                  </div>

                  {/* Success Rate Card */}
                  <div className="p-4 bg-gradient-to-br from-violet-300 via-purple-300 to-fuchsia-400 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-500 border border-violet-200/40 dark:border-violet-500/40 rounded-xl shadow-lg shadow-violet-400/15 hover:shadow-xl hover:shadow-violet-400/25 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-black/10">
                        <Award className="w-4 h-4 text-violet-600" />
                      </div>
                      <span className="text-xs font-bold text-violet-900 dark:text-white uppercase tracking-wide [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                        Success Rate
                      </span>
                    </div>
                    <div className="text-2xl font-black text-violet-900 dark:text-white mb-1 [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]">
                      {productivityData.taskPerformance.taskCompletionRate}%
                    </div>
                    <div className="text-xs font-medium text-violet-800 dark:text-violet-100 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                      completion rate
                    </div>
                  </div>
                </div>

                {/* Priority & Time Tracking Row */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
                  {/* Priority Breakdown */}
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg">Tasks by Priority</span>
                    </h4>
                    <div className="space-y-4">
                      {/* High Priority */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 dark:from-red-900/10 dark:via-rose-900/10 dark:to-pink-900/10 border border-red-100 dark:border-red-800/30 rounded-xl hover:shadow-md transition-all duration-200 h-[60px] cursor-pointer">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          High Priority
                        </span>
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {
                            productivityData.taskPerformance.tasksByPriority
                              .high
                          }
                        </span>
                      </div>

                      {/* Medium Priority */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/10 dark:via-orange-900/10 dark:to-yellow-900/10 border border-amber-100 dark:border-amber-800/30 rounded-xl hover:shadow-md transition-all duration-200 h-[60px] cursor-pointer">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Medium Priority
                        </span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {
                            productivityData.taskPerformance.tasksByPriority
                              .middle
                          }
                        </span>
                      </div>

                      {/* Low Priority */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/10 dark:via-green-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl hover:shadow-md transition-all duration-200 h-[60px] cursor-pointer">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Low Priority
                        </span>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {productivityData.taskPerformance.tasksByPriority.low}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time Tracking */}
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Timer className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg">Time Tracking</span>
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/30 h-[60px] hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Total Time
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatTime(
                            productivityData.timeTracking.totalTimeLogged
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/30 h-[60px] hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                            <Timer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Avg Session
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatTime(
                            productivityData.timeTracking.averageSessionDuration
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200/50 dark:border-gray-600/30 h-[60px] hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sessions
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {productivityData.timeTracking.dailyTimeDistribution.reduce(
                            (sum, day) => sum + day.sessions,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Activity - Clean & Professional */}
                {productivityData.timeTracking.dailyTimeDistribution.length >
                  0 && (
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    {/* Clean Header */}
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Daily Activity
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {timeRange === "day"
                                ? "Today's activity"
                                : timeRange === "week"
                                ? "Last 7 days overview"
                                : timeRange === "month"
                                ? "Last 30 days overview"
                                : "All time overview"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {productivityData.timeTracking.dailyTimeDistribution.reduce(
                              (sum, day) => sum + day.sessions,
                              0
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Sessions
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity List */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[400px] overflow-y-auto">
                      {productivityData.timeTracking.dailyTimeDistribution
                        .slice(
                          0,
                          timeRange === "day"
                            ? 1
                            : timeRange === "week"
                            ? 7
                            : timeRange === "month"
                            ? 30
                            : productivityData.timeTracking
                                .dailyTimeDistribution.length
                        )
                        .map((day, index) => {
                          const date = new Date(day.date);
                          const isToday =
                            new Date().toDateString() === date.toDateString();
                          const isYesterday =
                            new Date(Date.now() - 86400000).toDateString() ===
                            date.toDateString();

                          return (
                            <div
                              key={index}
                              className={`px-8 py-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                isToday
                                  ? "bg-blue-50/50 dark:bg-blue-900/10"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                {/* Date Section */}
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                      isToday
                                        ? "bg-blue-100 dark:bg-blue-900/30"
                                        : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                  >
                                    <div className="text-center">
                                      <div
                                        className={`text-sm font-bold ${
                                          isToday
                                            ? "text-blue-700 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-400"
                                        }`}
                                      >
                                        {date.toLocaleDateString("en-US", {
                                          day: "numeric",
                                        })}
                                      </div>
                                      <div
                                        className={`text-xs ${
                                          isToday
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-500"
                                        }`}
                                      >
                                        {date.toLocaleDateString("en-US", {
                                          month: "short",
                                        })}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4
                                        className={`font-medium ${
                                          isToday
                                            ? "text-blue-900 dark:text-blue-100"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                      >
                                        {date.toLocaleDateString("en-US", {
                                          weekday: "long",
                                        })}
                                      </h4>
                                      {(isToday || isYesterday) && (
                                        <span
                                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            isToday
                                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                          }`}
                                        >
                                          {isToday ? "Today" : "Yesterday"}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                      {date.toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>

                                {/* Metrics Section */}
                                <div className="flex items-center gap-8">
                                  {/* Time Spent */}
                                  <div className="text-right">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                      <span
                                        className={`text-lg font-semibold ${
                                          isToday
                                            ? "text-blue-900 dark:text-blue-100"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                      >
                                        {formatTime(day.totalTime)}
                                      </span>
                                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                      </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Time Spent
                                    </div>
                                  </div>

                                  {/* Sessions */}
                                  <div className="text-right">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                      <span
                                        className={`text-lg font-semibold ${
                                          isToday
                                            ? "text-blue-900 dark:text-blue-100"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                      >
                                        {day.sessions}
                                      </span>
                                      <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                        <Activity className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                      </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Sessions
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* Clean Footer */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatTime(
                                productivityData.timeTracking.dailyTimeDistribution.reduce(
                                  (sum, day) => sum + day.totalTime,
                                  0
                                ) /
                                  productivityData.timeTracking
                                    .dailyTimeDistribution.length
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Average Daily Time
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {(() => {
                                const mostActive =
                                  productivityData.timeTracking.dailyTimeDistribution.reduce(
                                    (max, day) =>
                                      day.totalTime > max.totalTime ? day : max
                                  );
                                return new Date(
                                  mostActive.date
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                });
                              })()}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Most Active Day
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {new Date(
                                productivityData.lastUpdated
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Last Updated
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
