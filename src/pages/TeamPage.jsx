import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { TeamMemberCard } from "../components/team-member-card";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import SearchBar from "../components/SearchBar";
import EmptySearch from "../components/EmptySearch";
import LoadingState from "../components/LoadingState";

function TeamMembersPage() {
	const navigate = useNavigate();
	const { team, projectLoaded } = useProject();

	const [searchTerm, setSearchTerm] = useState("");

	const filteredTeam = useMemo(() => {
		if (!projectLoaded) return [];

		return team.filter((member) => {
			const matchesSearch =
				member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				member.position
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				member.role.toLowerCase().includes(searchTerm.toLowerCase());

			return matchesSearch;
		});
	}, [searchTerm, projectLoaded, team]);

	function clearFilters() {
		setSearchTerm("");
	}

	if (!projectLoaded)
		return <LoadingState message="Loading your team members" />;

	return (
		<div className="flex flex-col gap-y-8 h-full text-gray-900 dark:text-white px-8 py-6">
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
					<h1 className="text-xl font-semibold">Team Members</h1>
				</div>
				<span className="text-gray-500 dark:text-gray-400">
					{`${team.length} ${team.length > 1 ? "members" : "member"}`}
				</span>
			</header>
			<div className="w-[400px]">
				<SearchBar
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search member by name, position, email or role..."
				/>
			</div>
			{filteredTeam.length > 0 ? (
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
					gap-6 md:gap-6 pb-4"
				>
					{filteredTeam.map((member) => (
						<TeamMemberCard key={member.id} member={member} />
					))}
				</div>
			) : (
				<EmptySearch onClearFilters={clearFilters} />
			)}
		</div>
	);
}

export default TeamMembersPage;
