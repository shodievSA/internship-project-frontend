import { useState, useEffect, useRef } from "react";
import { useToast } from "./ui/ToastProvider";
import { useCreateManualEntry } from "../hooks/useTimeTracker";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import TimePicker from "./TimePicker";
import MonthCalendar from "./MonthCalendar";
import AiEditor from "./AiEditor";
import { Clock, Calendar } from "lucide-react";

function LogTimeModal({ taskId, closeModal }) {
	const { showToast } = useToast();
	const createManualEntry = useCreateManualEntry();
	const startCalendarRef = useRef(null);
	const endCalendarRef = useRef(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState(new Date());
	const [endTime, setEndTime] = useState("");
	const [note, setNote] = useState("");
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [showStartCalendar, setShowStartCalendar] = useState(false);
	const [showEndCalendar, setShowEndCalendar] = useState(false);

	// Handle click outside to close calendars
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				startCalendarRef.current &&
				!startCalendarRef.current.contains(event.target)
			) {
				setShowStartCalendar(false);
			}
			if (
				endCalendarRef.current &&
				!endCalendarRef.current.contains(event.target)
			) {
				setShowEndCalendar(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Validate form
	useEffect(() => {
		const isValid =
			startDate &&
			startTime &&
			endDate &&
			endTime &&
			note &&
			note.trim() !== "";
		setSubmitButtonDisabled(!isValid);
	}, [startDate, startTime, endDate, endTime, note]);

	const handleSubmit = async () => {
		if (
			!startDate ||
			!startTime ||
			!endDate ||
			!endTime ||
			!note ||
			note.trim() === ""
		) {
			showToast({
				variant: "failure",
				message:
					"Please fill in all required fields including the note",
			});
			return;
		}

		try {
			// Parse time strings to get hours and minutes
			const parseTimeString = (timeStr) => {
				const [time, period] = timeStr.split(" ");
				const [hours, minutes] = time.split(":").map(Number);
				let hour24 = hours;

				if (period === "PM" && hours !== 12) {
					hour24 = hours + 12;
				} else if (period === "AM" && hours === 12) {
					hour24 = 0;
				}

				return { hours: hour24, minutes };
			};

			const startTimeParts = parseTimeString(startTime);
			const endTimeParts = parseTimeString(endTime);

			// Create Date objects with the selected dates and parsed times
			const startDateTime = new Date(startDate);
			startDateTime.setHours(
				startTimeParts.hours,
				startTimeParts.minutes,
				0,
				0,
			);

			const endDateTime = new Date(endDate);
			endDateTime.setHours(
				endTimeParts.hours,
				endTimeParts.minutes,
				0,
				0,
			);

			// Validate that end time is after start time
			if (endDateTime <= startDateTime) {
				showToast({
					variant: "failure",
					message: "End time must be after start time",
				});
				return;
			}

			setIsSubmitting(true);

			await createManualEntry(
				taskId,
				startDateTime.toISOString(),
				endDateTime.toISOString(),
				note,
			);

			showToast({
				variant: "success",
				message: "Time entry logged successfully!",
			});

			closeModal();
		} catch (error) {
			console.error("Failed to log time:", error);
			showToast({
				variant: "failure",
				message: error.message || "Failed to log time entry",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const formatDateForDisplay = (date) => {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Modal
			title="Log Time"
			titleIcon={<Clock className="w-5 h-5" />}
			customWidth={400}
			closeModal={closeModal}
			showOverlay="light"
		>
			<div className="flex flex-col px-6 pb-6 gap-y-6">
				{/* Start Date and Time Section */}
				<div className="flex flex-col gap-y-3">
					<h3 className="text-base font-semibold text-gray-900 dark:text-white">
						Start date *
					</h3>
					<div className="flex gap-x-3 items-stretch">
						<div className="relative flex-1" ref={startCalendarRef}>
							<button
								type="button"
								disabled={isSubmitting}
								onClick={() =>
									setShowStartCalendar(!showStartCalendar)
								}
								className="w-full h-10 text-left dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
                                text-sm border-[1px] px-4 outline-none pl-10 flex items-center
                                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:border-gray-400 dark:hover:border-gray-600"
							>
								<Calendar className="w-4 h-4 absolute left-3 text-gray-400" />
								<span
									className={
										startDate
											? "text-gray-900 dark:text-white"
											: "text-gray-500"
									}
								>
									{startDate
										? formatDateForDisplay(startDate)
										: "Select date"}
								</span>
							</button>

							{showStartCalendar && (
								<div className="absolute z-50 mt-1">
									<MonthCalendar
										selectedDate={startDate}
										onDateSelect={(date) => {
											setStartDate(date);
											setShowStartCalendar(false);
										}}
										disabled={isSubmitting}
									/>
								</div>
							)}
						</div>
						<div className="flex-1">
							<TimePicker
								label=""
								value={startTime}
								setValue={setStartTime}
								required={true}
								disabled={isSubmitting}
							/>
						</div>
					</div>
				</div>

				{/* End Date and Time Section */}
				<div className="flex flex-col gap-y-3">
					<h3 className="text-base font-semibold text-gray-900 dark:text-white">
						End date *
					</h3>
					<div className="flex gap-x-3 items-stretch">
						<div className="relative flex-1" ref={endCalendarRef}>
							<button
								type="button"
								disabled={isSubmitting}
								onClick={() =>
									setShowEndCalendar(!showEndCalendar)
								}
								className="w-full h-10 text-left dark:bg-neutral-950 dark:border-neutral-800 bg-white rounded-md 
                                text-sm border-[1px] px-4 outline-none pl-10 flex items-center
                                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:border-gray-400 dark:hover:border-gray-600"
							>
								<Calendar className="w-4 h-4 absolute left-3 text-gray-400" />
								<span
									className={
										endDate
											? "text-gray-900 dark:text-white"
											: "text-gray-500"
									}
								>
									{endDate
										? formatDateForDisplay(endDate)
										: "Select date"}
								</span>
							</button>

							{showEndCalendar && (
								<div className="absolute z-50 mt-1">
									<MonthCalendar
										selectedDate={endDate}
										onDateSelect={(date) => {
											setEndDate(date);
											setShowEndCalendar(false);
										}}
										disabled={isSubmitting}
									/>
								</div>
							)}
						</div>
						<div className="flex-1">
							<TimePicker
								label=""
								value={endTime}
								setValue={setEndTime}
								required={true}
								disabled={isSubmitting}
							/>
						</div>
					</div>
				</div>

				{/* Note Section */}
				<div className="flex flex-col gap-y-3">
					<h3 className="text-base font-semibold text-gray-900 dark:text-white">
						Note *
					</h3>
					<div className="flex-1">
						<AiEditor
							label=""
							placeholder="What are you working on?"
							value={note}
							setValue={setNote}
							rows={3}
							disabled={isSubmitting}
							showEnhance={false}
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className="grid grid-cols-2 gap-4 pt-2">
					<Button
						variant="secondary"
						onClick={closeModal}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						loading={isSubmitting}
						disabled={submitButtonDisabled || isSubmitting}
					>
						Log Time
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default LogTimeModal;
