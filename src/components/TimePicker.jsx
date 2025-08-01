import { useState, useRef, useEffect } from "react";
import { Asterisk, Clock, X } from "lucide-react";

function TimePicker({ label, disabled, value, setValue, required = false }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Generate time options in 30-minute increments
	const generateTimeOptions = () => {
		const options = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const time = new Date();
				time.setHours(hour, minute, 0, 0);
				const timeString = time.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				});
				options.push({
					value: timeString,
					label: timeString,
				});
			}
		}
		return options;
	};

	const timeOptions = generateTimeOptions();

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTimeSelect = (timeValue) => {
		setValue(timeValue);
		setIsOpen(false);
	};

	const clearTime = (e) => {
		e.stopPropagation();
		setValue("");
	};

	return (
		<div className="flex flex-col gap-y-2">
			{label && (
				<label className="flex gap-x-0.5">
					<span className="text-sm md:text-base font-semibold">
						{label}
					</span>
					{required && (
						<Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
					)}
				</label>
			)}
			<div className="relative" ref={dropdownRef}>
				<div
					className={`relative cursor-pointer dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
					text-sm border-[1px] px-4 outline-none pl-10 w-full h-10 flex items-center
					${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text hover:border-gray-400 dark:hover:border-gray-600"}
					${isOpen ? "border-blue-500 dark:border-blue-400" : ""}`}
					onClick={() => !disabled && setIsOpen(!isOpen)}
				>
					<Clock className="w-4 h-4 absolute left-3 text-gray-400" />
					<span
						className={
							value
								? "text-gray-900 dark:text-white"
								: "text-gray-500"
						}
					>
						{value || "Select time"}
					</span>
					{value && !disabled && (
						<X
							className="w-4 h-4 absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
							onClick={clearTime}
						/>
					)}
				</div>

				{isOpen && (
					<div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto">
						{timeOptions.map((option) => (
							<div
								key={option.value}
								className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
								${value === option.value ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-900 dark:text-white"}`}
								onClick={() => handleTimeSelect(option.value)}
							>
								{option.label}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default TimePicker;
