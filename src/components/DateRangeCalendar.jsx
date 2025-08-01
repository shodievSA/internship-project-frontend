import { useState, useEffect } from "react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

function DateRangeCalendar({
	startDate,
	endDate,
	onStartDateSelect,
	onEndDateSelect,
	disabled = false,
	className = "",
}) {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [hoveredDate, setHoveredDate] = useState(null);
	const [selectionMode, setSelectionMode] = useState("start"); // 'start' or 'end'

	// Get the start of the month
	const getMonthStart = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	};

	// Get the end of the month
	const getMonthEnd = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0);
	};

	// Get the start of the week for a given date
	const getWeekStart = (date) => {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day;
		return new Date(d.setDate(diff));
	};

	// Generate calendar dates for the month
	const generateCalendarDates = (month) => {
		const dates = [];
		const monthStart = getMonthStart(month);
		const monthEnd = getMonthEnd(month);
		const calendarStart = getWeekStart(monthStart);
		const calendarEnd = new Date(monthEnd);
		calendarEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

		const current = new Date(calendarStart);
		while (current <= calendarEnd) {
			dates.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}

		return dates;
	};

	// Navigate to previous month
	const goToPreviousMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(currentMonth.getMonth() - 1);
		setCurrentMonth(newMonth);
	};

	// Navigate to next month
	const goToNextMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(currentMonth.getMonth() + 1);
		setCurrentMonth(newMonth);
	};

	// Navigate to previous year
	const goToPreviousYear = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setFullYear(currentMonth.getFullYear() - 1);
		setCurrentMonth(newMonth);
	};

	// Navigate to next year
	const goToNextYear = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setFullYear(currentMonth.getFullYear() + 1);
		setCurrentMonth(newMonth);
	};

	// Handle date selection
	const handleDateSelect = (date) => {
		if (disabled) return;

		if (selectionMode === "start") {
			onStartDateSelect(date);
			setSelectionMode("end");
		} else {
			if (date >= startDate) {
				onEndDateSelect(date);
				setSelectionMode("start");
			} else {
				// If end date is before start date, swap them
				onEndDateSelect(startDate);
				onStartDateSelect(date);
				setSelectionMode("start");
			}
		}
	};

	// Check if date is in range
	const isInRange = (date) => {
		if (!startDate || !endDate) return false;
		return date >= startDate && date <= endDate;
	};

	// Check if date is range start
	const isRangeStart = (date) => {
		if (!startDate) return false;
		return date.toDateString() === startDate.toDateString();
	};

	// Check if date is range end
	const isRangeEnd = (date) => {
		if (!endDate) return false;
		return date.toDateString() === endDate.toDateString();
	};

	// Check if date is today
	const isToday = (date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	// Check if date is in current month
	const isCurrentMonth = (date) => {
		return date.getMonth() === currentMonth.getMonth();
	};

	// Check if date is hovered and would be in range
	const isHoveredInRange = (date) => {
		if (!hoveredDate || !startDate || selectionMode !== "end") return false;
		return date >= startDate && date <= hoveredDate;
	};

	const calendarDates = generateCalendarDates(currentMonth);
	const currentMonthName = currentMonth.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<div
			className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}
		>
			{/* Header with navigation */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-2">
					<button
						onClick={goToPreviousYear}
						disabled={disabled}
						className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
						title="Previous year"
					>
						<ChevronsLeft className="w-4 h-4" />
					</button>
					<button
						onClick={goToPreviousMonth}
						disabled={disabled}
						className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
						title="Previous month"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
				</div>

				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{currentMonthName}
				</h3>

				<div className="flex items-center space-x-2">
					<button
						onClick={goToNextMonth}
						disabled={disabled}
						className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
						title="Next month"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
					<button
						onClick={goToNextYear}
						disabled={disabled}
						className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
						title="Next year"
					>
						<ChevronsRight className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Day headers */}
			<div className="grid grid-cols-7 gap-1 mb-2">
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
					(day) => (
						<div
							key={day}
							className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
						>
							{day}
						</div>
					),
				)}
			</div>

			{/* Calendar grid */}
			<div className="grid grid-cols-7 gap-1">
				{calendarDates.map((date) => {
					const isCurrentMonthDate = isCurrentMonth(date);
					const isTodayDate = isToday(date);
					const isRangeStartDate = isRangeStart(date);
					const isRangeEndDate = isRangeEnd(date);
					const isInRangeDate = isInRange(date);
					const isHoveredInRangeDate = isHoveredInRange(date);
					const isHovered =
						hoveredDate &&
						hoveredDate.toDateString() === date.toDateString();

					return (
						<button
							key={date.toISOString()}
							onClick={() => handleDateSelect(date)}
							onMouseEnter={() =>
								!disabled && setHoveredDate(date)
							}
							onMouseLeave={() => setHoveredDate(null)}
							disabled={disabled}
							className={`
                                relative w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                                ${isCurrentMonthDate ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}
                                ${isTodayDate ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : ""}
                                ${isRangeStartDate ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
                                ${isRangeEndDate ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
                                ${isInRangeDate && !isRangeStartDate && !isRangeEndDate ? "bg-blue-200 dark:bg-blue-800/50" : ""}
                                ${isHoveredInRangeDate && !isInRangeDate ? "bg-blue-100 dark:bg-blue-900/20" : ""}
                                ${isHovered && !isInRangeDate && !isRangeStartDate && !isRangeEndDate ? "bg-gray-100 dark:bg-gray-700" : ""}
                            `}
						>
							<span className="relative z-10">
								{date.getDate()}
							</span>
							{isTodayDate && !isInRangeDate && (
								<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
							)}
						</button>
					);
				})}
			</div>

			{/* Selection mode indicator */}
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				{selectionMode === "start"
					? "Select start date"
					: "Select end date"}
			</div>
		</div>
	);
}

export default DateRangeCalendar;
