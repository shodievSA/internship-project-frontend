import React, { useState, useEffect } from "react";
import {
  useTimerStats,
  useStartTimer,
  useStopTimer,
} from "../hooks/useTimeTracker";
import { fetchTimerStatus } from "../services/timeTrackerService";
import { useToast } from "./ui/ToastProvider";
import TimerDisplay from "./TimerDisplay";
import RecentActivity from "./RecentActivity";
import TimeTrackingError from "./TimeTrackingError";

export default function TimeTracking({
  taskTitle,
  taskStatus,
  taskPriority,
  taskId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { showToast } = useToast();

  // Local state for timer management
  const [isRunning, setIsRunning] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [liveElapsed, setLiveElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Use the time tracking hooks
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useTimerStats({
    taskId: taskId,
  });
  const startTimer = useStartTimer();
  const stopTimer = useStopTimer();

  // Check for API errors
  useEffect(() => {
    if (statsError) {
      setApiError(true);
    } else {
      setApiError(false);
    }
  }, [statsError]);

  // Server status check on mount
  useEffect(() => {
    async function checkServerStatus() {
      setIsInitializing(true);
      try {
        console.log("Checking server timer status for taskId:", taskId);
        const status = await fetchTimerStatus();
        console.log("Server status response:", status);
        console.log("Status isRunning:", status.isRunning);
        console.log("Status taskId:", status.taskId);
        console.log("Current taskId:", taskId);
        console.log("Status currentEntry:", status.currentEntry);

        if (
          status.isRunning &&
          status.currentEntry &&
          status.currentEntry.taskId === taskId
        ) {
          console.log("Timer is running on server, restoring state...");
          // Restore timer state from server
          setIsRunning(true);
          setCurrentEntry(status.currentEntry);
          const serverStartTime = new Date(
            status.currentEntry.startTime
          ).getTime();
          setStartTime(serverStartTime);
          // Calculate elapsed time from server start time
          const elapsed = Math.floor((Date.now() - serverStartTime) / 1000);
          setLiveElapsed(elapsed);
          console.log(
            "Timer state restored - elapsed:",
            elapsed,
            "startTime:",
            serverStartTime
          );
        } else {
          console.log("No timer running on server for this task");
          console.log(
            "Reason: isRunning =",
            status.isRunning,
            "currentEntry =",
            !!status.currentEntry,
            "taskId match =",
            status.currentEntry?.taskId === taskId
          );
          // Ensure local state is reset
          setIsRunning(false);
          setCurrentEntry(null);
          setStartTime(null);
          setLiveElapsed(0);
        }
      } catch (error) {
        console.error("Failed to check server timer status:", error);
        // Reset local state on error
        setIsRunning(false);
        setCurrentEntry(null);
        setStartTime(null);
        setLiveElapsed(0);
      } finally {
        setIsInitializing(false);
      }
    }

    checkServerStatus();
  }, [taskId]);

  // Live timer update when running
  useEffect(() => {
    let interval;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        setLiveElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setLiveElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  async function handleStart() {
    if (!taskId || isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    try {
      const result = await startTimer(taskId);
      // Update local state immediately after successful start
      setIsRunning(true);
      setCurrentEntry(result);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Failed to start timer:", error);

      // Handle "Timer already running" error specifically
      if (error.message === "Timer already running") {
        try {
          // Check server status to sync local state
          const status = await fetchTimerStatus();
          if (status.isRunning && status.taskId === taskId) {
            // Update local state to match server state
            setIsRunning(true);
            setCurrentEntry(status.currentEntry);
            setStartTime(new Date(status.startTime).getTime());
            const elapsed = Math.floor(
              (Date.now() - new Date(status.startTime).getTime()) / 1000
            );
            setLiveElapsed(elapsed);
            // Show success toast since we successfully synced the state
            showToast({
              variant: "success",
              title: "Timer Resumed",
              message: "Your timer was already running and has been resumed.",
            });
            return;
          } else if (status.isRunning && status.taskId !== taskId) {
            // Timer is running for a different task
            showToast({
              variant: "error",
              title: "Timer Already Running",
              message:
                "Please stop the current timer before starting a new one.",
            });
            return;
          }
        } catch (statusError) {
          console.error(
            "Failed to check server status after timer conflict:",
            statusError
          );
          showToast({
            variant: "error",
            title: "Timer Error",
            message: "Unable to check timer status. Please try again.",
          });
          return;
        }
      }

      // Show error for other types of errors
      showToast({
        variant: "error",
        title: "Failed to Start Timer",
        message:
          error.message || "An unexpected error occurred. Please try again.",
      });
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStop() {
    setIsLoading(true);
    try {
      await stopTimer(null, taskId); // Pass taskId as second parameter
      // Update local state immediately after successful stop
      setIsRunning(false);
      setCurrentEntry(null);
      setStartTime(null);
      setLiveElapsed(0);
    } catch (error) {
      console.error("Failed to stop timer:", error);
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Show API error state
  if (apiError) {
    return <TimeTrackingError />;
  }

  return (
    <div className="w-full">
      <TimerDisplay
        isRunning={isRunning}
        isInitializing={isInitializing}
        isLoading={isLoading}
        liveElapsed={liveElapsed}
        onStart={handleStart}
        onStop={handleStop}
        taskId={taskId}
      />

      <RecentActivity stats={stats} statsLoading={statsLoading} />
    </div>
  );
}
