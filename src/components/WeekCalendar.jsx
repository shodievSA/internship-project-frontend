import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

function WeekCalendar({
    selectedDate,
    onDateSelect,
    disabled = false,
    className = ""
}) {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);

    // Get the start of the week (Sunday)
    const getWeekStart = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        return new Date(d.setDate(diff));
    };

    // Generate week dates
    const generateWeekDates = (weekStart) => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Navigate to previous week
    const goToPreviousWeek = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newWeek);
    };

    // Navigate to next week
    const goToNextWeek = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(newWeek);
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setMonth(currentWeek.getMonth() - 1);
        setCurrentWeek(newWeek);
    };

    // Navigate to next month
    const goToNextMonth = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setMonth(currentWeek.getMonth() + 1);
        setCurrentWeek(newWeek);
    };

    // Format date for display
    const formatDate = (date) => {
        return date.getDate();
    };

    // Format day name
    const formatDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    // Check if date is today
    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    // Check if date is selected
    const isSelected = (date) => {
        if (!selectedDate) return false;
        return date.toDateString() === selectedDate.toDateString();
    };

    // Check if date is in current month
    const isCurrentMonth = (date) => {
        return date.getMonth() === currentWeek.getMonth();
    };

    const weekStart = getWeekStart(currentWeek);
    const weekDates = generateWeekDates(weekStart);
    const currentMonth = currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
            {/* Header with navigation */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={goToPreviousMonth}
                        disabled={disabled}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={goToPreviousWeek}
                        disabled={disabled}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentMonth}
                </h3>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={goToNextWeek}
                        disabled={disabled}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={goToNextMonth}
                        disabled={disabled}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDates.map((date) => (
                    <div
                        key={date.toISOString()}
                        className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                        {formatDayName(date)}
                    </div>
                ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7 gap-1">
                {weekDates.map((date) => {
                    const isCurrentMonthDate = isCurrentMonth(date);
                    const isTodayDate = isToday(date);
                    const isSelectedDate = isSelected(date);
                    const isHovered = hoveredDate && hoveredDate.toDateString() === date.toDateString();

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => !disabled && onDateSelect(date)}
                            onMouseEnter={() => !disabled && setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            disabled={disabled}
                            className={`
                                relative w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200
                                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                                ${isCurrentMonthDate ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                                ${isTodayDate ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}
                                ${isSelectedDate ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                                ${isHovered && !isSelectedDate ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                            `}
                        >
                            <span className="relative z-10">
                                {formatDate(date)}
                            </span>
                            {isSelectedDate && (
                                <div className="absolute inset-0 bg-blue-600 rounded-lg"></div>
                            )}
                            {isTodayDate && !isSelectedDate && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default WeekCalendar; 