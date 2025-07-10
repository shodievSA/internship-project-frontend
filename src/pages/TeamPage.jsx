import { useProject } from "../context/ProjectContext";
import { TeamMemberCard } from "../components/team-member-card";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function TeamMembersPage() {

    const { team, projectLoaded } = useProject();

    return (
        <div className="h-full text-gray-900 dark:text-white ">
			{
				!projectLoaded ? (
					<LoadingState message="Calling in the crew - your teammates are on the way!" />
				) : !team ? (
					<ErrorState message={"Yikes! Something went sideways while assembling the team. Try again?"} />
				) : (
					<>
						<header className="flex justify-between items-center mb-6">
							<h1 className="text-2xl font-bold">Team Members</h1>
							<span className="text-gray-500 dark:text-gray-400">
								{ 
									projectLoaded && team ? (
										`${team.length} ${team.length > 1 ? "members" : "member"}` 
									) : "Loading..." 
								}
							</span>
						</header>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
						gap-6 md:gap-6 pb-4">
							{
								team.map((member) => (
									<TeamMemberCard key={member.id} member={member} />
								))
							}
						</div>	
					</>
				)			
			}
        </div>
    );

};

export default TeamMembersPage;
