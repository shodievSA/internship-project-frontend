import { useEffect, useState, useRef } from "react";
import { organizerService } from "../services/organizerService";
import { formatIsoDate } from "../utils/formatIsoDate";
import EmptyAiPlanner from "../components/EmptyAiPlanner";
import OrganizerOverview from "../components/OrganizerOverview";
import OrganizerTasksDueToday from "../components/OrganizerTasksDueToday";
import OrganizerTasksDueTomorrow from "../components/OrganizerTasksDueTomorrow";
import OrganizerTasksDueThisWeek from "../components/OrganizerTasksDueThisWeek";
import OrganizerTasksForReview from "../components/OrganizerTasksForReviews";
import OrganizerNotifications from "../components/OrganizerNotifications";
import LoadingReport from "../components/LoadingReport";
import ErrorState from "../components/ErrorState";

function Organizer() {
	const [dailyReport, setDailyReport] = useState();
	const [currentTab, setCurrentTab] = useState("overview");
	const [reportFetched, setReportFetched] = useState(false);
	const [error, setError] = useState();

	const tabRef = useRef();

	useEffect(() => {
		async function getDailyReport() {
			try {
				const { report } = await organizerService.getDailyReport();
				setDailyReport(report ? report : null);
			} catch (err) {
				setError(err.message);
			} finally {
				setTimeout(() => {
					setReportFetched(true);
				}, 500);
			}
		}

		getDailyReport();
	}, []);

	function handleTab(newTab, index) {
		const moveBy = index * 100;
		tabRef.current.style.transform = `translateX(${moveBy}%)`;

		setCurrentTab(newTab);
	}

	if (!reportFetched) return <LoadingReport />;
	if (error)
		return (
			<ErrorState
				message={
					"Oops! Your daily report tripped on a glitch. We’re working on it!"
				}
			/>
		);
	if (!dailyReport) return <EmptyAiPlanner />;

	return (
		<div className="h-full px-5 pt-5 lg:px-8">
			<div className="h-full flex flex-col gap-y-5 pb-5">
				<div>
					<p className="text-sm text-neutral-500 dark:text-neutral-400">
						The provided report has been generated based on the data
						available on {formatIsoDate(dailyReport.createdAt)},
						UTC+05:00
					</p>
				</div>
				<div className="dark:bg-neutral-900 bg-neutral-100 p-1 rounded-md">
					<ul
						className="grid gap-y-2 grid-cols-[repeat(3,minmax(100px,1fr))] 
					md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>li]:text-center [&>li]:p-2 [&>li]:font-medium [&>li]:rounded-md 
					rounded-md relative text-sm"
					>
						<div
							ref={tabRef}
							className="absolute h-full bg-white dark:bg-black w-1/6 translate-x-0
						transition-[transform] duration-200 rounded-md"
						></div>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "overview" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("overview", 0)}
						>
							Overview
						</li>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "tasks-due-today" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("tasks-due-today", 1)}
						>
							Today
						</li>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "tasks-due-tomorrow" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("tasks-due-tomorrow", 2)}
						>
							Tomorrow
						</li>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "tasks-due-this-week" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("tasks-due-this-week", 3)}
						>
							This Week
						</li>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "reviews" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("reviews", 4)}
						>
							Reviews
						</li>
						<li
							className={`transition-['background-color,text'] duration-300 cursor-pointer z-10
							${currentTab === "notifications" ? "text-black dark:text-white" : "text-neutral-500"}`}
							onClick={() => handleTab("notifications", 5)}
						>
							Updates
						</li>
					</ul>
				</div>
				{currentTab === "overview" ? (
					<OrganizerOverview
						summary={dailyReport.report.summary}
						tasksDueToday={dailyReport.report.tasksDueToday}
						tasksDueTomorrow={dailyReport.report.tasksDueTomorrow}
						tasksDueThisWeek={dailyReport.report.tasksDueThisWeek}
						tasksForReview={dailyReport.report.tasksForReview}
						newNotifications={dailyReport.report.newNotifications}
						changeSection={handleTab}
					/>
				) : currentTab === "tasks-due-today" ? (
					<OrganizerTasksDueToday
						tasksDueToday={dailyReport.report.tasksDueToday}
					/>
				) : currentTab === "tasks-due-tomorrow" ? (
					<OrganizerTasksDueTomorrow
						tasksDueTomorrow={dailyReport.report.tasksDueTomorrow}
					/>
				) : currentTab === "tasks-due-this-week" ? (
					<OrganizerTasksDueThisWeek
						tasksDueThisWeek={dailyReport.report.tasksDueThisWeek}
					/>
				) : currentTab === "reviews" ? (
					<OrganizerTasksForReview
						tasksForReviews={dailyReport.report.tasksForReview}
					/>
				) : (
					currentTab === "notifications" && (
						<OrganizerNotifications
							newNotifications={
								dailyReport.report.newNotifications
							}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default Organizer;
