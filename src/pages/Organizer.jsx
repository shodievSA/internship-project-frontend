import { useEffect, useState } from "react";
import { organizerService } from "../services/organizerService";
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
	const [currentSection, setCurrentSection] = useState("overview");
	const [reportFetched, setReportFetched] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {

		async function getDailyReport() {

			try {
	
				const { report } = await organizerService.getDailyReport();
				setDailyReport(report.report);
	
			} catch(err) {
	
				setError(err.message);
	
			} finally {
	
				setTimeout(() => {

					setReportFetched(true);

				}, 500);
	
			}

		}

		getDailyReport();

	}, []);

	function changeSection(newSection) {

		setCurrentSection(newSection);

	}

	if (!reportFetched) return <LoadingReport />;
	if (error) return <ErrorState message={"Oops! Your daily report tripped on a glitch. We’re working on it!"} />;
	if (!dailyReport) return <EmptyAiPlanner />

    return (
        <div className="h-full px-5 pt-8 lg:px-8">
			<div className="h-full flex flex-col gap-y-5 pb-8">
				<ul className="dark:bg-neutral-900 bg-neutral-100 p-1 grid gap-y-2 grid-cols-[repeat(3,minmax(100px,1fr))] 
				md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [&>li]:text-center [&>li]:p-2 [&>li]:font-medium [&>li]:rounded-md 
				rounded-md mb-2">
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "overview" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("overview")}
					>
						Overview
					</li>
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "tasks-due-today" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("tasks-due-today")}
					>
						Today
					</li>
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "tasks-due-tomorrow" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("tasks-due-tomorrow")}
					>
						Tomorrow
					</li>
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "tasks-due-this-week" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("tasks-due-this-week")}
					>
						This Week
					</li>
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "reviews" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("reviews")}
					>
						Reviews
					</li>
					<li 
						className={`transition-[background-color] duration-300 text-sm md:text-base cursor-pointer
						${currentSection === "notifications" ? "dark:bg-black dark:text-white bg-white" : "bg-transparent dark:text-neutral-500 text-neutral-500"}`}
						onClick={() => setCurrentSection("notifications")}
					>
						Updates
					</li>
				</ul>
				{
					currentSection === "overview" ? (
						<OrganizerOverview
							tasksDueToday={dailyReport.tasksDueToday}
							tasksDueTomorrow={dailyReport.tasksDueTomorrow}
							tasksDueThisWeek={dailyReport.tasksDueThisWeek}
							tasksForReview={dailyReport.tasksForReview}
							newNotifications={dailyReport.newNotifications}
							changeSection={changeSection}
						/>
					) : currentSection === "tasks-due-today" ? (
						<OrganizerTasksDueToday 
							tasksDueToday={dailyReport.tasksDueToday}
						/>
					) : currentSection === "tasks-due-tomorrow" ? (
						<OrganizerTasksDueTomorrow 
							tasksDueTomorrow={dailyReport.tasksDueTomorrow}
						/>
					) : currentSection === "tasks-due-this-week" ? (
						<OrganizerTasksDueThisWeek
							tasksDueThisWeek={dailyReport.tasksDueThisWeek} 
						/>
					) : currentSection === "reviews" ? (
						<OrganizerTasksForReview 
							tasksForReviews={dailyReport.tasksForReview}
						/>
					) : currentSection === "notifications" && (
						<OrganizerNotifications 
							newNotifications={dailyReport.newNotifications}
						/>
					)
				}
			</div>
        </div>
    );

}

export default Organizer;