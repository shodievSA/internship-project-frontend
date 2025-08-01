import { useState } from "react";
import { Calendar, Filter, UserPlus } from "lucide-react";
import { CustomDropdown } from "./CustomDropdown";
import { mockInvitations } from "../utils/data";
import { statusOptionsInviation, dateOptions } from "../utils/constant";
import { getAvatarUrl } from "../utils/constant";
import { ProjectInvitationCard } from "./ProjectInvitationCard";
import { EmptyInvitation } from "./EmptyInvitation";
import Button from "./ui/Button";
import SearchBar from "./SearchBar";
import { filterInvitations } from "../utils/filterUtils";

export function ProjectInvitations() {
	const [invitations, setInvitations] = useState(mockInvitations);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("all");

	const filteredInvitations = filterInvitations(invitations, {
		search: searchTerm,
		status: statusFilter,
		date: dateFilter,
	});

	return (
		<div className="bg-white dark:bg-black text-gray-900 dark:text-white">
			<div className="">
				{/* Header with Search and Filters */}
				<div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 mb-6">
					{/* Search Bar (left on desktop) */}
					<div className="flex justify-start w-full lg:w-1/3">
						<div className="relative w-full">
							<SearchBar
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search by project, inviter name or email..."
							/>
						</div>
					</div>
					{/* Dropdowns and Send Invitation Button (right on desktop) */}
					<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
						<div className="flex flex-col sm:flex-row gap-3">
							<CustomDropdown
								value={statusFilter}
								onChange={setStatusFilter}
								options={statusOptionsInviation}
								placeholder="All Status"
								icon={Filter}
								className="w-full sm:w-auto"
							/>
							<CustomDropdown
								value={dateFilter}
								onChange={setDateFilter}
								options={dateOptions}
								placeholder="All Dates"
								icon={Calendar}
								className="w-full sm:w-auto"
							/>
						</div>
						<Button
							variant="secondary"
							size="md"
							className="flex items-center gap-x-2"
						>
							<UserPlus className="h-4 w-4" />
							<span className="font-medium">Send Invite</span>
						</Button>
					</div>
				</div>

				{/* Invitations List */}
				<div className="flex flex-col gap-y-5">
					{filteredInvitations.map((invitation) => (
						<ProjectInvitationCard
							key={invitation.id}
							invitation={invitation}
							getAvatarUrl={getAvatarUrl}
						/>
					))}
				</div>

				{/* Empty State */}
				{filteredInvitations.length === 0 && <EmptyInvitation />}
			</div>
		</div>
	);
}
