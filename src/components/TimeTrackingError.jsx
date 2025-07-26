import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function TimeTrackingError() {
    return (
        <div className="w-full">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Time Tracking Unavailable
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-4">
                    The time tracking service is currently unavailable. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );
} 