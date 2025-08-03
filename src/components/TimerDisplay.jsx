import React, { useState } from "react";
import { Play, Square, RefreshCw, Plus } from "lucide-react";
import LogTimeModal from "./LogTimeModal";

export default function TimerDisplay({
  isRunning,
  isInitializing,
  isLoading,
  liveElapsed,
  onStart,
  onStop,
  taskId,
}) {
  const [showLogTimeModal, setShowLogTimeModal] = useState(false);

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4">
        {/* Timer Display - Above */}
        <div className="text-center mb-6">
          <div className="text-4xl font-mono font-bold text-gray-900 dark:text-white mb-2">
            {isInitializing ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                <span>Loading...</span>
              </div>
            ) : isRunning ? (
              formatTime(liveElapsed)
            ) : (
              "00:00:00"
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isInitializing
              ? "Checking timer status..."
              : isRunning
              ? "Timer is running"
              : "Ready to track time"}
          </div>
        </div>

        {/* Timer Controls - Same Row */}
        <div className="flex justify-center gap-3">
          {/* Timer Control Button - Smooth Transition */}
          <div className="w-32 h-10 relative">
            {isInitializing ? (
              <button
                disabled={true}
                className="w-full h-full flex items-center justify-center gap-x-2 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading</span>
              </button>
            ) : (
              <button
                onClick={isRunning ? () => onStop() : () => onStart()}
                disabled={isLoading || (!isRunning && !taskId)}
                className={`w-full h-full flex items-center justify-center gap-x-2 text-white font-semibold rounded-lg transition-all duration-500 ease-in-out shadow-sm ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                    : "bg-green-500 hover:bg-green-600 disabled:bg-green-300"
                }`}
              >
                <div className="flex items-center justify-center gap-x-2">
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin transition-all duration-300" />
                  ) : isRunning ? (
                    <Square className="w-4 h-4 transition-all duration-300" />
                  ) : (
                    <Play className="w-4 h-4 transition-all duration-300" />
                  )}
                  <span className="text-sm transition-all duration-300">
                    {isLoading
                      ? isRunning
                        ? "Stopping"
                        : "Starting"
                      : isRunning
                      ? "Stop"
                      : "Start"}
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Log Time Button - Fixed Width */}
          <div className="w-32 h-10">
            <button
              onClick={() => setShowLogTimeModal(true)}
              disabled={isLoading || !taskId}
              className="w-full h-full flex items-center justify-center gap-x-2 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Log Time</span>
            </button>
          </div>
        </div>
      </div>

      {/* Log Time Modal */}
      {showLogTimeModal && (
        <LogTimeModal
          taskId={taskId}
          closeModal={() => setShowLogTimeModal(false)}
        />
      )}
    </>
  );
}
