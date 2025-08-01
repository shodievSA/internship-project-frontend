import { useState, useEffect } from "react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

function MonthCalendar({
	selectedDate,
	onDateSelect,
	disabled = false,
	className = "",
}) {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [hoveredDate, setHoveredDate] = useState(null);

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
		return date.getMonth() === currentMonth.getMonth();
	};

	const calendarDates = generateCalendarDates(currentMonth);
	const currentMonthName = currentMonth.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<div
			className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-lg min-w-[320px] ${className}`}
		>
			{/* Header with navigation */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<button
						onClick={goToPreviousYear}
						disabled={disabled}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors"
						title="Previous year"
					>
						<ChevronsLeft className="w-4 h-4" />
					</button>
					<button
						onClick={goToPreviousMonth}
						disabled={disabled}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors"
						title="Previous month"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
				</div>

				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{currentMonthName}
				</h3>

				<div className="flex items-center space-x-3">
					<button
						onClick={goToNextMonth}
						disabled={disabled}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors"
						title="Next month"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
					<button
						onClick={goToNextYear}
						disabled={disabled}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors"
						title="Next year"
					>
						<ChevronsRight className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Day headers */}
			<div className="grid grid-cols-7 gap-2 mb-4">
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
			<div className="grid grid-cols-7 gap-2">
				{calendarDates.map((date) => {
					const isCurrentMonthDate = isCurrentMonth(date);
					const isTodayDate = isToday(date);
					const isSelectedDate = isSelected(date);
					const isHovered =
						hoveredDate &&
						hoveredDate.toDateString() === date.toDateString();

					return (
						<button
							key={date.toISOString()}
							onClick={() => !disabled && onDateSelect(date)}
							onMouseEnter={() =>
								!disabled && setHoveredDate(date)
							}
							onMouseLeave={() => setHoveredDate(null)}
							disabled={disabled}
							className={`
                                relative w-12 h-10 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
                                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"}
                                ${isCurrentMonthDate ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}
                                ${isTodayDate ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : ""}
                                ${isSelectedDate ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
                                ${isHovered && !isSelectedDate ? "bg-gray-100 dark:bg-gray-700" : ""}
                            `}
						>
							<span className="relative z-10">
								{date.getDate()}
							</span>
							{isSelectedDate && (
								<div className="absolute bottom-1 left-1 right-1 h-0.5 bg-white rounded-full"></div>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default MonthCalendar;
