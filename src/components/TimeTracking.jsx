import React, { useState, useEffect } from 'react';
import { useTimerStats, useStartTimer, useStopTimer } from '../hooks/useTimeTracker';
import { fetchTimerStatus } from '../services/timeTrackerService';
import TimerDisplay from './TimerDisplay';
import RecentActivity from './RecentActivity';
import TimeTrackingError from './TimeTrackingError';

export default function TimeTracking({ taskTitle, taskStatus, taskPriority, taskId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    // Local state for timer management
    const [isRunning, setIsRunning] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [liveElapsed, setLiveElapsed] = useState(0);
    const [startTime, setStartTime] = useState(null);

    // Use the time tracking hooks
    const { data: stats, isLoading: statsLoading, error: statsError } = useTimerStats({
        taskId: taskId
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
                const status = await fetchTimerStatus();

                if (status.isRunning && status.currentEntry && status.currentEntry.taskId === taskId) {
                    // Restore timer state from server
                    setIsRunning(true);
                    setCurrentEntry(status.currentEntry);
                    const serverStartTime = new Date(status.currentEntry.startTime).getTime();
                    setStartTime(serverStartTime);
                    // Calculate elapsed time from server start time
                    const elapsed = Math.floor((Date.now() - serverStartTime) / 1000);
                    setLiveElapsed(elapsed);
                } else {
                    // Ensure local state is reset
                    setIsRunning(false);
                    setCurrentEntry(null);
                    setStartTime(null);
                    setLiveElapsed(0);
                }
            } catch (error) {
                console.error('Failed to check server timer status:', error);
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
        if (!taskId) return;

        setIsLoading(true);
        try {
            const result = await startTimer(taskId);
            // Update local state immediately after successful start
            setIsRunning(true);
            setCurrentEntry(result);
            setStartTime(Date.now());
        } catch (error) {
            console.error('Failed to start timer:', error);

            // Handle "Timer already running" error specifically
            if (error.message === 'Timer already running') {
                try {
                    // Check server status to sync local state
                    const status = await fetchTimerStatus();
                    if (status.isRunning && status.taskId === taskId) {
                        // Update local state to match server state
                        setIsRunning(true);
                        setCurrentEntry(status.currentEntry);
                        setStartTime(new Date(status.startTime).getTime());
                        const elapsed = Math.floor((Date.now() - new Date(status.startTime).getTime()) / 1000);
                        setLiveElapsed(elapsed);
                        // Don't show error since we successfully synced the state
                        return;
                    }
                } catch (statusError) {
                    console.error('Failed to check server status after timer conflict:', statusError);
                }
            }

            // Show error for other types of errors
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
            console.error('Failed to stop timer:', error);
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

            <RecentActivity
                stats={stats}
                statsLoading={statsLoading}
            />
        </div>
    );
} 