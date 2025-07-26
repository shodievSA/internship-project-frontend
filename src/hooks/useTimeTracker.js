import useSWR, { mutate } from 'swr';
import {
  startTimer,
  stopTimer,
  fetchTimerStats,
  createManualEntry
} from '../services/timeTrackerService';

// --- SWR Hooks ---
// Returns: { total, today, entries, ... }
export function useTimerStats(params, options) {
  return useSWR(['timer-stats', params], () => fetchTimerStats(params), {
    refreshInterval: options && options.refreshInterval ? options.refreshInterval : 0,
  });
}

export function useStartTimer() {
  return async (taskId, note) => {
    const result = await startTimer(taskId, note);
    // Invalidate stats for the specific task
    mutate(['timer-stats', { taskId }]);
    return result;
  };
}

export function useStopTimer() {
  return async (note, taskId) => {
    const result = await stopTimer(note);
    // Invalidate stats for the specific task that was stopped
    if (taskId) {
      mutate(['timer-stats', { taskId }]);
    } else {
      // Fallback to invalidate all stats if no taskId provided
      mutate(['timer-stats']);
    }
    return result;
  };
}

export function useCreateManualEntry() {
  return async (taskId, startTime, endTime, note) => {
    const result = await createManualEntry(taskId, startTime, endTime, note);
    // Invalidate stats for the specific task
    mutate(['timer-stats', { taskId }]);
    return result;
  };
}



    