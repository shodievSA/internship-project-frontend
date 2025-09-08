import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import ProjectStatusOverview from "../components/ProjectStatusOverview";
import TeamWorkloadChart from "../components/TeamWorkloadChart";

import PriorityTaskChart from "../components/PriorityTaskChart";
import RecentActivityStats from "../components/RecentActivityStats";
import SprintSelectionDropdown from "../components/SprintSelectionDropdown";
import RecentActivityStatsSkeleton from "../components/RecentActivityStatsSkeleton";
import ProjectStatusOverviewSkeleton from "../components/ProjectStatusOverviewSkeleton";
import TeamWorkloadChartSkeleton from "../components/TeamWorkloadChartSkeleton";
import PriorityTaskChartSkeleton from "../components/PriorityTaskChartSkeleton";
import {
	useAllSprints,
	useDefaultSprint,
	useSummary,
} from "../hooks/useSummary";

function Summary() {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const [selectedSprintId, setSelectedSprintId] = useState(null);

	// Fetch all sprints and default sprint
	const { data: sprintsData } = useAllSprints(projectId);
	const { data: defaultSprintData } = useDefaultSprint(projectId);

	// Fetch summary data with unified loading state
	const { loading: isSummaryLoading } = useSummary(
		projectId,
		selectedSprintId
	);

	// Set default sprint when data is loaded
	useEffect(() => {
		if (defaultSprintData?.defaultSprint) {
			setSelectedSprintId(defaultSprintData.defaultSprint.id);
		}
	}, [defaultSprintData]);

	const sprints = sprintsData?.sprints || [];

	const handleSprintChange = (sprintId) => {
		setSelectedSprintId(sprintId);
	};

	return (
		<div
			className="flex flex-col gap-y-8 h-full text-gray-900 dark:text-white px-8 
		py-6 pb-16 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-neutral-950 
		dark:scrollbar-track-neutral-800"
		>
			<header className="flex justify-between items-center">
				<div className="flex items-center gap-x-6">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => navigate(-1)}
					>
						<div className="flex items-center gap-x-2">
							<ArrowLeft className="w-4 h-4" />
							<span>Back to project</span>
						</div>
					</Button>
					<h1 className="text-xl font-semibold">Project Summary</h1>
				</div>
				<SprintSelectionDropdown
					sprints={sprints}
					selectedSprintId={selectedSprintId}
					onSprintChange={handleSprintChange}
				/>
			</header>

			<div className="grid grid-cols-1 gap-6 px-8">
				{isSummaryLoading ? (
					<RecentActivityStatsSkeleton />
				) : (
					<RecentActivityStats sprintId={selectedSprintId} />
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8">
				{isSummaryLoading ? (
					<ProjectStatusOverviewSkeleton />
				) : (
					<ProjectStatusOverview sprintId={selectedSprintId} />
				)}
				{isSummaryLoading ? (
					<TeamWorkloadChartSkeleton />
				) : (
					<TeamWorkloadChart sprintId={selectedSprintId} />
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 px-8">
				{isSummaryLoading ? (
					<PriorityTaskChartSkeleton />
				) : (
					<PriorityTaskChart sprintId={selectedSprintId} />
				)}
			</div>
		</div>
	);
}

export default Summary;
