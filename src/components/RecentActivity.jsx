import React from 'react';
import { Calendar, Clock, RefreshCw, FileText, SquarePen } from 'lucide-react';

export default function RecentActivity({ stats, statsLoading }) {
    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                        {stats?.entries?.length || 0} entries
                    </div>
                </div>
            </div>

            <div className={`max-h-56 pb-4 ${stats?.entries && stats.entries.length > 0 ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100 dark:scrollbar-thumb-green-600 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-green-400 dark:hover:scrollbar-thumb-green-500' : 'overflow-hidden scrollbar-none'}`}>
                {statsLoading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="relative">
                            <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
                            <div className="absolute inset-0 w-8 h-8 border-2 border-green-200 rounded-full animate-ping"></div>
                        </div>
                        <p className="mt-3 text-sm font-medium">Loading activity...</p>
                    </div>
                ) : stats?.entries && stats.entries.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {stats.entries.map((entry, index) => {
                            const startDate = new Date(entry.startTime);
                            const endDate = entry.endTime ? new Date(entry.endTime) : null;
                            const duration = entry.duration || 0;
                            const isToday = startDate.toDateString() === new Date().toDateString();
                            const hasNote = entry.note && entry.note.trim() !== '';
                            const isManualEntry = hasNote;

                            // Debug: log note information
                            if (index === 0) {
                                console.log('Entry note:', entry.note);
                                console.log('hasNote:', hasNote);
                                console.log('isManualEntry:', isManualEntry);
                            }

                            return (
                                <div key={entry.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                    <div className="px-6 py-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-x-3 mb-2">
                                                    <div className="flex-shrink-0">
                                                        {isManualEntry ? (
                                                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                                                                <SquarePen className="w-4 h-4 text-white" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-sm">
                                                                <Calendar className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-x-2 text-sm">
                                                            <span className={`font-medium ${isToday ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                                                {isToday ? 'Today' : startDate.toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: startDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                                                                })}
                                                            </span>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="text-gray-600 dark:text-gray-400 font-mono">
                                                                {startDate.toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                })}
                                                            </span>
                                                            {endDate && (
                                                                <>
                                                                    <span className="text-gray-400">→</span>
                                                                    <span className="text-gray-600 dark:text-gray-400 font-mono">
                                                                        {endDate.toLocaleTimeString([], {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: true
                                                                        })}
                                                                    </span>
                                                                </>
                                                            )}
                                                            {isManualEntry && (
                                                                <>
                                                                    <span className="text-gray-400">•</span>
                                                                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                        Manual
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Note display for manual entries */}
                                                        {hasNote && (
                                                            <div className="flex items-start gap-x-2 mt-2 text-sm">
                                                                <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                                <span className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                                                    {entry.note}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 ml-4">
                                                <div className="flex items-center gap-x-2">
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                            {formatDuration(duration)}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {duration >= 3600 ? 'hours' : duration >= 60 ? 'minutes' : 'seconds'}
                                                        </div>
                                                    </div>
                                                    <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full opacity-80"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-4 border-2 border-gray-200 dark:border-gray-700">
                            <Clock className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activity yet</h4>
                        <p className="text-sm text-center max-w-xs">
                            Start tracking your time to see your activity history here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 